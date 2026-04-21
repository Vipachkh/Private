import sys
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Handle path for Vercel serverless environment
sys.path.append(os.path.dirname(__file__))

from routers import router

app = FastAPI(title="VibeCafe API")

# Configure CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the routers (Vercel already handles the /api prefix)
app.include_router(router)

@app.get("/")
def read_root():
    return {"message": "Welcome to VibeCafe Backend API (Serverless)"}
