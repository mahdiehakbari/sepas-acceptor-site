export interface IPurchaseRequest {
  id: string;
  amount: number;
  description: string;
  status: string;
  createdAt: string;
  customerPhone: string;
  customerName: string;
}
export interface ITransactionListTableProps {
  requests: IPurchaseRequest[];
  currentPage: number;
  pageSize: number;
}
