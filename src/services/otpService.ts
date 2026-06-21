import { apiRequest } from './api';

export type OtpResponse = {
  success: boolean;
  message?: string;
};

function isFalseValue(value: any) {
  return (
    value === false ||
    value === 'false' ||
    value === 0 ||
    value === '0' ||
    value === 'no' ||
    value === 'failed' ||
    value === 'failure'
  );
}

function isTruthyValue(value: any) {
  return (
    value === true ||
    value === 'true' ||
    value === 1 ||
    value === '1' ||
    value === 'yes' ||
    value === 'success'
  );
}

function getResponseMessage(response: any): string | undefined {
  if (!response || typeof response !== 'object') {
    return undefined;
  }

  if (typeof response.message === 'string') {
    return response.message;
  }
  if (typeof response.error === 'string') {
    return response.error;
  }
  if (typeof response.error_description === 'string') {
    return response.error_description;
  }
  if (typeof response.detail === 'string') {
    return response.detail;
  }
  if (Array.isArray(response.errors) && response.errors.length > 0) {
    const firstError = response.errors[0];
    if (typeof firstError === 'string') {
      return firstError;
    }
    if (firstError && typeof firstError.message === 'string') {
      return firstError.message;
    }
  }

  return undefined;
}

function ensureSuccess(response: any, fallbackMessage: string): any {
  if (response && typeof response === 'object') {
    const responseMessage = getResponseMessage(response);

    if ('success' in response) {
      if (isFalseValue(response.success)) {
        throw new Error(responseMessage || fallbackMessage);
      }
      if (!isTruthyValue(response.success)) {
        throw new Error(responseMessage || fallbackMessage);
      }
    }

    if ('status' in response) {
      if (isFalseValue(response.status)) {
        throw new Error(responseMessage || fallbackMessage);
      }
      if (!isTruthyValue(response.status)) {
        throw new Error(responseMessage || fallbackMessage);
      }
    }

    if (typeof responseMessage === 'string') {
      const normalized = responseMessage.toLowerCase();
      if (normalized.includes('error') || normalized.includes('failed') || normalized.includes('invalid')) {
        throw new Error(responseMessage || fallbackMessage);
      }
    }
  }

  return response;
}

export async function sendOtp(mobile: string): Promise<OtpResponse> {
  const response = await apiRequest('/sendOtp', {
    method: 'POST',
    body: JSON.stringify({ mobile }),
  });

  return ensureSuccess(response, 'Failed to send OTP');
}

export async function resendOtp(mobile: string): Promise<OtpResponse> {
  const response = await apiRequest(`/resendOtp?mobile=${encodeURIComponent(mobile)}`, {
    method: 'POST',
  });

  return ensureSuccess(response, 'Failed to resend OTP');
}

export async function verifyOtp(mobile: string, otp: string): Promise<OtpResponse> {
  const response = await apiRequest(`/verifyOtp?mobile=${encodeURIComponent(mobile)}&otp=${encodeURIComponent(otp)}`, {
    method: 'POST',
  });

  return ensureSuccess(response, 'Invalid OTP');
}
