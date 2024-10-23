
import { TicTacToe } from "../TicTacToe";

describe('TicTacToe', () => {
  let game: TicTacToe;

  beforeEach(() => {
    game = new TicTacToe(3);
  });

  it('should create board with specified size', () => {
    const game5x5 = new TicTacToe(5);
    expect(game5x5.getBoard()).toHaveLength(5);
    expect(game5x5.getBoard()[0]).toHaveLength(5);
  });

  it('should not allow invalid board size', () => {
    expect(() => new TicTacToe(2)).toThrow();
  });

  it('should validate symbol', () => {
    const result = game.place_marker('invalid' as any, 0, 0);
    expect(result.isValid).toBeFalsy();
    expect(result.error).toBe('Invalid symbol');
  });

  it('should validate position', () => {
    const result = game.place_marker('x', 3, 0);
    expect(result.isValid).toBeFalsy();
    expect(result.error).toBe('Invalid position');
  });

  it('should detect row win', () => {
    game.place_marker('x', 0, 0);
    game.place_marker('o', 1, 0);
    game.place_marker('x', 0, 1);
    game.place_marker('o', 1, 1);
    const result = game.place_marker('x', 0, 2);
    expect(result.winner).toBe('x');
  });

  it('should detect draw', () => {
    game.place_marker('x', 0, 0);
    game.place_marker('o', 0, 2);
    game.place_marker('x', 0, 1);
    game.place_marker('o', 1, 0);
    game.place_marker('x', 1, 2);
    game.place_marker('o', 1, 1);
    game.place_marker('x', 2, 0);
    game.place_marker('o', 2, 1);
    
    const result = game.place_marker('x', 2, 2);

    expect(result.isValid).toBeTruthy();
    expect(result.isDraw).toBeTruthy();
    expect(result.winner).toBeUndefined();
  });  
});