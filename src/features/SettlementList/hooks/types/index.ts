export interface IFilterParams {
  pageNumber: number;
  pageSize: number;
  createdFrom?: string;
  createdTo?: string;
  customerIds?: string[];
  merchantIds?: string[];
}

export interface IQueryParams {
  pageNo: number;
  count: number;
  fromDate?: string;
  toDate?: string;
  fromPaymentDate?: string;
  toPaymentDate?: string;
}
