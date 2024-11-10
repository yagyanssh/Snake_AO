import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useConnection } from "arweave-wallet-kit";
import "./App.css";
import GameBoard from "./components/GameBoard";
import Score from "./components/Score";
import Header from "./components/Headers";
import PlayerProfile from "./components/PlayerProfile";
import { GameProvider } from "./context/GameContext";
import LandingPage from "./components/LandingPage";

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [snake, setSnake] = useState([
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 },
  ]);
  const [food, setFood] = useState({ x: 100, y: 100 });
  const [dx, setDx] = useState(10);
  const [dy, setDy] = useState(0);
  const [score, setScore] = useState(0);
  const [changingDirection, setChangingDirection] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const boardWidth = 400;
  const boardHeight = 400;

  useEffect(() => {
    if (!isPlaying) return;
    document.addEventListener("keydown", changeDirection);
    // generateFood();

    const gameInterval = setInterval(() => {
      if (!hasGameEnded()) {
        moveSnake();
      } else {
        clearInterval(gameInterval);
        alert("Game Over! Your final score is " + score);
        setIsPlaying(false);
      }
    }, 100);

    return () => {
      document.removeEventListener("keydown", changeDirection);
      clearInterval(gameInterval);
    };
  }, [isPlaying, snake, dx, dy]);

  const {
    connect,
    walletAddress: connectedAddress,
    disconnect,
    connected,
  } = useConnection();

  useEffect(() => {
    if (connected) {
      setWalletAddress(connectedAddress);
    }
  }, [connected, connectedAddress]);

  function startGame() {
    setSnake([
      { x: 200, y: 200 },
      { x: 190, y: 200 },
      { x: 180, y: 200 },
      { x: 170, y: 200 },
      { x: 160, y: 200 },
    ]);
    setDx(10);
    setDy(0);
    setScore(0);
    generateFood();
    setIsPlaying(true);
  }

  function random_food(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
  }

  function generateFood() {
    let food_x, food_y;
    do {
      food_x = random_food(0, boardWidth - 10);
      food_y = random_food(0, boardHeight - 10);
    } while (snake.some((part) => part.x === food_x && part.y === food_y));

    // Use setFood to update the state and trigger a re-render
    setFood({ x: food_x, y: food_y });
    console.log(`New food generated at (${food_x}, ${food_y})`); // Debugging statement
  }

  function changeDirection(event) {
    if (changingDirection) return;
    setChangingDirection(true);

    const { keyCode } = event;
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (keyCode === LEFT_KEY && dx === 0) {
      setDx(-10);
      setDy(0);
    }
    if (keyCode === UP_KEY && dy === 0) {
      setDx(0);
      setDy(-10);
    }
    if (keyCode === RIGHT_KEY && dx === 0) {
      setDx(10);
      setDy(0);
    }
    if (keyCode === DOWN_KEY && dy === 0) {
      setDx(0);
      setDy(10);
    }
  }

  function moveSnake() {
    const newSnake = [...snake];
    const head = { x: newSnake[0].x + dx, y: newSnake[0].y + dy };

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setScore(score + 10);
      generateFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
    setChangingDirection(false);
  }

  function hasGameEnded() {
    const head = snake[0];

    // Check if snake hits the walls
    if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400) {
      return true;
    }

    // Check if snake hits itself
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        return true;
      }
    }

    return false;
  }

  return (
    <>
      <GameProvider>
        {/* <Header /> */}
        <div style={{ textAlign: "center" }}>
          <h2>Welcome to the Snake Game on AO</h2>

          {/* Display Wallet Connection */}
          {/* {!connected ? (
          <div>
            <button onClick={connect}>Connect to Arweave Wallet</button>
            <p>Click the button to connect your wallet</p>
          </div>
        ) : (
          <div>
            <p>Connected Wallet Address: {walletAddress}</p>
            <button onClick={disconnect}>Disconnect Wallet</button>
          </div>
        )} */}
        </div>
        <div>
          <Score score={score} />
          <GameBoard snake={snake} food={food} />
        </div>
        {!isPlaying && (
          <div style={{ textAlign: "center", marginTop: "5px" }}>
            <button onClick={startGame}>Start Game</button>
          </div>
        )}
      
      </GameProvider>
    </>
  );
}

export default App;
