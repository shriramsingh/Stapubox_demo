import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackHeader } from './BackHeader';
import { commonStyles } from '../theme/commonStyles';
import { layout } from '../theme/layout';

type FormScreenProps = {
  children: React.ReactNode;
  footer?: React.ReactNode;
  onBack: () => void;
  title: string;
};

export function FormScreen({ children, footer, onBack, title }: FormScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={commonStyles.screen}>
      <BackHeader title={title} onBack={onBack} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.formContent, styles.contentContainer]}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
      {footer ? (
        <View style={[styles.footer, { paddingBottom: insets.bottom + 46 }]}>
          {footer}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  formContent: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: 23,
    paddingBottom: 28,
  },
  footer: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: 12,
  },
});
