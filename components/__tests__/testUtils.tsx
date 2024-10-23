import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { render } from '@testing-library/react-native';

export const renderWithProvider = (ui: React.ReactElement) => {
  return render(<NativeBaseProvider>{ui}</NativeBaseProvider>);
};