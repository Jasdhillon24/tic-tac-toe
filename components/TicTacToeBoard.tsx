import React from 'react';
import { Box, HStack, Text } from 'native-base';
import { Cell } from "@/types/game.types";
import { TouchableOpacity, Dimensions } from 'react-native';

type BoardProps = {
  board: Cell[][];
  onCellPress: (row: number, col: number) => void;
  disabled?: boolean;
  boardSize: number;
};

export function TicTacToeBoard({ 
  board, 
  onCellPress, 
  disabled, 
  boardSize 
}: BoardProps) {
  const screenWidth = Dimensions.get('window').width;
  const padding = 20;
  const maxBoardWidth = screenWidth - padding * 2;
  const cubeSize = Math.floor(maxBoardWidth / boardSize);

  return (
    <Box px={4} py={6}>
      {board.map((row, rowIndex) => (
        <HStack key={rowIndex} space={2} justifyContent="center">
          {row.map((cell, colIndex) => (
            <TouchableOpacity
              key={colIndex}
              onPress={() => onCellPress(rowIndex, colIndex)}
              disabled={disabled}
            >
              <Box
                w={`${cubeSize}px`}
                h={`${cubeSize}px`}
                bg="gray.100"
                borderRadius="md"
                justifyContent="center"
                alignItems="center"
                mb="12px"
              >
                <Text fontSize="4xl">{cell?.toUpperCase() ?? ''}</Text>
              </Box>
            </TouchableOpacity>
          ))}
        </HStack>
      ))}
    </Box>
  );
}
