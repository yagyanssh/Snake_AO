import { createContext, useContext, useState, ReactNode } from "react";

const gameModes = {
  START: "start",
  PLAYING: "playing",
  GAME_OVER: "game_over"
};

const GameContext = createContext(undefined);

export const GameProvider = ({ children }) => {
  const [mode, setMode] = useState(gameModes.START); 
  const [score, setScore] = useState(0); 
  const [highScore, setHighScore] = useState(0); 
  const [snake, setSnake] = useState([]); 
  const [food, setFood] = useState({ x: 0, y: 0 }); 
  const [gameSpeed, setGameSpeed] = useState(200); 

  const startGame = () => {
    setMode(gameModes.PLAYING);
    setScore(0);
    setSnake([{ x: 10, y: 10 }]); 
    setFood(generateRandomFoodPosition());
  };

  
  const endGame = () => {
    setMode(gameModes.GAME_OVER);
    if (score > highScore) {
      setHighScore(score);
    }
  };

  
  const generateRandomFoodPosition = () => {
    const x = Math.floor(Math.random() * 20); 
    const y = Math.floor(Math.random() * 20);
    return { x, y };
  };

  return (
    <GameContext.Provider
      value={{
        mode,
        setMode,
        score,
        setScore,
        highScore,
        setHighScore,
        snake,
        setSnake,
        food,
        setFood,
        gameSpeed,
        setGameSpeed,
        startGame,
        endGame,
        generateRandomFoodPosition,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};


export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
