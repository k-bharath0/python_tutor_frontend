import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to Python Tutor for Kids!</h1>
      <h2>✨ **What Makes This Special?**</h2>
      <ul>
        <li>👦 **Personalized Learning** – AI adjusts to each child's learning pace.</li>
        <li>🎮 **Gamified Lessons** – Kids earn stars ⭐ for correct answers!</li>
        <li>🤖 **Custom AI Tutor Characters** – Choose from **PyBuddy** 🐍 or **CodeBot** 🤖 to guide your learning!</li>
        <li>📝 **Interactive Quizzes** – Learn through fun coding challenges!</li>
        <li>🔑 **Custom API Key Support** – If the host API key is exhausted, users can enter their own API key.</li>
      </ul>

      <h2>⚙️ **How We Built This**</h2>
      <ul>
        <li>🚀 **Powered by OpenAI GPT-4o** – Uses advanced AI for Python tutoring.</li>
        <li>🔑 **API Key Handling** – If the host key runs out, users can enter their own API key, which resets to default after 1 hour.</li>
      </ul>

      <h2>🔑 **Set Up Your Own API Key**</h2>
      <p>
        If you want to use your own API key, follow these steps:
      </p>
      <ol>
        <li>🔗 **Login to GitHub** and open this link:  
          <a href="https://github.com/marketplace/models/azure-openai/gpt-4o" target="_blank" rel="noopener noreferrer">Azure OpenAI GPT-4o</a>
        </li>
        <li>🛠️ **Generate an API Key**: Click **Developer Key → Generate Token**.</li>
        <li>✏️ **Enter Your Key**: Paste it into the API Key field on the chat page.</li>
      </ol>
      <Link to="/char">
        <button className="homeButton">Start Learning 🚀</button>
      </Link>
    </div>
  );
}

export default HomePage;
