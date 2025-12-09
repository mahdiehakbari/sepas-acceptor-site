import i18n from '@/i18n';

export const getSideBarItems = () => [
  {
    label: i18n.t('login:user_account'),
    path: '/panel/profile',
    icon: '/assets/icons/user-account.svg',
  },
  {
    label: i18n.t('panel:performance_report'),
    path: '/panel/performanceReport',
    icon: '/assets/icons/receipt.svg',
  },
  {
    label: i18n.t('panel:new-receipt'),
    path: '/panel/newReceipt',
    icon: '/assets/icons/receipt.svg',
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
  {
    label: i18n.t('panel:contract_status'),
    path: '/panel/contractStatus',
    icon: '/assets/icons/receipt.svg',
  },
];
