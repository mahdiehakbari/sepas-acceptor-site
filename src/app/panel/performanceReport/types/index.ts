export interface IChartItem {
  day: number;
  value: number;
}

export interface ILastContractType {
  id: string;
  payoutType: string;
  walletType: string;
  walletAccountType: string;
  createdAt: string;
}

export interface IMerchantOverallData {
  numberOfUniqueCustomers: number;
  totalNumberOfCompletedPurchaseRequests: number;
  totalAmountOfCompletedPurchaseRequests: number;
  totalAmountOfPaidOutPurchaseRequests: number;
  totalAmountOfUnpaidPurchaseRequests: number;
  lastContractType: ILastContractType;
  sumOfMerchantCredit: number;
  sumOfFee: number;
}
