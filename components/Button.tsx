import React from 'react';
import { Button as NativeBaseButton, IButtonProps, StyledProps } from 'native-base';

type ButtonProps = {
  children: React.ReactNode;
  onPress?: IButtonProps['onPress'];
} & StyledProps;

export function Button({ children, onPress, ...props }: ButtonProps) {
  return (
    <NativeBaseButton
      onPress={onPress}
      mt={4}
      bg="black"
      borderRadius="32px"
      px="32px"
      py="16px"
      _pressed={{ bg: "gray.700" }}
      {...props}
    >
      {children}
    </NativeBaseButton>
  );
}
