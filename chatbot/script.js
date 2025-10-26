const API_KEY = "AIzaSyCytGTEC6CAnrsnfKe-DBQMLANqsGV6abk"; // ⚠️ Pega aquí tu API key
const MODEL = "gemini-pro"; // o "gemini-1.5-pro"

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

/*async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("Tú", message);
  userInput.value = "";

  const response = await fetch(
    "https://corsproxy.io/?" + encodeURIComponent(
    "https://generativelanguage.googleapis.com/v1/models/" + MODEL + ":generateContent?key=" + API_KEY),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: message }] }],
      }),
    }
  );

  const data = await response.json();
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Lo siento, no pude responder.";
  appendMessage("Gemini", reply);
}*/
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("Tú", message);
  userInput.value = "";

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/" + MODEL + ":generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: message }] }],
        }),
      }
    );

    const data = await response.json();
    console.log(data); // 👈 Te mostrará si hay errores específicos
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      data.error?.message ||
      "Lo siento, no pude responder.";
    appendMessage("Gemini", reply);
  } catch (err) {
    console.error(err);
    appendMessage("Gemini", "Error de conexión o CORS.");
  }
}


function appendMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
