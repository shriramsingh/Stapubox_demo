export type Screen =
  | 'login'
  | 'register'
  | 'otp'
  | 'personal'
  | 'preferences'
  | 'feedback'
  | 'summary';

export type Details = {
  phone: string;
  name: string;
  address1: string;
  address2: string;
  pinCode: string;
  playingStatus: string;
  sport: string;
  feedback: string;
};
