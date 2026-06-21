import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { BackHeader } from '../components/BackHeader';
import { ScrollScreen } from '../components/ScrollScreen';
import { colors } from '../theme/colors';
import { addSmsListener, getAppHash, startSmsRetriever } from '../services/smsRetriever';

type OtpScreenProps = {
  otp: string[];
  onBack: () => void;
  onOtpChange: (otp: string[]) => void;
  onResend: () => void;
  onChangeNumber: () => void;
  errorMessage?: string;
  resendDisabled: boolean;
  resendTimer: number;
  loading?: boolean;
};

export function OtpScreen({
  otp,
  onBack,
  onOtpChange,
  onResend,
  onChangeNumber,
  errorMessage,
  resendDisabled,
  resendTimer,
  loading,
}: OtpScreenProps) {
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [smsAutoRead, setSmsAutoRead] = useState(false);

  useEffect(() => {
    let unsubscribe = () => {};
    let isMounted = true;

    async function initSmsRetriever() {
      if (Platform.OS !== 'android') {
        return;
      }

      const result = await startSmsRetriever();
      if (!result.success) {
        return;
      }

      unsubscribe = await addSmsListener(message => {
        const codeMatch = message.match(/\b(\d{4})\b/);
        if (codeMatch && isMounted) {
          const code = codeMatch[1];
          onOtpChange(code.split(''));
          setSmsAutoRead(true);
        }
      });
    }

    initSmsRetriever().catch(() => {
      // Ignore SMS retriever errors for a cleaner UI.
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [onOtpChange]);

  const setOtpDigit = (value: string, index: number) => {
    const nextOtp = [...otp];
    const digit = value.replace(/\D/g, '').slice(-1);

    nextOtp[index] = digit;
    onOtpChange(nextOtp);

    if (digit && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (!otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <ScrollScreen>
      <BackHeader title="Phone Verification" onBack={onBack} />
      <Text style={styles.pageLead}>
        Enter 4 digit OTP sent to your phone number
      </Text>
      <View style={styles.otpRow}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={value => setOtpDigit(value, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                handleBackspace(index);
              }
            }}
            ref={ref => {
              inputRefs.current[index] = ref;
            }}
            style={[
              styles.otpInput,
              index !== otp.length - 1 && styles.otpInputSpacing,
              digit && styles.otpInputFilled,
              errorMessage && styles.otpInputError,
            ]}
            editable={!loading}
            textAlign="center"
            value={digit}
          />
        ))}
      </View>
      {loading ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator size="small" color={colors.white} />
          <Text style={styles.loadingText}>Verifying code…</Text>
        </View>
      ) : null}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <Pressable onPress={onResend} disabled={resendDisabled || loading} style={styles.resendRow}>
        <Text style={[styles.secondaryButtonText, (resendDisabled || loading) && styles.resendTextDisabled]}>
          {resendDisabled ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
        </Text>
      </Pressable>
    </ScrollScreen>
  );
}

const styles = StyleSheet.create({
  pageLead: {
    marginTop: 24,
    color: colors.white,
    fontSize: 22,
    lineHeight: 30,
    fontWeight: '700',
    letterSpacing: 0.2,
    maxWidth: '90%',
  },
  pageHint: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    maxWidth: '86%',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 16,
  },
  otpInput: {
    width: 56,
    height: 56,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    color: colors.white,
    fontSize: 22,
    fontWeight: '700',
    backgroundColor: '#1f2022',
    textAlign: 'center',
  },
  otpInputFilled: {
    borderColor: colors.white,
    backgroundColor: '#2f3134',
  },
  otpInputSpacing: {
    marginRight: 14,
  },
  resendRow: {
    alignSelf: 'flex-start',
    marginTop: 12,
    paddingVertical: 8,
  },
  secondaryButtonText: {
    color: colors.blue,
    fontSize: 15,
    fontWeight: '600',
  },
  resendTextDisabled: {
    color: colors.placeholder,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  loadingText: {
    marginLeft: 10,
    color: colors.white,
    fontSize: 14,
  },
  errorText: {
    color: colors.error,
    marginBottom: 12,
    fontSize: 14,
  },
  otpInputError: {
    borderColor: colors.error,
  },
  autoReadText: {
    color: colors.muted,
    fontSize: 14,
    marginBottom: 12,
  },
});

