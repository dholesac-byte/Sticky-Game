
export enum GameState {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  GAME_OVER = 'GAME_OVER',
}

export enum PlayerSide {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export interface PlayerState {
  x: number;
  y: number;
  width: number;
  height: number;
  side: PlayerSide;
  isJumping: boolean;
}

export interface ObstacleState {
  id: number;
  y: number;
  width: number;
  height: number;
  side: PlayerSide;
}
