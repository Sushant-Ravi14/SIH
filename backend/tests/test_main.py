import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to PM-AJAY Voice Assistant API"}

def test_transcribe_and_reply():
    # Mock a minimal wav file upload
    wav_content = b"RIFF$\x00\x00\x00WAVEfmt \x10\x00\x00\x00\x01\x00\x01\x00\x80>\x00\x00\x00}\x00\x00\x02\x00\x10\x00data\x00\x00\x00\x00"
    files = {"audio_file": ("test.wav", wav_content, "audio/wav")}
    data = {"source_language": "hi"}
    response = client.post("/api/v1/voice/transcribe-and-reply", data=data, files=files)
    
    assert response.status_code == 200
    json_resp = response.json()
    assert "text" in json_resp
    assert "reply" in json_resp
    assert "audio_base64" in json_resp
    assert json_resp["reply"] == "Mocked assistant reply"
