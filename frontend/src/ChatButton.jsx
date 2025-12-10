import { useState, useEffect, useRef } from "react";

// Tähän saa laittaa esimerkkiviestejä jos haluaa
  const viesti1 = {
          id: Date.now(),
          username: "Tietäjä",
          text: "Vaasankadulla on tänään ruuhkaa tosi runsaasti",
          timestamp: new Date(new Date().getTime() - 2 * 60 * 60000).toLocaleTimeString("fi-FI", {
            hour: "2-digit",
            minute: "2-digit"
          })
        }
  const viesti2 = {
          id: Date.now()+1,
          username: "skeletondeathkillersniper666",
          text: "Ok.",
          timestamp: new Date(new Date().getTime() - 60 * 60000).toLocaleTimeString("fi-FI", {
            hour: "2-digit",
            minute: "2-digit"
          })
        }

export default function ChatButton({ darkMode }) {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([viesti1, viesti2]);
  const [username, setUsername] = useState("Vierailija");
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef(null);

  // Chat vierittyy automaattisesti alas kun lähettää uuden viestin
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const buttonStyle = {
    position: "fixed",
    marginRight: "1rem",
    bottom: "20px",
    right: "80px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: darkMode ? "#444444" : "#BDAEA3",
    color: darkMode ? "#ffffff" : "#000000",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)"
  };

  const chatWindowStyle = {
    display: showChat ? "flex" : "none",
    flexDirection: "column",
    position: "fixed",
    bottom: "80px",
    right: "20px",
    width: "20rem",
    height: "40rem",
    backgroundColor: darkMode ? "#2d2d2d" : "#ffffff",
    border: darkMode ? "1px solid #444444" : "1px solid #888",
    borderRadius: "8px",
    zIndex: 999,
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.3)"
  };

  const chatHeaderStyle = {
    padding: "10px",
    borderBottom: darkMode ? "1px solid #444444" : "1px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: darkMode ? "#333333" : "#f5f5f5",
    borderRadius: "8px 8px 0 0",
    color: darkMode ? "#ffffff" : "#000000"
  };

  const messagesContainerStyle = {
    flex: 1,
    overflowY: "auto",
    padding: "10px",
    color: darkMode ? "#ffffff" : "#000000"
  };

  const messageStyle = {
    marginBottom: "10px",
    padding: "8px",
    borderRadius: "6px",
    backgroundColor: darkMode ? "#444444" : "#f0f0f0",
    color: darkMode ? "#ffffff" : "#000000",
    wordWrap: "break-word"
  };

  const usernameStyle = {
    fontWeight: "bold",
    fontSize: "12px",
    color: darkMode ? "#aaaaaa" : "#666666",
    marginBottom: "4px"
  };

  const inputContainerStyle = {
    padding: "10px",
    borderTop: darkMode ? "1px solid #444444" : "1px solid #ddd",
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  };

  const inputStyle = {
    padding: "6px",
    border: darkMode ? "1px solid #555555" : "1px solid #cccccc",
    borderRadius: "4px",
    backgroundColor: darkMode ? "#333333" : "#ffffff",
    color: darkMode ? "#ffffff" : "#000000",
    fontSize: "12px",
    fontFamily: "inherit"
  };

  const sendButtonStyle = {
    padding: "6px 12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px"
  };

  const closeButtonStyle = {
    background: "none",
    border: "none",
    color: darkMode ? "#ffffff" : "#000000",
    fontSize: "20px",
    cursor: "pointer",
    padding: "0"
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now(),
          username: username,
          text: messageText,
          timestamp: new Date().toLocaleTimeString("fi-FI", {
            hour: "2-digit",
            minute: "2-digit"
          })
        }
      ]);
      setMessageText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <button
        style={buttonStyle}
        onClick={() => setShowChat(!showChat)}
        title="Chat"
      >
        <img src="/src/icons/chat.png" alt="chat" style={{ height: "2rem", width: "auto"}} />
      </button>

      <div style={chatWindowStyle}>
        <div style={chatHeaderStyle}>
          <span>Chat</span>
          <button
            style={closeButtonStyle}
            onClick={() => setShowChat(false)}
          >
            ×
          </button>
        </div>

        <div style={messagesContainerStyle}>
          {messages.length === 0 ? (
            <div
              style={{
                color: darkMode ? "#999999" : "#999999",
                textAlign: "center",
                paddingTop: "20px",
                fontSize: "12px"
              }}
            >
              Ei vielä viestejä. Kirjoita jotain!
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} style={messageStyle}>
                <div style={usernameStyle}>
                  {msg.username} · {msg.timestamp}
                </div>
                <div>{msg.text}</div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <div style={inputContainerStyle}>
          <input
            type="text"
            placeholder="Käyttäjänimi"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />
          <textarea
            placeholder="Kirjoita viesti..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              ...inputStyle,
              resize: "none",
              height: "50px",
              padding: "6px"
            }}
          />
          <button style={sendButtonStyle} onClick={handleSendMessage}>
            Lähetä
          </button>
        </div>
      </div>
    </>
  );
}
