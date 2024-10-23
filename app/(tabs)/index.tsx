import { TicTacToeGame } from '@/components';
import { View } from 'native-base';

export default function HomeScreen() {
  return (
      <View flex={1} bg="white">
        <TicTacToeGame />
      </View>
  );
}