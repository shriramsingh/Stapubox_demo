import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { images } from '../constants/images';
import { layout } from '../theme/layout';
import { colors } from '../theme/colors';

type BackHeaderProps = {
  title: string;
  onBack: () => void;
};

export function BackHeader({ title, onBack }: BackHeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        onPress={onBack}
        android_ripple={{ color: 'rgba(255,255,255,0.18)', radius: 20 }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        pressRetentionOffset={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={styles.backButton}>
        <View style={styles.backIconWrapper}>
          <Image source={images.backArrow} style={styles.backIcon} />
        </View>
      </Pressable>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.headerSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 58,
    paddingHorizontal: layout.screenPadding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#222224',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 16,
    height: 16,
  },
  headerTitle: {
    flex: 1,
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 32,
  },
});
