export type TFormValues = {
  customerPhoneNumber: string;
  amount: number;
};

export interface INewReceiptProps {
  setShowOtpModal: (value: boolean) => void;
  setPurchaseRequestId: (value: string) => void;
  setPhoneNumber: (value: string) => void;
  setAmountNumber: (value: number) => void;
}
