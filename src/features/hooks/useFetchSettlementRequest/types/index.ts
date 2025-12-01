export interface IFilterParams {
  pageNo: number;
  count: number;
  fromPaymentDate?: string;
  fromDate?: string;
  toDate?: string;
  toPaymentDate?: string;
  customerIds?: string[];
  merchantIds?: string[];
}
