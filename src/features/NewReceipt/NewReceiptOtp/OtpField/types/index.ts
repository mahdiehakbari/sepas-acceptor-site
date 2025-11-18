export type TOtpFieldProps = {
  otp: string;
  setOtp: (v: string) => void;
  error: string;
  focusedIndex: number | null;
  setFocusedIndex: (i: number | null) => void;
};
