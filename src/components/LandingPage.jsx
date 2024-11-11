import React from "react";
import { Play, Target, BarChart, Shield, Link } from "lucide-react";
import PlayerProfile from "./PlayerProfile";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-between bg-green-900 text-white px-6 md:px-12 min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-center text-center max-w-4xl w-full">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">Snake Game</h2>
        <p className="text-xl md:text-2xl mb-8 text-gray-300">
          The classic game of snake—eat, grow, and survive!
        </p>
        <div className="flex items-center justify-center gap-4 w-full">
          <PlayerProfile />
        </div>

        
        <button onClick={() => navigate("/snake-game")} className="bg-green-600 text-white py-3 px-8 rounded-lg text-lg hover:bg-green-700 transition">
          Start Game
        </button>
        

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {[
            { icon: Target, text: "Eat Food" },
            { icon: BarChart, text: "Increase Score" },
            { icon: Shield, text: "Avoid Obstacles" },
            { icon: Play, text: "High Scores" },
          ].map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <feature.icon className="h-8 w-8 mb-2" />
              <span className="text-sm">{feature.text}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
