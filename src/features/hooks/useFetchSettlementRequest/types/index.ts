export interface IFilterParams {
  pageNumber: number;
  pageSize: number;
  fromPaymentDate?: string;
  toPaymentDate?: string;
  customerIds?: string[];
  merchantIds?: string[];
}
