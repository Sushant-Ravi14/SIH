from fastapi import FastAPI, UploadFile, File, Form, Depends
from typing import Optional, List
import json
from .models import schemas
from .services.asr_tts import BhashiniConnector
from .services.agent import process_conversation
from .core.vectordb import query_recommendations
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="PM-AJAY Voice Assistant API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

bhashini = BhashiniConnector()

@app.post("/api/v1/voice/chat", response_model=schemas.ChatResponse)
async def voice_chat(
    audio_file: Optional[UploadFile] = File(None),
    text_transcript: Optional[str] = Form(None),
    language: str = Form("hi"),
    current_profile_json: str = Form("{}")
):
    # Parse incoming profile state
    profile_data = json.loads(current_profile_json)
    profile = schemas.BeneficiaryProfile(**profile_data)

    # ASR Step
    transcribed_text = text_transcript
    if audio_file and not text_transcript:
        audio_bytes = await audio_file.read()
        transcribed_text = bhashini.transcribe_audio(audio_bytes, language)

    # LangGraph Agent Step (Slot Filling)
    bot_response_text, updated_profile = process_conversation(transcribed_text, profile)

    # TTS Step
    audio_base64 = bhashini.synthesize_text(bot_response_text, language)

    return schemas.ChatResponse(
        transcribed_text=transcribed_text,
        bot_response_text=bot_response_text,
        audio_base64=audio_base64,
        current_profile=updated_profile
    )

@app.get("/api/v1/recommendations", response_model=List[schemas.Recommendation])
async def get_recommendations(profile_json: str):
    profile_data = json.loads(profile_json)
    # Build query string from profile
    query_str = " ".join([str(v) for v in profile_data.values() if v])
    if not query_str:
        return []

    # Query ChromaDB
    results = query_recommendations(query_str, n_results=2)
    
    recs = []
    if results and results['metadatas'] and len(results['metadatas'][0]) > 0:
        for meta in results['metadatas'][0]:
            recs.append(schemas.Recommendation(
                nsqf_pack_name=meta["name"],
                level=meta["level"],
                skill_gap_analysis="Training required based on current profile.",
                local_centers=["PM-AJAY Center A", "Local MSME Hub"]
            ))
    return recs

@app.post("/api/v1/webhook/whatsapp")
async def whatsapp_webhook(payload: dict):
    # Webhook mock endpoint
    return {"status": "received"}
