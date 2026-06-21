import React from 'react';
import { View } from 'react-native';

import { AuthPhoneForm } from '../components/AuthPhoneForm';
import { CountryCode } from '../components/CountryPicker';
import { commonStyles } from '../theme/commonStyles';

type RegisterScreenProps = {
  phone: string;
  selectedCountry: CountryCode;
  onCountrySelect: (country: CountryCode) => void;
  canCreateAccount: boolean;
  onGoToLogin: () => void;
  onPhoneChange: (phone: string) => void;
  onCreateAccount: () => void;
  loading?: boolean;
};

export function RegisterScreen({
  phone,
  selectedCountry,
  onCountrySelect,
  canCreateAccount,
  onGoToLogin,
  onPhoneChange,
  onCreateAccount,
  loading,
}: RegisterScreenProps) {
  return (
    <View style={commonStyles.screen}>
      <AuthPhoneForm
        title="Create Your Account"
        phone={phone}
        selectedCountry={selectedCountry}
        onCountrySelect={onCountrySelect}
        buttonLabel="Create Account"
        disabled={!canCreateAccount}
        loading={loading}
        footerLabel="Already have account?"
        footerLinkLabel="Login"
        onFooterPress={onGoToLogin}
        onPhoneChange={onPhoneChange}
        onSubmit={onCreateAccount}
      />
    </View>
  );
}
