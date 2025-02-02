import { Link } from "react-router-dom";

function CharacterSelect({ selectedCharacter,onCharacterSelect }) {
  

  const characters = [
    {
      name: "PyBuddy",
      image: "./images/pybot.jpeg", // Placeholder image URL for PyBuddy
      description: "PyBuddy, the playful Python! He loves teaching coding through fun stories.",
    },
    {
      name: "CodeBot",
      image: "./images/robot.jpeg", // Placeholder image URL for CodeBot
      description: "CodeBot, the friendly AI robot! He explains coding step-by-step and gives you challenges.",
    },
  ];


  return (
    <div className="character-select">
      <h2>Choose Your Python Tutor</h2>

      <div className="character-options">
        {characters.map((character) => (
          <div
            key={character.name}
            className="character-card"
            onClick={() => onCharacterSelect(character)}
            style={{border:selectedCharacter && selectedCharacter.name === character.name ? "3px solid green" : ""}}
          >
            <img
              src={character.image}
              alt={character.name}
              style={{ width: "200px", height: "200px" }}
            />
            <h3>{character.name}</h3>
            <p>{character.description}</p>
          </div>
        ))}
      </div>

      {selectedCharacter && (
        <div className="selected-character">
          <h3>You selected: <span className="character">{selectedCharacter.name}</span> </h3>
          <p>{selectedCharacter.description}</p>
          <Link to="/chat">
          <button className="homeButton">Next</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default CharacterSelect;
