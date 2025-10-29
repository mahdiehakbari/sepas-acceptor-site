import i18n from '@/i18n';

export const getSideBarItems = () => [
  {
    label: i18n.t('profile:user_account'),
    path: '/panel/userAccount',
    icon: '/assets/icons/receipt-add.svg',
  },
  {
    label: i18n.t('profile:requests_list'),
    path: '/panel/requestList',
    icon: '/assets/icons/receipt.svg',
  },
  {
    label: i18n.t('profile:transactions_list'),
    path: '/panel/transactions',
    icon: '/assets/icons/card-tick.svg',
    disabled: true,
  },
];
