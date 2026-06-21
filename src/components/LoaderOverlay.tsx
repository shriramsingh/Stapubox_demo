import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';

type LoaderOverlayProps = {
  visible: boolean;
  message?: string;
};

export function LoaderOverlay({ visible, message }: LoaderOverlayProps) {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay} pointerEvents="box-only">
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.white} />
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 22,
    borderRadius: 16,
    backgroundColor: 'rgba(36, 38, 40, 0.95)',
    alignItems: 'center',
  },
  message: {
    color: colors.white,
    marginTop: 12,
    fontSize: 14,
    textAlign: 'center',
  },
});
