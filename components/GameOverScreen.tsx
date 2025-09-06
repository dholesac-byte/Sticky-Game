
import React from 'react';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestart }) => {
  const displayScore = Math.floor(score / 10);
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-black/30 backdrop-blur-sm rounded-lg border-2 border-pink-500/50"
         style={{ width: 400, height: 700 }}>
      <h2 className="text-5xl font-bold mb-2 text-pink-400">Game Over</h2>
      <p className="text-xl mb-4">Your Score:</p>
      <p className="text-7xl font-bold mb-8 text-white" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.7)' }}>
        {displayScore}
      </p>
      <button
        onClick={onRestart}
        className="px-8 py-4 bg-cyan-500 text-white text-2xl font-bold rounded-lg shadow-lg shadow-cyan-500/50 transition-all duration-300 transform hover:scale-110 hover:bg-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-300"
      >
        Play Again
      </button>
    </div>
  );
};

export default GameOverScreen;
