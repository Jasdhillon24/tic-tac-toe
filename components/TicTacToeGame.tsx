import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Center, Select, Text, View, VStack } from 'native-base';
import { TicTacToeBoard } from './TicTacToeBoard';
import { Symbol } from '../types/game.types';
import { TicTacToe } from '@/utils/TicTacToe';
import { Button } from './Button';
import { Confetti } from './Confetti';

export const TicTacToeGame = () => {
  const [boardSize, setBoardSize] = useState(3);
  const [game, setGame] = useState(() => new TicTacToe(boardSize));
  const [board, setBoard] = useState(() => game.getBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Symbol>('x');
  const [winner, setWinner] = useState<Symbol | null>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCellPress = (row: number, col: number) => {
    if (winner || isDraw || board[row][col]) {
      return;
    }

    const result = game.place_marker(currentPlayer, row, col);
    
    if (result.isValid) {
      setBoard(game.getBoard());
      setCurrentPlayer(currentPlayer === 'x' ? 'o' : 'x');
      
      if (result.winner) {
        setWinner(result.winner);
        setShowConfetti(true);
      } else if (result.isDraw) {
        setIsDraw(true);
      }
    }
  };

  const resetGame = () => {
    const newGame = new TicTacToe(boardSize);
    setGame(newGame);
    setBoard(newGame.getBoard());
    setCurrentPlayer('x');
    setWinner(null);
    setIsDraw(false);
    setShowConfetti(false);
  };

  const handleSizeChange = (value: number) => {
    setBoardSize(value);
    const newGame = new TicTacToe(value);
    setGame(newGame);
    setBoard(newGame.getBoard());
    setWinner(null);
    setIsDraw(false);
    setCurrentPlayer('x');
    setShowConfetti(false);
  };

  const getGameMessage = (
    winner: Symbol | null,
    isDraw: boolean,
    currentPlayer: Symbol
  ): string => {
    if (winner) {
      return `Player ${winner.toUpperCase()} wins!`;
    }
    if (isDraw) {
      return "It's a draw!";
    }
    return `Current player: ${currentPlayer.toUpperCase()}`;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View flex={1} bg="white">
        <VStack space={2} alignItems="center">
          <Text fontSize="3xl" bold>Tic Tac Toe</Text>
          <Text fontSize="xl">
            {getGameMessage(winner, isDraw, currentPlayer)}
          </Text>

          <Select
            mt="12px"
            minWidth="200px"
            accessibilityLabel="Game Size"
            placeholder="Game Size"
            selectedValue={String(boardSize)}
            onValueChange={(value) => handleSizeChange(Number(value))}
          >
            <Select.Item label="3x3" value="3" />
            <Select.Item label="5x5" value="5" />
            <Select.Item label="6x6" value="6" />
          </Select>
          
          <TicTacToeBoard 
            board={board}
            onCellPress={handleCellPress}
            disabled={!!winner || isDraw}
            boardSize={boardSize}
          />
          
          <Button onPress={resetGame}>
            Reset Game
          </Button>

          <Confetti
            isVisible={showConfetti}
            onAnimationFinish={() => setShowConfetti(false)}
          />
        </VStack>
      </View>
    </SafeAreaView>
  );
};
