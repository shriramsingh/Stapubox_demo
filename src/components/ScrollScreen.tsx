import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { colors } from '../theme/colors';
import { layout } from '../theme/layout';

export function ScrollScreen({ children }: { children: React.ReactNode }) {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollScreen}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollScreen: {
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingHorizontal: layout.screenPadding,
    paddingBottom: 42,
  },
});
