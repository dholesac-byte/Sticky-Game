
import React, { useState, useCallback } from 'react';
import Game from './components/Game';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import { GameState } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [score, setScore] = useState(0);

  const startGame = useCallback(() => {
    setScore(0);
    setGameState(GameState.RUNNING);
  }, []);

  const gameOver = useCallback((finalScore: number) => {
    setScore(finalScore);
    setGameState(GameState.GAME_OVER);
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case GameState.RUNNING:
        return <Game onGameOver={gameOver} />;
      case GameState.GAME_OVER:
        return <GameOverScreen score={score} onRestart={startGame} />;
      case GameState.IDLE:
      default:
        return <StartScreen onStart={startGame} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-indigo-900 flex flex-col items-center justify-center p-4 font-sans text-white">
      <header className="absolute top-0 left-0 right-0 p-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 tracking-widest" style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.7)' }}>
          STICKY CLIMBER
        </h1>
      </header>
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
