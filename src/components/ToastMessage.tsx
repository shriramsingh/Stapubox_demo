import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';

type ToastMessageProps = {
  visible: boolean;
  message?: string;
  type?: 'success' | 'error';
};

export function ToastMessage({ visible, message, type = 'success' }: ToastMessageProps) {
  const translateY = useRef(new Animated.Value(-90)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : -90,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [visible, translateY]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.toast,
        type === 'error' ? styles.innerError : styles.innerSuccess,
        { transform: [{ translateY }] },
      ]}>
      <View style={[styles.inner, type === 'error' ? styles.innerError : styles.innerSuccess]}>
        <Text style={[styles.text, type === 'error' ? styles.textError : styles.textSuccess]}>
          {message}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 14,
    zIndex: 50,
    elevation: 50,
  },
  inner: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  innerSuccess: {
    backgroundColor: '#e6f7ff',
  },
  innerError: {
    backgroundColor: '#fdecea',
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  textSuccess: {
    color: '#0b5d8f',
  },
  textError: {
    color: '#9b1c1c',
  },
});
