// src/components/Score.js
import React from 'react';

function Score({ score }) {
  return (
    <div className='absolute top-2 right-2 text-2xl'>
      {score}
    </div>
  );
}

export default Score;
