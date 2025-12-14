export interface ISettlementItem {
  uuid: string;
  amount: number;
  cash_out_method: number;
  account_no: number;
  status: string | number;
  acceptor?: string;
  acceptor_tag?: number;
  city?: string;
  province?: string;
  create_date?: string;
  payment_date?: string;
  iban?: string;
  person_address?: number;
  purchaseRequest: {
    referenceNumber: number;
    customer: {
      fullName: string;
    };
  };
}

export interface ISettlementListTableProps {
  requests: ISettlementItem[];
  currentPage: number;
  pageSize: number;
}
