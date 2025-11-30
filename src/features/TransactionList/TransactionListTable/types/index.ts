export interface ITransactionItem {
  id: string;
  amount: number;
  description: string;
  status: string;
  createdAt: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  merchantId: string;
  referenceNumber: number;
}

export interface ITransactionListTableProps {
  requests: ITransactionItem[];
  currentPage: number;
  pageSize: number;
}
