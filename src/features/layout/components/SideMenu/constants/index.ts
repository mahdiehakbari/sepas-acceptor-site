import i18n from '@/i18n';

export const getSideBarItems = () => [
  {
    label: i18n.t('panel:new-receipt'),
    path: '/panel/newReceipt',
    icon: '/assets/icons/receipt-add.svg',
  },
  {
    label: i18n.t('panel:receipts'),
    path: '/panel/receipts',
    icon: '/assets/icons/receipt.svg',
  },
  {
    label: i18n.t('panel:settlement_status'),
    path: '/panel/settlementStatus',
    icon: '/assets/icons/card-tick.svg',
  },
];
