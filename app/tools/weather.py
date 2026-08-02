import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENWEATHER_API_KEY")


def get_weather_data(city: str) -> dict:
    url = "https://api.openweathermap.org/data/2.5/weather"
    params = {"q": city, "appid": API_KEY, "units": "metric"}
    response = requests.get(url, params=params)

    if response.status_code != 200:
        return None

    data = response.json()
    return {
        "city": data["name"],
        "temp": round(data["main"]["temp"]),
        "feels_like": round(data["main"]["feels_like"]),
        "description": data["weather"][0]["description"],
        "main": data["weather"][0]["main"],
        "humidity": data["main"]["humidity"],
        "wind": data["wind"]["speed"]
    }


def get_weather(city: str) -> str:
    data = get_weather_data(city)
    if not data:
        return f"Could not find weather for '{city}'."
    return f"The weather in {data['city']} is {data['description']} with a temperature of {data['temp']}°C."


if __name__ == "__main__":
    print(get_weather("Lahore"))