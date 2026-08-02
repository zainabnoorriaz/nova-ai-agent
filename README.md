# 🤖 Nova — AI Agent

Nova is an AI agent built with real function-calling reasoning — not keyword-matching disguised as intelligence. Powered by Google's Gemini API, Nova decides which tool to use based on natural conversation, executes it, and remembers context across sessions.

## ✨ Features

- **🧮 Calculator** — solves arithmetic through natural language
- **🌦️ Weather** — live conditions for any city (OpenWeatherMap)
- **🔍 Web Search** — real-time results via Tavily
- **📄 Resume Analyzer** — PDF parsing + AI-generated score (0–100), strengths, and improvement suggestions
- **🧠 Persistent Memory** — SQLite-backed conversation history, not just single-session context

## 🎨 Frontend

Rather than a standard chat widget, Nova's frontend is a custom-designed, scrollable single-page experience:
- Animated landing page with a mascot and floating tool previews
- Each tool opens into its own uniquely themed interface — including a full breaking-news-style UI for search results
- Animated circular progress meter for resume scores

Built with vanilla HTML/CSS/JS — no frontend frameworks.

## 🛠️ Tech Stack

- **Backend:** FastAPI, Python
- **AI:** Google Gemini API (function-calling)
- **Database:** SQLite (conversation memory)
- **APIs:** OpenWeatherMap, Tavily
- **Frontend:** HTML, CSS, JavaScript

## 🎥 Demo

📹 [Watch the demo video](assets/demo.mp4)

## 🚀 Setup

\`\`\`bash
git clone https://github.com/zainabnoorriaz/nova-ai-agent.git
cd nova-ai-agent
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
\`\`\`

Add your API keys to a `.env` file:
\`\`\`
GEMINI_API_KEY=your_key
OPENWEATHER_API_KEY=your_key
TAVILY_API_KEY=your_key
\`\`\`

Run the server:
\`\`\`bash
uvicorn app.main:app --reload
\`\`\`

Visit `http://127.0.0.1:8000`

---

Built as part of my journey toward becoming an AI Engineer.