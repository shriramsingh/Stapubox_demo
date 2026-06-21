import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { CountryPicker, type CountryCode } from './CountryPicker';
import { PrimaryButton } from './PrimaryButton';
import { colors } from '../theme/colors';
import { layout } from '../theme/layout';

type AuthPhoneFormProps = {
  buttonLabel: string;
  disabled: boolean;
  footerLabel: string;
  footerLinkLabel: string;
  phone: string;
  title: string;
  selectedCountry: CountryCode;
  onCountrySelect: (country: CountryCode) => void;
  onFooterPress: () => void;
  onPhoneChange: (phone: string) => void;
  onSubmit: () => void;
  loading?: boolean;
};

export function AuthPhoneForm({
  buttonLabel,
  disabled,
  footerLabel,
  footerLinkLabel,
  phone,
  title,
  selectedCountry,
  onCountrySelect,
  onFooterPress,
  onPhoneChange,
  onSubmit,
  loading,
}: AuthPhoneFormProps) {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.phoneRow}>
        <CountryPicker
          selectedCountry={selectedCountry}
          onCountrySelect={onCountrySelect}
        />
        <TextInput
          keyboardType="number-pad"
          maxLength={10}
          onChangeText={onPhoneChange}
          placeholder="9999999999"
          placeholderTextColor={colors.placeholder}
          style={styles.phoneInput}
          value={phone}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <PrimaryButton label={buttonLabel} disabled={disabled} loading={loading} onPress={onSubmit} />
      </View>
      <View style={styles.footerRow}>
        <Text style={styles.footerText}>{footerLabel}</Text>
        <Pressable onPress={onFooterPress}>
          <Text style={styles.linkText}>{footerLinkLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: layout.screenPadding,
    paddingVertical: 44,
  },
  title: {
    color: colors.white,
    fontSize: 21,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  phoneInput: {
    flex: 1,
    height: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: '#1f2022',
    color: colors.white,
    fontSize: 18,
    paddingHorizontal: 16,
  },
  buttonWrapper: {
    marginTop: 24,
  },
  footerRow: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
  linkText: {
    color: colors.blue,
    fontSize: 13,
    fontWeight: '600',
  },
});
