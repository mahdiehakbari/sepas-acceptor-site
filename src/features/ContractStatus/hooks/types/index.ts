export interface IMerchantContract {
  id: string;
  merchantId: string;
  merchantBusinessName: string;
  merchantPhoneNumber: string;
  payoutType: number;
  walletType: number;
  walletAccountType: number;
  payoutTypeDesc: string;
  walletTypeDesc: string;
  walletAccountTypeDesc: string;
  createdAt: string;
}

export interface IMerchantContractsData {
  items: IMerchantContract[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IUseMerchantContractsProps {
  pageSize?: number;
}
