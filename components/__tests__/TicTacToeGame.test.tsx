import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import { TicTacToeGame } from '../TicTacToeGame';
import { renderWithProvider } from './testUtils';

jest.mock('react-native-safe-area-context', () => {
  const SafeAreaContext = jest.requireActual('react-native-safe-area-context');
  return {
    ...SafeAreaContext,
    SafeAreaProvider: ({ children }: any) => children,
    useSafeAreaInsets: () => ({ top: 0, left: 0, right: 0, bottom: 0 }),
  };
});

describe('TicTacToeGame', () => {
  it('renders the initial game board and elements correctly', () => {
    renderWithProvider(<TicTacToeGame />);

    expect(screen.getByText('Tic Tac Toe')).toBeTruthy();
    expect(screen.getByText('Current player: X')).toBeTruthy();
    expect(screen.getByText('Reset Game')).toBeTruthy();
  });

  it('updates the board and switches player on cell press', () => {
    renderWithProvider(<TicTacToeGame />);

    const firstCell = screen.getAllByText('')[0];
    fireEvent.press(firstCell);

    expect(screen.getByText('Current player: O')).toBeTruthy();
  });

  it('resets the game when Reset Game button is pressed', () => {
    renderWithProvider(<TicTacToeGame />);

    const firstCell = screen.getAllByText('')[0];
    fireEvent.press(firstCell);
    fireEvent.press(screen.getByText('Reset Game'));

    expect(screen.getByText('Current player: X')).toBeTruthy();
    screen.getAllByText('').forEach(cell => {
      expect(cell).toBeTruthy();
    });
  });
});
