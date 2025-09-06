
import React from 'react';
import { ObstacleState, PlayerSide } from '../types';
import { GAME_WIDTH, WALL_THICKNESS } from '../constants';

interface ObstacleProps {
  obstacleState: ObstacleState;
}

const Obstacle: React.FC<ObstacleProps> = ({ obstacleState }) => {
  const { y, width, height, side } = obstacleState;

  const x = side === PlayerSide.LEFT
    ? WALL_THICKNESS
    : GAME_WIDTH - WALL_THICKNESS - width;

  return (
    <div
      className="absolute bg-pink-500 rounded-md shadow-[0_0_15px_rgba(236,72,153,0.7)]"
      style={{
        left: x,
        top: y,
        width: width,
        height: height,
      }}
    />
  );
};

export default Obstacle;
