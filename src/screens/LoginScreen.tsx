import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AuthPhoneForm } from '../components/AuthPhoneForm';
import { CountryCode } from '../components/CountryPicker';
import { commonStyles } from '../theme/commonStyles';
import { layout } from '../theme/layout';
import { PrimaryButton } from '../components/PrimaryButton';

type LoginScreenProps = {
  phone: string;
  selectedCountry: CountryCode;
  onCountrySelect: (country: CountryCode) => void;
  canSendOtp: boolean;
  onCreateAccount: () => void;
  onPhoneChange: (phone: string) => void;
  onSendOtp: () => void;
  loading?: boolean;
};

export function LoginScreen({
  phone,
  selectedCountry,
  onCountrySelect,
  canSendOtp,
  onCreateAccount,
  onPhoneChange,
  onSendOtp,
  loading,
}: LoginScreenProps) {
  return (
    <View style={commonStyles.screen}>
      <AuthPhoneForm
        title="Login to Your Account"
        phone={phone}
        selectedCountry={selectedCountry}
        onCountrySelect={onCountrySelect}
        buttonLabel="Send OTP"
        disabled={!canSendOtp}
        loading={loading}
        footerLabel="Don't have account?"
        footerLinkLabel="Create Account"
        onFooterPress={onCreateAccount}
        onPhoneChange={onPhoneChange}
        onSubmit={onSendOtp}
      />

    
    </View>
  );
}


const styles = StyleSheet.create({
  
  footer: {
    paddingHorizontal: layout.screenPadding,
    paddingBottom: 34,
  },
});