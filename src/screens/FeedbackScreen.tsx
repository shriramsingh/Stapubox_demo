import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

import { FormScreen } from '../components/FormScreen';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { commonStyles } from '../theme/commonStyles';
import { layout } from '../theme/layout';

type FeedbackScreenProps = {
  feedback: string;
  canSubmit: boolean;
  onBack: () => void;
  onChange: (feedback: string) => void;
  onSubmit: () => void;
};

export function FeedbackScreen({
  feedback,
  canSubmit,
  onBack,
  onChange,
  onSubmit,
}: FeedbackScreenProps) {
  const count = Math.min(feedback.length, 1000);

  return (
    <FormScreen
      title="Share Your Feedback"
      onBack={onBack}
      footer={
        <PrimaryButton label="Next" disabled={!canSubmit} onPress={onSubmit} />
      }>
      <Text style={commonStyles.fieldLabel}>Feedback</Text>
      <TextInput
        maxLength={1000}
        multiline
        onChangeText={onChange}
        placeholder="Write your suggestion"
        placeholderTextColor={colors.placeholder}
        style={styles.textArea}
        textAlignVertical="top"
        value={feedback}
      />
      <Text style={styles.counter}>{count}/1000</Text>
    </FormScreen>
  );
}

const styles = StyleSheet.create({
  textArea: {
    height: 214,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: layout.radiusSmall,
    color: colors.white,
    fontSize: 16,
    lineHeight: 22,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  counter: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
    alignSelf: 'flex-end',
    marginTop: 6,
  },
});
