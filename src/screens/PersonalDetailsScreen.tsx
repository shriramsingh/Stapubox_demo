import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { FormScreen } from '../components/FormScreen';
import { inputStyles, LabeledInput } from '../components/LabeledInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import type { Details } from '../types/app';

type PersonalDetailsScreenProps = {
  details: Details;
  canContinue: boolean;
  onBack: () => void;
  onChange: (patch: Partial<Details>) => void;
  onNext: () => void;
};

export function PersonalDetailsScreen({
  details,
  canContinue,
  onBack,
  onChange,
  onNext,
}: PersonalDetailsScreenProps) {
  return (
    <FormScreen
      title="Enter your details"
      onBack={onBack}
      footer={
        <PrimaryButton label="Next" disabled={!canContinue} onPress={onNext} />
      }>
      <LabeledInput
        label="Name*"
        value={details.name}
        placeholder="antoine@soch.at"
        onChangeText={name => onChange({ name })}
      />
      <LabeledInput
        label="Address*"
        value={details.address1}
        placeholder="Address Line 1"
        onChangeText={address1 => onChange({ address1 })}
      />
      <TextInput
        placeholder="Address Line 2 (Optional)"
        placeholderTextColor={colors.placeholder}
        style={[inputStyles.input, styles.stackedInput]}
        value={details.address2}
        onChangeText={address2 => onChange({ address2 })}
      />
      <LabeledInput
        label="Pin Code*"
        value={details.pinCode}
        placeholder="110224"
        keyboardType="number-pad"
        maxLength={6}
        onChangeText={pinCode =>
          onChange({ pinCode: pinCode.replace(/\D/g, '').slice(0, 6) })
        }
      />

    </FormScreen>
  );
}

const styles = StyleSheet.create({
  stackedInput: {
    marginTop: -26,
    marginBottom: 31,
  },
});
