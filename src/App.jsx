import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import { ToastContainer } from 'react-toastify';
import HomePage from "./HomePage";
import ChatPage from "./ChatPage";
import CharacterSelect from './CharacterSelect';


function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
  };

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/char" element={<CharacterSelect selectedCharacter={selectedCharacter} onCharacterSelect={handleCharacterSelect} />}/>
        <Route path="/chat" element={<ChatPage selectedCharacter={selectedCharacter}/>} />
      </Routes>
      <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
      />
    </Router>
    </>
  )
}

export default App
