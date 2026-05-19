# AgentVerse — Multi-Agent AI Dashboard

AgentVerse is a full-stack, RAG-powered AI platform that features a beautiful, dynamic frontend and a robust backend. Chat with domain-specific AI agents (Astrologer, Education Guide, Finance Advisor, Makeup Artist) using either Gemini or Grok APIs!

## Features
- Fully responsive, premium UI with smooth animations.
- RAG (Retrieval-Augmented Generation) pipeline using ChromaDB.
- Individual knowledge bases for each agent so information never mixes.
- Secure API key storage and JWT Authentication.

## How to Run

### 1. Setup Backend
1. Navigate to `agentverse/backend/`.
2. Install dependencies: `pip install -r requirements.txt`.
3. Start the FastAPI server: `uvicorn main:app --reload`
*(The backend will run on `http://localhost:8000`)*

### 2. Setup Frontend
1. Navigate to `agentverse/frontend/`.
2. Install dependencies: `npm install`.
3. Start the Vite dev server: `npm run dev`.
*(The frontend will run on `http://localhost:5173`)*

## Usage Guide
- Register an account on the login page.
- Choose an **AI Provider** (Gemini or Grok).
- Enter your respective **API Key**. It is encrypted and securely stored.
- Select an agent from the Dashboard and start asking questions!

## Knowledge Base
To update an agent's knowledge, modify the corresponding `.md` file in `agentverse/backend/knowledge_base/` and restart the backend. If ChromaDB does not pick up the new changes, simply delete the `vector_store` folder and let the backend rebuild it.
