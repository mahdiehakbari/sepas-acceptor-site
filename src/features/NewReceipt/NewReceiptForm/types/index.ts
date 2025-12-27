export type TFormValues = {
  customerPhoneNumber: string;
  amount: number;
};

export interface INewReceiptProps {
  setShowOtpModal: (value: boolean) => void;
  setPhoneNumber: (value: string) => void;
  setAmountNumber: (value: number) => void;
  registerReset?: (resetFn: () => void) => void;
  setShowModalResult: (value: boolean) => void;
  setErrorResult: (value: string) => void;
}
