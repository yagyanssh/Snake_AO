// src/components/Score.js
import React from 'react';

function Score({ score }) {
  return (
    <div id="score" style={{ textAlign: 'center', fontSize: '40px' }}>
      {score}
    </div>
  );
}

export default Score;
