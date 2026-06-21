import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { colors } from '../theme/colors';
import { commonStyles } from '../theme/commonStyles';
import { layout } from '../theme/layout';

type LabeledInputProps = React.ComponentProps<typeof TextInput> & {
  label: string;
};

export function LabeledInput({ label, style, ...props }: LabeledInputProps) {
  return (
    <View style={styles.field}>
      <Text style={commonStyles.fieldLabel}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.placeholder}
        style={[styles.input, style]}
        {...props}
      />
    </View>
  );
}

export const inputStyles = StyleSheet.create({
  input: {
    height: layout.inputHeight,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: layout.radiusSmall,
    color: colors.white,
    fontSize: 16,
    paddingHorizontal: 12,
  },
});

const styles = StyleSheet.create({
  field: {
    marginBottom: 31,
  },
  input: inputStyles.input,
});
