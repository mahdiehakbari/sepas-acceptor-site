import { PurchaseRequestResponse } from '../../NewReceiptOtp/types';

export interface IModalResultProps {
  errorResult: string;
  handleClose: () => void;
  resultData: null | PurchaseRequestResponse;
}
