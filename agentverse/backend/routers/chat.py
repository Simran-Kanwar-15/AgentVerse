from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from cryptography.fernet import Fernet
import os
import httpx
from datetime import datetime
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage
from slowapi import Limiter
from slowapi.util import get_remote_address

from db.database import get_db, ChatMessage
from models.schemas import ChatRequest, ChatResponse, MessageResponse
from routers.auth import get_current_user, fernet
from rag.agent_config import VALID_AGENTS, AGENT_SYSTEM_PROMPTS
from rag.retriever import retrieve_context

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)

@router.post("/{agent_name}", response_model=ChatResponse)
@limiter.limit("20/minute")
async def chat_with_agent(
    agent_name: str, 
    request_data: ChatRequest, 
    request: Request,
    db: Session = Depends(get_db), 
    current_user = Depends(get_current_user)
):
    if agent_name not in VALID_AGENTS:
        raise HTTPException(status_code=400, detail="Agent not found")
        
    try:
        collection = request.app.state.vector_stores[agent_name]
        retrieved_context = retrieve_context(collection, request_data.message)
        
        api_key = fernet.decrypt(current_user.api_key_encrypted.encode()).decode()
        
        system_prompt = f"{AGENT_SYSTEM_PROMPTS[agent_name]}\n\nCONTEXT FROM KNOWLEDGE BASE:\n{retrieved_context}\n\nAnswer based ONLY on the context above.\nIf the answer is not in the context, say so politely."
        
        response_text = ""
        
        if current_user.api_provider == "gemini":
            os.environ["GOOGLE_API_KEY"] = api_key
            llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", temperature=0.3)
            messages = [
                SystemMessage(content=system_prompt),
                HumanMessage(content=request_data.message)
            ]
            response = llm.invoke(messages)
            response_text = response.content
            
        elif current_user.api_provider == "groq":
            headers = {
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            }
            payload = {
                "model": "llama-3.1-8b-instant",
                "temperature": 0.3,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": request_data.message}
                ]
            }
            async with httpx.AsyncClient() as client:
                resp = await client.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=payload, timeout=30.0)
                if resp.status_code != 200:
                    raise Exception(f"Groq error {resp.status_code}: {resp.text}")
                data = resp.json()
                response_text = data["choices"][0]["message"]["content"]
        else:
            raise HTTPException(status_code=400, detail="Invalid API provider")
            
        user_msg = ChatMessage(
            user_id=current_user.id,
            agent_name=agent_name,
            role="user",
            content=request_data.message
        )
        ai_msg = ChatMessage(
            user_id=current_user.id,
            agent_name=agent_name,
            role="assistant",
            content=response_text
        )
        db.add(user_msg)
        db.add(ai_msg)
        db.commit()
        
        return ChatResponse(response=response_text, agent=agent_name)
        
    except Exception as e:
        import traceback
        trace = traceback.format_exc()
        print(f"Error: {trace}")
        raise HTTPException(status_code=502, detail=f"LLM API call failed: {repr(e)}")

@router.get("/history/{agent_name}")
def get_chat_history(agent_name: str, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    messages = db.query(ChatMessage).filter(
        ChatMessage.user_id == current_user.id,
        ChatMessage.agent_name == agent_name
    ).order_by(ChatMessage.timestamp.asc()).limit(20).all()
    
    return [
        MessageResponse(
            role=msg.role,
            content=msg.content,
            agent_name=msg.agent_name,
            timestamp=msg.timestamp
        )
        for msg in messages
    ]
