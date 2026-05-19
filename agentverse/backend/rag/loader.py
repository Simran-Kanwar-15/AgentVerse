from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
import os

def load_and_chunk(file_path: str):
    if not os.path.exists(file_path):
        return []
    try:
        loader = TextLoader(file_path, encoding='utf-8')
        docs = loader.load()
    except Exception as e:
        print(f"Error loading {file_path}: {e}")
        return []
    
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )
    chunks = text_splitter.split_documents(docs)
    return chunks
