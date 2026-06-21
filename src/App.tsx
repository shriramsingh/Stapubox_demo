import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ToastMessage } from './components/ToastMessage';

import { initialDetails } from './constants/initialValues';
import { colors } from './theme/colors';
import type { Details, Screen } from './types/app';
import { FeedbackScreen } from './screens/FeedbackScreen';
import { LoginScreen } from './screens/LoginScreen';
import { OtpScreen } from './screens/OtpScreen';
import { PersonalDetailsScreen } from './screens/PersonalDetailsScreen';
import { PreferencesScreen } from './screens/PreferencesScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { SummaryScreen } from './screens/SummaryScreen';
import { CountryCode } from './components/CountryPicker';
import { resendOtp, sendOtp, verifyOtp } from './services/otpService';

function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [otpReturnScreen, setOtpReturnScreen] = useState<Screen>('login');
  const [details, setDetails] = useState<Details>(initialDetails);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'success' as 'success' | 'error',
  });
  const resendTimerId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const backHandlerRef = useRef<any>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(
    { label: 'India', dialCode: '+91' },
  );

  const canSendOtp = details.phone.length === 10;
  const canContinuePersonal =
    details.name.trim().length > 0 &&
    details.address1.trim().length > 0 &&
    details.pinCode.trim().length >= 6;
  const canContinuePreferences =
    details.playingStatus.length > 0 && details.sport.length > 0;
  const canSubmitFeedback = details.feedback.trim().length > 0;

  const updateDetails = useCallback((patch: Partial<Details>) => {
    setDetails(current => ({ ...current, ...patch }));
  }, []);

  const confirmExit = useCallback(() => {
    Alert.alert(
      'Exit App',
      'Are you sure you want to exit?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Exit', style: 'destructive', onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: true },
    );
  }, []);

  const goBack = useCallback(() => {
    if (screen === 'otp') {
      setScreen(otpReturnScreen);
      return;
    }
    if (screen === 'register') {
      setScreen('login');
      return;
    }
    if (screen === 'personal') {
      setScreen('otp');
      return;
    }
    if (screen === 'preferences') {
      setScreen('personal');
      return;
    }
    if (screen === 'feedback') {
      setScreen('preferences');
      return;
    }
    if (screen === 'summary') {
      setScreen('feedback');
      return;
    }

    confirmExit();
  }, [confirmExit, otpReturnScreen, screen]);

  const getApiMobile = () => details.phone;

  const getFullMobile = () =>
    `${selectedCountry.dialCode.replace('+', '')}${details.phone}`;

  const cleanupResendTimer = () => {
    if (resendTimerId.current !== null) {
      clearTimeout(resendTimerId.current);
      resendTimerId.current = null;
    }
  };

  const resetOtpState = () => {
    setOtp(['', '', '', '']);
    setOtpError('');
    setResendDisabled(false);
    setResendTimer(60);
    cleanupResendTimer();
  };

  useEffect(() => {
    if (!resendDisabled) {
      cleanupResendTimer();
      return;
    }

    if (resendTimer <= 0) {
      setResendDisabled(false);
      cleanupResendTimer();
      return;
    }

    resendTimerId.current = setTimeout(() => {
      setResendTimer(previous => previous - 1);
    }, 1000);

    return () => {
      cleanupResendTimer();
    };
  }, [resendDisabled, resendTimer]);

  const resetPhoneInput = () => {
    updateDetails({ phone: '' });
    resetOtpState();
  };

  const clearToastTimeout = () => {
    if (toastTimeoutId.current !== null) {
      clearTimeout(toastTimeoutId.current);
      toastTimeoutId.current = null;
    }
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    clearToastTimeout();
    setToast({ visible: true, message, type });
  };

  useEffect(() => {
    if (!toast.visible) {
      return;
    }

    toastTimeoutId.current = setTimeout(() => {
      setToast({ visible: false, message: '', type: toast.type });
      toastTimeoutId.current = null;
    }, 3200);

    return () => {
      clearToastTimeout();
    };
  }, [toast.visible, toast.type]);

  const startResendCooldown = () => {
    cleanupResendTimer();
    setResendDisabled(true);
    setResendTimer(60);
  };

  useEffect(() => {
    const handleBackPress = () => {
      goBack();
      return true;
    };

    if (Platform.OS === 'android') {
      backHandlerRef.current = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    }

    return () => {
      if (Platform.OS === 'android') {
        backHandlerRef.current?.remove();
      }
      cleanupResendTimer();
      clearToastTimeout();
    };
  }, [goBack]);

  const handleSendOtp = async (returnScreen: Screen) => {
    setLoading(true);
    try {
      await sendOtp(getApiMobile());
      startResendCooldown();
      setOtpError('');
      showToast('OTP sent. Check your phone for the verification code.');
      setOtpReturnScreen(returnScreen);
      setScreen('otp');
    } catch (error) {
      showToast(`Send OTP failed. ${String(error)}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const sendOtpFromLogin = () => handleSendOtp('login');
  const sendOtpFromRegister = () => handleSendOtp('register');

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      await resendOtp(getApiMobile());
      startResendCooldown();
      setOtpError('');
      showToast('OTP resent. Please check your phone again.');
    } catch (error) {
      showToast(`Resend OTP failed. ${String(error)}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePersonalNext = useCallback(() => {
    setScreen('preferences');
  }, []);

  const handlePreferencesNext = useCallback(() => {
    setScreen('feedback');
  }, []);

  const handleFeedbackSubmit = useCallback(() => {
    setScreen('summary');
  }, []);

  const handleVerifyOtp = async (enteredOtp: string) => {
    setLoading(true);
    try {
      // await verifyOtp(getApiMobile(), enteredOtp);
      // resetOtpState();
      // setOtpError('');
      // showToast('OTP verified successfully.');
      setScreen('personal');
    } catch (error) {
      const message = String(error) || 'Invalid OTP';
      setOtpError(message);
      showToast(message, 'error');
      setOtp(['', '', '', '']);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeNumber = () => {
    resetOtpState();
    setScreen(otpReturnScreen);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.app}>
        <StatusBar barStyle="light-content" backgroundColor={colors.background} />
        <ToastMessage visible={toast.visible} message={toast.message} type={toast.type} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}>
          {screen === 'login' && (
            <LoginScreen
              phone={details.phone}
              selectedCountry={selectedCountry}
              onCountrySelect={setSelectedCountry}
              canSendOtp={canSendOtp}
              onPhoneChange={phone =>
                updateDetails({ phone: phone.replace(/\D/g, '').slice(0, 10) })
              }
              onCreateAccount={() => {
                resetPhoneInput();
                setScreen('register');
              }}
              onSendOtp={sendOtpFromLogin}
              loading={loading}
            />
          )}

          {screen === 'register' && (
            <RegisterScreen
              phone={details.phone}
              selectedCountry={selectedCountry}
              onCountrySelect={setSelectedCountry}
              canCreateAccount={canSendOtp}
              onPhoneChange={phone =>
                updateDetails({ phone: phone.replace(/\D/g, '').slice(0, 10) })
              }
              onGoToLogin={() => {
                resetPhoneInput();
                setScreen('login');
              }}
              onCreateAccount={sendOtpFromRegister}
              loading={loading}
            />
          )}

          {screen === 'otp' && (
            <OtpScreen
              otp={otp}
              onBack={goBack}
              onOtpChange={nextOtp => {
                setOtp(nextOtp);
                if (nextOtp.every(Boolean)) {
                  handleVerifyOtp(nextOtp.join(''));
                }
              }}
              onResend={handleResendOtp}
              onChangeNumber={handleChangeNumber}
              errorMessage={otpError}
              resendDisabled={resendDisabled}
              resendTimer={resendTimer}
              loading={loading}
            />
          )}

          {screen === 'personal' && (
            <PersonalDetailsScreen
              details={details}
              canContinue={canContinuePersonal}
              onBack={goBack}
              onChange={updateDetails}
              onNext={handlePersonalNext}
            />
          )}

          {screen === 'preferences' && (
            <PreferencesScreen
              details={details}
              canContinue={canContinuePreferences}
              onBack={goBack}
              onChange={updateDetails}
              onNext={handlePreferencesNext}
            />
          )}

          {screen === 'feedback' && (
            <FeedbackScreen
              feedback={details.feedback}
              canSubmit={canSubmitFeedback}
              onBack={goBack}
              onChange={feedback => updateDetails({ feedback })}
              onSubmit={handleFeedbackSubmit}
            />
          )}

          {screen === 'summary' && <SummaryScreen details={details} />}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
});

export default App;
