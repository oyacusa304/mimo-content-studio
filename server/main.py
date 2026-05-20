from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from datetime import datetime
import json

app = FastAPI(title="MiMo Content Studio API", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class TextGenerationRequest(BaseModel):
    prompt: str
    max_tokens: Optional[int] = 500
    temperature: Optional[float] = 0.7

class ImageGenerationRequest(BaseModel):
    prompt: str
    size: Optional[str] = "1024x1024"
    quality: Optional[str] = "hd"

class VoiceGenerationRequest(BaseModel):
    text: str
    voice: Optional[str] = "default"
    speed: Optional[float] = 1.0

class PipelineRequest(BaseModel):
    text_prompt: str
    generate_image: bool = True
    generate_voice: bool = True

# Health check
@app.get("/health")
async def health():
    return {
        "status": "ok",
        "service": "mimo-content-studio",
        "timestamp": datetime.utcnow().isoformat()
    }

# Text generation endpoint
@app.post("/api/generate/text")
async def generate_text(request: TextGenerationRequest):
    try:
        return {
            "success": True,
            "model": "mimo-v2.5-text",
            "prompt": request.prompt,
            "generated_text": f"Generated content for: {request.prompt[:50]}... [MiMo V2.5 Text Model Output]",
            "tokens_used": 245,
            "max_tokens": request.max_tokens,
            "temperature": request.temperature,
            "timestamp": datetime.utcnow().isoformat(),
            "usage": {
                "prompt_tokens": 12,
                "completion_tokens": 245,
                "total_tokens": 257
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Image generation endpoint
@app.post("/api/generate/image")
async def generate_image(request: ImageGenerationRequest):
    try:
        return {
            "success": True,
            "model": "mimo-v2.5-image",
            "prompt": request.prompt,
            "image_url": "https://via.placeholder.com/1024x1024?text=MiMo+Generated+Image",
            "size": request.size,
            "quality": request.quality,
            "generation_time": 2.34,
            "timestamp": datetime.utcnow().isoformat(),
            "usage": {
                "credits_used": 10
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Voice generation endpoint
@app.post("/api/generate/voice")
async def generate_voice(request: VoiceGenerationRequest):
    try:
        return {
            "success": True,
            "model": "mimo-v2.5-voice",
            "text": request.text,
            "voice": request.voice,
            "speed": request.speed,
            "audio_url": "https://via.placeholder.com/audio.mp3",
            "duration_seconds": 5.2,
            "format": "mp3",
            "sample_rate": 44100,
            "timestamp": datetime.utcnow().isoformat(),
            "usage": {
                "characters_processed": len(request.text),
                "credits_used": 5
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Pipeline endpoint (all-in-one)
@app.post("/api/pipeline/create")
async def create_pipeline(request: PipelineRequest):
    try:
        result = {
            "success": True,
            "pipeline_id": "pipeline_" + datetime.utcnow().strftime("%Y%m%d%H%M%S"),
            "text_prompt": request.text_prompt,
            "timestamp": datetime.utcnow().isoformat(),
            "outputs": {}
        }
        
        # Text generation
        result["outputs"]["text"] = {
            "model": "mimo-v2.5-text",
            "generated_text": f"Generated content for: {request.text_prompt[:50]}... [MiMo V2.5 Text Model Output]",
            "tokens_used": 245
        }
        
        # Image generation (if requested)
        if request.generate_image:
            result["outputs"]["image"] = {
                "model": "mimo-v2.5-image",
                "image_url": "https://via.placeholder.com/1024x1024?text=MiMo+Generated+Image",
                "size": "1024x1024"
            }
        
        # Voice generation (if requested)
        if request.generate_voice:
            result["outputs"]["voice"] = {
                "model": "mimo-v2.5-voice",
                "audio_url": "https://via.placeholder.com/audio.mp3",
                "duration_seconds": 5.2
            }
        
        result["usage"] = {
            "total_credits_used": 20,
            "generation_time": 3.45
        }
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
