import json
import os
import sys

# Add backend dir to sys.path to allow importing app
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.vectordb import get_nsqf_collection

def seed_data():
    data_path = os.path.join(os.path.dirname(__file__), "..", "data", "nsqf_mock_data.json")
    if not os.path.exists(data_path):
        print(f"Error: Data file not found at {data_path}")
        return

    with open(data_path, "r") as f:
        nsqf_data = json.load(f)

    collection = get_nsqf_collection()
    
    ids = []
    documents = []
    metadatas = []

    for item in nsqf_data:
        ids.append(item["id"])
        # Document text for embedding
        doc_text = f"{item['name']}. Level {item['level']}. {item['description']} Ideal for: {', '.join(item['ideal_for'])}"
        documents.append(doc_text)
        metadatas.append({
            "name": item["name"],
            "level": item["level"],
            "description": item["description"]
        })

    print(f"Ingesting {len(ids)} NSQF packs into ChromaDB...")
    collection.upsert(
        ids=ids,
        documents=documents,
        metadatas=metadatas
    )
    print("Seeding complete.")

if __name__ == "__main__":
    seed_data()
