export type Symbol = 'x' | 'o';

export type Cell = Symbol | null;

export type GameState = {
  isValid: boolean;
  winner?: Symbol | null;
  isDraw?: boolean;
  error?: string;
};
