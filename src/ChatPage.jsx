import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';  
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ChatPage({ selectedCharacter }) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [apiKey, setApiKey] = useState("");  
  const chatWindowRef = useRef(null);

  const characterImages = {
    PyBuddy: "./images/pybot.jpeg",
    CodeBot: "./images/robot.jpeg",
  };

  // Store selected character in localStorage if not null
  if (selectedCharacter != null) {
    localStorage.setItem("sc", selectedCharacter.name);
  }

  // 🔹 Automatically send a message when the component loads
  useEffect(() => {
    const sendWelcomeMessage = async () => {
      if (messages.length > 0) return;
      try{
        // Only send if messages are empty
        const res = await axios.post(`${API_BASE_URL}/chat`, {
          message: `your name is ${localStorage.getItem("sc")}`,
          chatHistory: [],
        });

        setMessages([{ sender: "bot", text: res.data.response }]);
      }catch(error){
        toast.error("AI model quota exhausted. Please enter your own API key. / Bad credentials");
    };

    };

    sendWelcomeMessage();
  }, []);  // Runs once when component loads

  // 🔹 Function to send a message when the user types
  const sendMessage = async () => {
    if (!userInput.trim()) return;
    const updatedMessages = [...messages, { sender: "user", text: userInput }];
    setMessages([...messages, { sender: "user", text: userInput }]);
    setUserInput("");
    try{
    const res = await axios.post(`${API_BASE_URL}/chat`, { message: userInput,
      chatHistory: updatedMessages.map(msg => ({
        role: msg.sender === "user" ? "user" : "system",
        content: msg.text,
      })),
     });

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", text: res.data.response },
    ]);}catch(error){
      toast.error("AI model quota exhausted. Please enter your own API key. / Bad credentials");
    }
  };

  // 🔹 Scroll chat window when new message appears
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  // 🔹 Handle "Enter" key press to send message
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleSaveApiKey = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/set-api-key`, { userApiKey: apiKey });
      const res2 = await axios.post(`${API_BASE_URL}/chat`, {
        message: `your name is ${localStorage.getItem("sc")}`,
        chatHistory: [],
      });
      toast.success(res.data.message);
      setMessages([{ sender: "bot", text: res2.data.response }]);
    } catch (error) {
      toast.error("Failed to update API key. (Bad credentials)");
      console.error("Error updating API key:", error);
    }
  };

  return (
    <div className="chat-page">
      <div style={{ display: "flex", justifyContent: "space-between",flexWrap:"wrap" }}>
      <h2>Python Tutor Chat</h2>
      <div style={{display:"flex"}}>
          <input
            type="text"
            placeholder="Enter your API key..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <button style={{height:"50px"}} onClick={handleSaveApiKey}>Save</button>
        
      </div>
      </div>
      <div className="chat-window" ref={chatWindowRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {msg.sender === "user" ? (
                <>
                  <p>{msg.text}</p>
                  <img src="./images/user.jpeg" className="chat-img" />
                </>
              ) : (
                <>
                  <img src={characterImages[localStorage.getItem("sc")]} className="chat-img" />
                  <p>{msg.text}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your answer"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatPage;
