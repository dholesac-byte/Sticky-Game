
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PlayerState, ObstacleState, PlayerSide } from '../types';
import {
  GAME_WIDTH, GAME_HEIGHT, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_SLIDE_SPEED,
  PLAYER_JUMP_VELOCITY_X, PLAYER_JUMP_VELOCITY_Y, WALL_THICKNESS, OBSTACLE_SPAWN_RATE,
  OBSTACLE_WIDTH, OBSTACLE_HEIGHT, OBSTACLE_SPEED
} from '../constants';
import { useGameLoop } from '../hooks/useGameLoop';
import Player from './Player';
import Obstacle from './Obstacle';

interface GameProps {
  onGameOver: (score: number) => void;
}

const Game: React.FC<GameProps> = ({ onGameOver }) => {
  const [player, setPlayer] = useState<PlayerState>({
    x: WALL_THICKNESS,
    y: GAME_HEIGHT / 2,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    side: PlayerSide.LEFT,
    isJumping: false,
  });
  const [obstacles, setObstacles] = useState<ObstacleState[]>([]);
  const [score, setScore] = useState(0);
  const [frameCount, setFrameCount] = useState(0);

  const gameStateRef = useRef({ player, obstacles, score, frameCount });
  useEffect(() => {
    gameStateRef.current = { player, obstacles, score, frameCount };
  }, [player, obstacles, score, frameCount]);

  const handleJump = useCallback(() => {
    setPlayer(p => ({ ...p, isJumping: true }));
  }, []);

  const gameLogic = useCallback(() => {
    const { player, obstacles } = gameStateRef.current;
    
    // Update Player Position
    let newPlayer = { ...player };
    if (newPlayer.isJumping) {
      const direction = newPlayer.side === PlayerSide.LEFT ? 1 : -1;
      newPlayer.x += PLAYER_JUMP_VELOCITY_X * direction;
      newPlayer.y += PLAYER_JUMP_VELOCITY_Y;

      // Wall collision
      if (direction === 1 && newPlayer.x >= GAME_WIDTH - WALL_THICKNESS - newPlayer.width) {
        newPlayer.x = GAME_WIDTH - WALL_THICKNESS - newPlayer.width;
        newPlayer.isJumping = false;
        newPlayer.side = PlayerSide.RIGHT;
      } else if (direction === -1 && newPlayer.x <= WALL_THICKNESS) {
        newPlayer.x = WALL_THICKNESS;
        newPlayer.isJumping = false;
        newPlayer.side = PlayerSide.LEFT;
      }
    } else {
      // Slide down
      newPlayer.y += PLAYER_SLIDE_SPEED;
    }

    // Boundary checks
    if (newPlayer.y < 0) newPlayer.y = 0;
    if (newPlayer.y > GAME_HEIGHT - newPlayer.height) {
      onGameOver(gameStateRef.current.score);
      return;
    }

    // Update Obstacles
    const newObstacles = obstacles
      .map(o => ({ ...o, y: o.y + OBSTACLE_SPEED }))
      .filter(o => o.y < GAME_HEIGHT);

    // Spawn new obstacles
    if (gameStateRef.current.frameCount % OBSTACLE_SPAWN_RATE === 0) {
      const newSide = Math.random() > 0.5 ? PlayerSide.LEFT : PlayerSide.RIGHT;
      newObstacles.push({
        id: Date.now(),
        side: newSide,
        y: -OBSTACLE_HEIGHT,
        width: OBSTACLE_WIDTH,
        height: OBSTACLE_HEIGHT,
      });
    }

    // Collision Detection
    for (const obstacle of newObstacles) {
      const obstacleX = obstacle.side === PlayerSide.LEFT ? WALL_THICKNESS : GAME_WIDTH - WALL_THICKNESS - obstacle.width;
      if (
        newPlayer.x < obstacleX + obstacle.width &&
        newPlayer.x + newPlayer.width > obstacleX &&
        newPlayer.y < obstacle.y + obstacle.height &&
        newPlayer.y + newPlayer.height > obstacle.y
      ) {
        onGameOver(gameStateRef.current.score);
        return;
      }
    }

    setPlayer(newPlayer);
    setObstacles(newObstacles);
    setScore(s => s + 1);
    setFrameCount(f => f + 1);
  }, [onGameOver]);

  useGameLoop(gameLogic, true);
  
  const scoreDisplay = Math.floor(score / 10);

  return (
    <div
      className="relative bg-black/30 backdrop-blur-sm border-2 border-cyan-400/50 rounded-lg cursor-pointer overflow-hidden"
      style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
      onClick={handleJump}
    >
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-5xl font-bold text-white opacity-50 z-10" style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.7)' }}>
        {scoreDisplay}
      </div>

      <div className="absolute top-0 left-0 bg-gray-700/50" style={{width: WALL_THICKNESS, height: GAME_HEIGHT}}></div>
      <div className="absolute top-0 right-0 bg-gray-700/50" style={{width: WALL_THICKNESS, height: GAME_HEIGHT}}></div>
      
      <Player playerState={player} />
      {obstacles.map(obstacle => (
        <Obstacle key={obstacle.id} obstacleState={obstacle} />
      ))}
    </div>
  );
};

export default Game;
