import os
import time
from google import genai
from google.genai import types
from dotenv import load_dotenv
from app.tools.calculator import calculate
from app.tools.weather import get_weather
from app.tools.search import web_search
from app.tools.memory import save_message, get_history

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

calculator_declaration = {
    "name": "calculate",
    "description": "Perform a basic arithmetic operation (add, subtract, multiply, divide) on two numbers.",
    "parameters": {
        "type": "object",
        "properties": {
            "operation": {
                "type": "string",
                "enum": ["add", "subtract", "multiply", "divide"],
                "description": "The arithmetic operation to perform"
            },
            "a": {"type": "number", "description": "The first number"},
            "b": {"type": "number", "description": "The second number"}
        },
        "required": ["operation", "a", "b"]
    }
}

weather_declaration = {
    "name": "get_weather",
    "description": "Get the current weather for a given city.",
    "parameters": {
        "type": "object",
        "properties": {
            "city": {
                "type": "string",
                "description": "The name of the city to get weather for"
            }
        },
        "required": ["city"]
    }
}

search_declaration = {
    "name": "web_search",
    "description": "Search the web for current information, news, or recent events.",
    "parameters": {
        "type": "object",
        "properties": {
            "query": {
                "type": "string",
                "description": "The search query"
            }
        },
        "required": ["query"]
    }
}

tools = types.Tool(function_declarations=[
    calculator_declaration,
    weather_declaration,
    search_declaration
])
config = types.GenerateContentConfig(tools=[tools])


def run_agent(message: str, session_id: str = "default", retries: int = 3) -> str:
    history = get_history(session_id)

    contents = []
    for turn in history:
        contents.append(
            types.Content(
                role=turn["role"],
                parts=[types.Part(text=turn["content"])]
            )
        )
    contents.append(
        types.Content(role="user", parts=[types.Part(text=message)])
    )

    response = None
    for attempt in range(retries):
        try:
            response = client.models.generate_content(
                model="gemini-3.5-flash-lite",
                contents=contents,
                config=config
            )
            break
        except Exception as e:
            if attempt == retries - 1:
                raise
            print(f"Retry {attempt + 1}/{retries} after error: {e}")
            time.sleep(2 ** attempt)  # 1s, 2s, 4s backoff

    part = response.candidates[0].content.parts[0]

    if part.function_call:
        fn_name = part.function_call.name
        fn_args = dict(part.function_call.args)

        if fn_name == "calculate":
            reply = f"Result: {calculate(**fn_args)}"
        elif fn_name == "get_weather":
            reply = get_weather(**fn_args)
        elif fn_name == "web_search":
            reply = web_search(**fn_args)
        else:
            reply = f"Unknown function: {fn_name}"
    else:
        reply = part.text

    save_message(session_id, "user", message)
    save_message(session_id, "model", reply)

    return reply


if __name__ == "__main__":
    print(run_agent("what is 15 times 8?"))