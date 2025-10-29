export interface PurchaseRequestResponse {
  success: boolean;
  errorMessage: string | null;
  purchaseRequestId: string;
  amount: number;
  customerPhone: string;
}

export interface INewReceiptOtpProps {
  phoneNumber: string;
  amountNumber: number;
  purchaseRequestId: string;
  setShowModalResult: (value: boolean) => void;
  setErrorResult: (value: string) => void;
  setResultData: (value: null | PurchaseRequestResponse) => void;
}
