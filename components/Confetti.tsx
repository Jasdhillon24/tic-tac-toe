import React from 'react';
import { Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

type ConfettiProps = {
  isVisible: boolean;
  onAnimationFinish: () => void;
};

export function Confetti({ isVisible, onAnimationFinish }: ConfettiProps) {
  return (
    <LottieView
      source={require('../assets/animations/confetti.json')}
      autoPlay={isVisible}
      loop={false}
      style={{
        width: width,
        height: height,
        position: 'absolute',
        zIndex: 10,
        opacity: isVisible ? 1 : 0,
        pointerEvents: 'none',
      }}
      onAnimationFinish={onAnimationFinish}
    />
  );
}
