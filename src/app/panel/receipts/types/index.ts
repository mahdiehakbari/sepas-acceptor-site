export interface IPurchaseRequest {
  id: string;
  amount: number;
  description: string;
  status: string;
  createdAt: string;
  customerPhone: string;
  customerName: string;
}

export interface IUserData {
  id: string;
  phoneNumber: string;
  nationalId: string;
  address: string;
  businessName: string;
  fullName: string;
  isVerified: boolean;
  email: string | null;
  iban: string | null;
  createdAt: string;
  purchaseRequests: IPurchaseRequest[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}
