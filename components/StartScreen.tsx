
import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-black/30 backdrop-blur-sm rounded-lg border-2 border-cyan-400/50"
         style={{ width: 400, height: 700 }}>
      <h2 className="text-4xl font-bold mb-4 text-cyan-300">Welcome!</h2>
      <p className="text-lg mb-8 max-w-xs">
        Click anywhere on the screen to jump from wall to wall. Avoid the pink obstacles and climb as high as you can!
      </p>
      <button
        onClick={onStart}
        className="px-8 py-4 bg-cyan-500 text-white text-2xl font-bold rounded-lg shadow-lg shadow-cyan-500/50 transition-all duration-300 transform hover:scale-110 hover:bg-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-300"
      >
        Start Game
      </button>
    </div>
  );
};

export default StartScreen;
