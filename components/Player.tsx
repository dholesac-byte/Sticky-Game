
import React from 'react';
import { PlayerState } from '../types';

interface PlayerProps {
  playerState: PlayerState;
}

const Player: React.FC<PlayerProps> = ({ playerState }) => {
  const { x, y, width, height } = playerState;
  return (
    <div
      className="absolute bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(0,255,255,0.7)] transition-transform duration-100"
      style={{
        left: x,
        top: y,
        width: width,
        height: height,
      }}
    />
  );
};

export default Player;
