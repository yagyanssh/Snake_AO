import React, { useEffect, useRef } from 'react';
import Score from './Score';

function GameBoard({ snake, food , score}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    snake.forEach(part => drawSnakePart(part, context));

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
    <div className='relative'>
    <canvas
      ref={canvasRef}
      id="snakeboard"
      width="400"
      height="400"
      style={{
        border: '2px solid black',
        backgroundColor: 'white'
      }}
    ></canvas>
    <Score score={score}/>
    </div>
  );
}

export default GameBoard;
