// src/components/GameBoard.js
import React, { useEffect, useRef } from 'react';

function GameBoard({ snake, food }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Clear canvas
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach(part => drawSnakePart(part, context));

    // Draw food
    context.fillStyle = "lightgreen";
    context.strokeStyle = "darkgreen";
    context.fillRect(food.x, food.y, 10, 10);
    context.strokeRect(food.x, food.y, 10, 10);
  }, [snake, food]);

  const drawSnakePart = (part, context) => {
    context.fillStyle = 'lightblue';
    context.strokeStyle = 'darkblue';
    context.fillRect(part.x, part.y, 10, 10);
    context.strokeRect(part.x, part.y, 10, 10);
  };

  return (
    <canvas
      ref={canvasRef}
      id="snakeboard"
      width="400"
      height="400"
      style={{
        border: '2px solid black',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white'
      }}
    ></canvas>
  );
}

export default GameBoard;
