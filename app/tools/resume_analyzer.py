import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

ANALYSIS_PROMPT = """You are a resume reviewer. Analyze the following resume text and respond in this exact format:

Score: <a number 0-100>

Strengths:
- <strength 1>
- <strength 2>
- <strength 3>

Suggestions for Improvement:
- <suggestion 1>
- <suggestion 2>
- <suggestion 3>

Resume text:
{resume_text}
"""


def analyze_resume(resume_text: str) -> str:
    prompt = ANALYSIS_PROMPT.format(resume_text=resume_text)

    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt
    )

    return response.text