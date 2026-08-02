import os
from tavily import TavilyClient
from dotenv import load_dotenv

load_dotenv()

client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))


def search_data(query: str, max_results: int = 5) -> list:
    """
    Returns structured search results.
    """
    response = client.search(query=query, max_results=max_results)
    results = response.get("results", [])

    return [
        {
            "title": r.get("title", "Untitled"),
            "content": r.get("content", "")[:200],
            "url": r.get("url", "#")
        }
        for r in results
    ]


def web_search(query: str) -> str:
    """
    Returns search results as formatted text.
    """
    results = search_data(query, max_results=3)

    if not results:
        return f"No results found for '{query}'."

    return "\n".join(
        f"- {r['title']}: {r['content'][:150]}..."
        for r in results
    )


if __name__ == "__main__":
    print(web_search("latest AI news"))