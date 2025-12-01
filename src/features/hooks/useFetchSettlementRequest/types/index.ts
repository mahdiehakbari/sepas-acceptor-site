export interface IFilterParams {
  pageNo: number;
  count: number;
  fromPaymentDate?: string;
  toPaymentDate?: string;
  customerIds?: string[];
  merchantIds?: string[];
}
