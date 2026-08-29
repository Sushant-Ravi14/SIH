import os
import chromadb
from chromadb.config import Settings

# Initialize ChromaDB client
PERSIST_DIRECTORY = os.getenv("CHROMADB_PERSIST_DIRECTORY", "./chroma_db")
os.makedirs(PERSIST_DIRECTORY, exist_ok=True)

chroma_client = chromadb.PersistentClient(path=PERSIST_DIRECTORY, settings=Settings(anonymized_telemetry=False))

def get_nsqf_collection():
    return chroma_client.get_or_create_collection(name="nsqf_packs")

def query_recommendations(profile_text: str, n_results: int = 3):
    collection = get_nsqf_collection()
    results = collection.query(
        query_texts=[profile_text],
        n_results=n_results
    )
    return results
