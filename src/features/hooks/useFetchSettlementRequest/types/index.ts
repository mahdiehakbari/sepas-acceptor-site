export interface IFilterParams {
  pageNo: number;
  pageSize: number;
  count: number;
  fromPaymentDate?: string;
  toPaymentDate?: string;
  customerIds?: string[];
  merchantIds?: string[];
}
