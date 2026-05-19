def retrieve_context(collection, query: str, top_k=4) -> str:
    try:
        results = collection.query(
            query_texts=[query],
            n_results=top_k
        )
        
        if not results or not results['documents'] or len(results['documents'][0]) == 0:
            return ""
            
        return "\n\n".join(results['documents'][0])
    except Exception as e:
        print(f"Error retrieving context: {e}")
        return ""
