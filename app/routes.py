from fastapi import APIRouter
from app.schemas import ChatRequest
from app.agent.gemini_agent import run_agent

router = APIRouter()


@router.post("/chat")
def chat(request: ChatRequest):
    reply = run_agent(request.message)
    return {"reply": reply}


from fastapi import UploadFile, File
import shutil
import os
from app.utils.pdf_utils import extract_text_from_pdf
from app.tools.resume_analyzer import analyze_resume


@router.post("/analyze-resume")
async def analyze_resume_file(file: UploadFile = File(...)):
    upload_dir = "app/uploads"
    os.makedirs(upload_dir, exist_ok=True)
    file_path = f"{upload_dir}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    resume_text = extract_text_from_pdf(file_path)
    analysis = analyze_resume(resume_text)

    return {
        "filename": file.filename,
        "analysis": analysis
    }

from app.tools.weather import get_weather_data


@router.get("/weather-data")
def weather_data_route(city: str):
    data = get_weather_data(city)
    if not data:
        return {"error": f"Could not find weather for '{city}'"}
    return data

from app.tools.search import search_data


@router.get("/search-data")
def search_data_route(query: str):
    results = search_data(query)
    return {"results": results}