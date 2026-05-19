from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from contextlib import asynccontextmanager

from db.database import engine, Base
from routers import auth, chat
from rag.agent_config import AGENT_DOCS, VALID_AGENTS
from rag.embedder import build_vector_stores

Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("AgentVerse backend running ✓")
    vector_stores = build_vector_stores(AGENT_DOCS)
    app.state.vector_stores = vector_stores
    yield

app = FastAPI(title="AgentVerse API", lifespan=lifespan)

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(chat.router, prefix="/chat", tags=["chat"])

@app.get("/health")
def health_check():
    return {"status": "ok", "agents": list(VALID_AGENTS)}
