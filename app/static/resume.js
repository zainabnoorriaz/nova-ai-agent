function openResume() {
    document.getElementById("resume-modal").classList.add("active");
}

function closeResume() {
    document.getElementById("resume-modal").classList.remove("active");
    resetResume();
}

function resetResume() {
    document.getElementById("resume-upload-view").style.display = "block";
    document.getElementById("resume-loading-view").style.display = "none";
    document.getElementById("resume-result-view").style.display = "none";
    document.getElementById("resume-filename").innerText = "";
    document.getElementById("resume-file").value = "";
}

async function handleResumeFile(file) {
    if (!file) return;

    document.getElementById("resume-filename").innerText = file.name;
    document.getElementById("resume-upload-view").style.display = "none";
    document.getElementById("resume-loading-view").style.display = "block";

    const formData = new FormData();
    formData.append("file", file);

    try {
        const res = await fetch("/analyze-resume", {
            method: "POST",
            body: formData
        });
        const data = await res.json();
        showResumeResult(data.analysis);
    } catch (err) {
        alert("Something went wrong analyzing the resume.");
        resetResume();
    }
}

function showResumeResult(analysisText) {
    const scoreMatch = analysisText.match(/Score:\s*(\d+)/i);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;

    const strengthsMatch = analysisText.match(/Strengths:\s*([\s\S]*?)(?:Suggestions|$)/i);
    const suggestionsMatch = analysisText.match(/Suggestions for Improvement:\s*([\s\S]*)/i);

    const strengths = strengthsMatch
        ? strengthsMatch[1].split("\n").map(s => s.replace(/^-/, "").trim()).filter(Boolean)
        : [];
    const suggestions = suggestionsMatch
        ? suggestionsMatch[1].split("\n").map(s => s.replace(/^-/, "").trim()).filter(Boolean)
        : [];

    document.getElementById("resume-loading-view").style.display = "none";
    document.getElementById("resume-result-view").style.display = "block";

    document.getElementById("score-number").innerText = score;
    const circle = document.getElementById("score-circle");
    const offset = 314 - (314 * score) / 100;
    setTimeout(() => { circle.style.strokeDashoffset = offset; }, 100);

    const strengthsList = document.getElementById("strengths-list");
    strengthsList.innerHTML = strengths.map(s => `<li>${s}</li>`).join("");

    const suggestionsList = document.getElementById("suggestions-list");
    suggestionsList.innerHTML = suggestions.map(s => `<li>${s}</li>`).join("");
}