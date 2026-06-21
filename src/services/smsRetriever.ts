import { Platform } from 'react-native';

let SmsRetriever: any;

const optionalRequire = typeof globalThis !== 'undefined' && typeof (globalThis as any).require === 'function'
  ? (globalThis as any).require
  : typeof require !== 'undefined'
  ? require
  : undefined;

if (Platform.OS === 'android' && optionalRequire) {
  try {
    const moduleImport = optionalRequire('@ebrimasamba/react-native-sms-retriever');
    SmsRetriever = moduleImport?.default ?? moduleImport;
  } catch {
    SmsRetriever = null;
  }
}

export type SmsListenerUnsubscribe = () => void;

export async function startSmsRetriever(): Promise<{ success: boolean; message: string }> {
  if (Platform.OS !== 'android') {
    return { success: false, message: `SMS Retriever only available on Android; current platform is ${Platform.OS}.` };
  }

  if (!SmsRetriever) {
    return {
      success: false,
      message: 'SMS Retriever module is not loaded. Please rebuild the Android app and verify native installation.',
    };
  }

  if (typeof SmsRetriever.startSmsRetriever !== 'function') {
    return {
      success: false,
      message: 'SMS Retriever startSmsRetriever method is missing. Check native module installation.',
    };
  }

  try {
    const started = await SmsRetriever.startSmsRetriever();
    if (!started) {
      return { success: false, message: 'SMS Retriever did not register broadcast receiver.' };
    }

    const appHash = await getAppHash();
    console.log('SMS Retriever started. App hash:', appHash ?? 'unknown');

    return { success: true, message: 'SMS Retriever started.' };
  } catch (error: any) {
    return { success: false, message: error?.message || 'SMS Retriever failed to start.' };
  }
}

export async function addSmsListener(onMessage: (message: string) => void): Promise<SmsListenerUnsubscribe> {
  if (Platform.OS !== 'android' || !SmsRetriever) {
    return () => {};
  }

  const listener = (event: { message?: string } | string) => {
    if (!event) {
      return;
    }

    const message = typeof event === 'string' ? event : event.message || '';
    onMessage(message);
  };

  try {
    await SmsRetriever.addSmsListener(listener);
  } catch {
    return () => {};
  }

  return () => {
    try {
      if (typeof SmsRetriever.removeSmsListener === 'function') {
        SmsRetriever.removeSmsListener();
      }
    } catch {
      // ignore cleanup issues
    }
  };
}

export async function getAppHash(): Promise<string | null> {
  if (Platform.OS !== 'android' || !SmsRetriever) {
    return null;
  }

  try {
    const hash = await SmsRetriever.getHash();
    console.log('SMS Retriever app hash:', hash);
    return hash;
  } catch (error) {
    console.warn('Unable to get SMS Retriever app hash:', error);
    return null;
  }
}
