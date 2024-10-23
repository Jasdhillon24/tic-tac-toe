import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import { TicTacToeBoard } from '../TicTacToeBoard';
import { Cell } from '@/types/game.types';
import { renderWithProvider } from './testUtils';

jest.mock('react-native-safe-area-context', () => {
  const SafeAreaContext = jest.requireActual('react-native-safe-area-context');
  return {
    ...SafeAreaContext,
    SafeAreaProvider: ({ children }: any) => children,
    useSafeAreaInsets: () => ({ top: 0, left: 0, right: 0, bottom: 0 }),
  };
});

describe('TicTacToeBoard', () => {
  const boardMock: Cell[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const mockOnCellPress = jest.fn();

  it('renders the board correctly', () => {
    renderWithProvider(
      <TicTacToeBoard board={boardMock} onCellPress={mockOnCellPress} boardSize={3} />
    );

    const cells = screen.getAllByText('');
    expect(cells.length).toBe(9);
  });

  it('calls onCellPress when a cell is pressed', () => {
    renderWithProvider(
      <TicTacToeBoard board={boardMock} onCellPress={mockOnCellPress} boardSize={3} />
    );

    const firstCell = screen.getAllByText('')[0];
    fireEvent.press(firstCell);

    expect(mockOnCellPress).toHaveBeenCalledWith(0, 0);
  });
});
