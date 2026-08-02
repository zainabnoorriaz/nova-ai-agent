function openChat() {
    document.getElementById("chat-modal").classList.add("active");
    document.getElementById("chat-input").focus();
}

function closeChat() {
    document.getElementById("chat-modal").classList.remove("active");
}

function addChatMessage(text, sender) {
    const messagesEl = document.getElementById("chat-messages");
    const msg = document.createElement("div");
    msg.classList.add("chat-msg", sender);
    msg.innerHTML = sender === "bot" ? marked.parse(text) : text;
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
}

async function sendChatMessage() {
    const input = document.getElementById("chat-input");
    const text = input.value.trim();
    if (!text) return;

    addChatMessage(text, "user");
    input.value = "";

    try {
        const res = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text })
        });
        const data = await res.json();
        addChatMessage(data.reply, "bot");
    } catch (err) {
        addChatMessage("Something went wrong. Please try again.", "bot");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("chat-input").addEventListener("keydown", (e) => {
        if (e.key === "Enter") sendChatMessage();
    });
});

