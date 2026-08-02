function openSearch() {
    document.getElementById("search-modal").classList.add("active");
}

function closeSearch() {
    document.getElementById("search-modal").classList.remove("active");
}

async function runSearch() {
    const query = document.getElementById("search-query-input").value.trim();
    if (!query) return;

    const resultsEl = document.getElementById("news-results");
    resultsEl.innerHTML = `<p style="color:#9CA3AF">Fetching latest coverage on "${query}"...</p>`;

    try {
        const res = await fetch(`/search-data?query=${encodeURIComponent(query)}`);
        const data = await res.json();

        if (!data.results || data.results.length === 0) {
            resultsEl.innerHTML = `<p style="color:#9CA3AF">No coverage found for "${query}".</p>`;
            return;
        }

        resultsEl.innerHTML = data.results.map((r, i) => `
            <div class="news-result-card">
                <span class="tag">HEADLINE ${i + 1}</span>
                <h3>${r.title}</h3>
                <p>${r.content}...</p>
                <a href="${r.url}" target="_blank">Read full story →</a>
            </div>
        `).join("");

        document.getElementById("news-ticker-track").innerText =
            data.results.map(r => r.title).join("     •     ");
    } catch (err) {
        resultsEl.innerHTML = `<p style="color:#CC0000">Broadcast interrupted. Try again.</p>`;
    }
}