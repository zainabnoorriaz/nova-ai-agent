function openWeather() {
    document.getElementById("weather-modal").classList.add("active");
}

function closeWeather() {
    document.getElementById("weather-modal").classList.remove("active");
}

const weatherIcons = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
    Mist: "🌫️",
    Fog: "🌫️",
    Haze: "🌫️"
};

async function searchWeather() {
    const city = document.getElementById("weather-city-input").value.trim();
    if (!city) return;

    const card = document.getElementById("weather-card");
    const errorBox = document.getElementById("weather-error");
    errorBox.style.display = "none";

    try {
        const res = await fetch(`/weather-data?city=${encodeURIComponent(city)}`);
        const data = await res.json();

        if (data.error) {
            card.style.display = "none";
            errorBox.innerText = data.error;
            errorBox.style.display = "block";
            return;
        }

        document.getElementById("weather-icon").innerText = weatherIcons[data.main] || "🌡️";
        document.getElementById("weather-temp").innerText = `${data.temp}°C`;
        document.getElementById("weather-desc").innerText = data.description;
        document.getElementById("weather-city").innerText = data.city;
        document.getElementById("weather-feels").innerText = `${data.feels_like}°C`;
        document.getElementById("weather-humidity").innerText = `${data.humidity}%`;
        document.getElementById("weather-wind").innerText = `${data.wind} m/s`;

        card.className = "weather-card";
        if (data.main === "Rain" || data.main === "Drizzle" || data.main === "Thunderstorm") {
            card.classList.add("rainy");
        } else if (data.main === "Clouds") {
            card.classList.add("cloudy");
        }

        card.style.display = "block";
    } catch (err) {
        card.style.display = "none";
        errorBox.innerText = "Something went wrong. Try again.";
        errorBox.style.display = "block";
    }
}