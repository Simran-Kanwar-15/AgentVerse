from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class RegisterRequest(BaseModel):
    full_name: str
    email: str
    password: str
    api_provider: str
    api_key: str

class LoginRequest(BaseModel):
    email: str
    password: str

class ChatRequest(BaseModel):
    message: str

class UserResponse(BaseModel):
    id: str
    full_name: str
    email: str
    api_provider: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class MessageResponse(BaseModel):
    role: str
    content: str
    agent_name: str
    timestamp: datetime

class ChatResponse(BaseModel):
    response: str
    agent: str
