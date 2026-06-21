# SMS Retriever Setup

This project uses `react-native-sms-retriever` for Android auto-read OTP.

## Install
Run in the project root:

```bash
npm install react-native-sms-retriever
# or
# yarn add react-native-sms-retriever
```

Then rebuild the Android app:

```bash
npx react-native run-android
```

## Android manifest
No additional permissions are required for SMS Retriever because the library uses the SMS Retriever API.

## Usage in this app
The OTP screen now attempts to auto-read a 4-digit code on Android. If SMS auto-read fails, the user can still input OTP manually.

## Notes
- SMS Retriever works only on Android.
- The SMS message should contain the 4-digit OTP in plain text.
- The app uses a fallback path when the retriever flow does not start or when the message cannot be parsed.
