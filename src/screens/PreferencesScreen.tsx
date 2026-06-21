import React from 'react';

import { DropdownField } from '../components/DropdownField';
import { FormScreen } from '../components/FormScreen';
import { PrimaryButton } from '../components/PrimaryButton';
import { playingStatuses, sports } from '../constants/options';
import type { Details } from '../types/app';

type PreferencesScreenProps = {
  details: Details;
  canContinue: boolean;
  onBack: () => void;
  onChange: (patch: Partial<Details>) => void;
  onNext: () => void;
};

export function PreferencesScreen({
  details,
  canContinue,
  onBack,
  onChange,
  onNext,
}: PreferencesScreenProps) {
  return (
    <FormScreen
      title="Enter your details"
      onBack={onBack}
      footer={
        <PrimaryButton label="Next" disabled={!canContinue} onPress={onNext} />
      }>
      <DropdownField
        label="Playing Status"
        placeholder="Looking for Playground"
        options={playingStatuses}
        value={details.playingStatus}
        onSelect={playingStatus => onChange({ playingStatus })}
      />
      <DropdownField
        label="Sport you like *"
        placeholder="Badminton"
        options={sports}
        value={details.sport}
        onSelect={sport => onChange({ sport })}
      />

    </FormScreen>
  );
}
