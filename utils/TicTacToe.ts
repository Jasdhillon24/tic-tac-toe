import { Symbol, Cell, GameState } from "@/types/game.types";

export class TicTacToe {
  private gameBoard: Cell[][];
  private symbolsPerRow: { [key: string]: number[] };
  private symbolsPerColumn: { [key: string]: number[] };
  private leftToRightDiagonalCount: { [key: string]: number };
  private rightToLeftDiagonalCount: { [key: string]: number };
  private totalMovesMade: number;
  private lastPlayerSymbol: Symbol | null;

  constructor(size: number = 3) {
    if (size < 3) throw new Error('gameBoard size must be at least 3');
    
    this.gameBoard = Array.from({ length: size }, () => Array(size).fill(null));
    this.totalMovesMade = 0;
    this.lastPlayerSymbol = null;
    
    this.symbolsPerRow = { x: Array(size).fill(0), o: Array(size).fill(0) };
    this.symbolsPerColumn = { x: Array(size).fill(0), o: Array(size).fill(0) };
    this.leftToRightDiagonalCount = { x: 0, o: 0 };
    this.rightToLeftDiagonalCount = { x: 0, o: 0 };
  }

  place_marker(symbol: Symbol, row: number, column: number): GameState {
    if (!this.isValidPosition(row, column)) {
      return { isValid: false, error: 'Invalid position' };
    }
  
    if (!this.isValidSymbol(symbol)) {
      return { isValid: false, error: 'Invalid symbol' };
    }
  
    if (this.gameBoard[row][column] !== null) {
      return { isValid: false, error: 'Position already taken' };
    }
  
    if (this.lastPlayerSymbol === symbol) {
      return { isValid: false, error: 'Not your turn' };
    }
  
    this.gameBoard[row][column] = symbol;
    this.totalMovesMade++;
    this.lastPlayerSymbol = symbol;
  
    const size = this.gameBoard.length;
  
    this.symbolsPerRow[symbol][row]++;
    this.symbolsPerColumn[symbol][column]++;
  
    if (row === column) {
      this.leftToRightDiagonalCount[symbol]++;
    }
  
    if (row + column === size - 1) {
      this.rightToLeftDiagonalCount[symbol]++;
    }
  
    if (
      this.symbolsPerRow[symbol][row] === size ||
      this.symbolsPerColumn[symbol][column] === size ||
      this.leftToRightDiagonalCount[symbol] === size ||
      this.rightToLeftDiagonalCount[symbol] === size
    ) {
      return { isValid: true, winner: symbol };
    }
  
    if (this.totalMovesMade === size * size) {
      return { isValid: true, isDraw: true };
    }
  
    return { isValid: true };
  }
  
  getBoard(): Cell[][] {
    return this.gameBoard.map(row => [...row]);
  }

  private isValidPosition(row: number, column: number): boolean {
    return row >= 0 && row < this.gameBoard.length && column >= 0 && column < this.gameBoard.length;
  }

  private isValidSymbol(symbol: Symbol): boolean {
    return symbol === 'x' || symbol === 'o';
  }
}
