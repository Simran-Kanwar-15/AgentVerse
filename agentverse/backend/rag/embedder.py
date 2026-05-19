import chromadb
from chromadb.utils import embedding_functions
from rag.loader import load_and_chunk
import os

def build_vector_stores(agent_docs: dict):
    client = chromadb.PersistentClient(path="./vector_store/")
    sentence_transformer_ef = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L6-v2")
    
    vector_stores = {}
    
    for agent_name, file_path in agent_docs.items():
        try:
            client.delete_collection(name=agent_name)
        except Exception:
            pass
            
        collection = client.create_collection(
            name=agent_name,
            embedding_function=sentence_transformer_ef
        )
        
        chunks = load_and_chunk(file_path)
        if chunks:
            documents = [chunk.page_content for chunk in chunks]
            ids = [f"{agent_name}_{i}" for i in range(len(chunks))]
            collection.add(
                documents=documents,
                ids=ids
            )
            print(f"Loaded {len(chunks)} chunks for {agent_name}")
        else:
            print(f"No chunks found for {agent_name} at {file_path}")
        
        vector_stores[agent_name] = collection
        
    return vector_stores
