import React from 'react';
import { ActivityIndicator, Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';

type PrimaryButtonProps = {
  disabled?: boolean;
  label: string;
  loading?: boolean;
  onPress: () => void;
};

export function PrimaryButton({ disabled, label, loading, onPress }: PrimaryButtonProps) {
  const isDisabled = disabled || loading;
  const handlePress = () => {
    Keyboard.dismiss();
    onPress();
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      disabled={isDisabled}
      onPressIn={handlePress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      android_ripple={isDisabled ? undefined : { color: 'rgba(255, 255, 255, 0.18)' }}
      style={({ pressed }) => [
        styles.primaryButton,
        isDisabled && styles.primaryButtonDisabled,
        pressed && !isDisabled && styles.primaryButtonPressed,
      ]}>
      <View style={styles.buttonContent}>
        {loading ? <ActivityIndicator color={colors.white} /> : null}
        <Text
          style={[
            styles.primaryButtonText,
            isDisabled && styles.primaryButtonTextDisabled,
            loading && styles.loadingText,
          ]}>
          {loading ? 'Please wait...' : label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    width: '100%',
    minHeight: 56,
    borderRadius: 14,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  primaryButtonDisabled: {
    backgroundColor: colors.disabled,
  },
  primaryButtonPressed: {
    opacity: 0.82,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  primaryButtonTextDisabled: {
    color: colors.disabledText,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    marginLeft: 10,
  },
});
