'use client';
import { ContentStateWrapper } from '@/features/layout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import axios from 'axios';
import {
  API_MERCHANT_CONTRACTS_ME,
  API_MERCHANT_CONTRACTS_ME_POST,
} from '@/config/api_address.config';
import Image from 'next/image';
import { Button } from '@/sharedComponent/ui/Button/Button';
import { toast } from 'react-toastify';
import { SpinnerDiv } from '@/sharedComponent/ui/SpinnerDiv/SpinnerDiv';

const ContractStatus = () => {
  const { t } = useTranslation();
  const [pageLoading, setPageLoading] = useState(true);

  const [selectedContract, setSelectedContract] = useState<number | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const token = Cookies.get('token');

  const contractOptions = [
    { label: t('contract:cash_settlement'), value: 0 },
    { label: t('contract:bi_monthly'), value: 1 },
    { label: t('contract:four_monthly'), value: 2 },
    { label: t('contract:six_monthly'), value: 3 },
  ];

  useEffect(() => {
    axios
      .get(API_MERCHANT_CONTRACTS_ME, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => {
        setIsEmpty(false);
        const payoutTypeFromApi = resp.data.payoutType;
        setSelectedContract(payoutTypeFromApi);
        setPageLoading(false);
      })
      .catch(() => {
        setIsEmpty(true);
        setPageLoading(false);
      });
  }, []);

  const handleRegister = () => {
    setButtonLoading(true);
    axios
      .post(
        API_MERCHANT_CONTRACTS_ME_POST,
        {
          payoutType: selectedContract,
          walletType: 0,
          walletAccountType: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then((resp) => {
        toast.success('قرار داد شما با موفقیت ثبت شد.');
        setButtonLoading(false);
      })
      .catch();
  };

  console.log(selectedContract, contractOptions);

  return (
    <ContentStateWrapper
      loading={pageLoading}
      loadingText={t('panel:page_loading')}
    >
      <div className='flex flex-col items-center justify-center mt-6'>
        <h1 className='text-black font-normal text-[14px] mb-4 text-right md:w-[400px] w-[300px]'>
          {t('contract:settlement_status')}
        </h1>

        {pageLoading && isEmpty == true ? (
          <div className='text-center mt-10 text-gray-500'>
            {t('panel:empty')}
          </div>
        ) : (
          <div className='md:w-[400px] w-[300px] mb-6  relative'>
            <button
              type='button'
              onClick={() => setDropdownOpen((prev) => !prev)}
              className='cursor-pointer w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-right flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <span>
                {selectedContract !== null && selectedContract !== undefined
                  ? contractOptions.find(
                      (opt) => opt.value === selectedContract,
                    )?.label
                  : t('contract:settlement_type')}
              </span>

              <Image
                src='/assets/icons/arrow-down.svg'
                alt='close-button'
                width={18}
                height={18}
                className={`transition-transform duration-300 ${
                  dropdownOpen ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className='absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10'>
                {contractOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className='flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100'
                  >
                    <input
                      type='radio'
                      name='contract-type'
                      value={opt.value}
                      checked={selectedContract === opt.value}
                      onChange={() => {
                        setSelectedContract(opt.value);
                        setDropdownOpen(false);
                      }}
                      className='mr-2 accent-blue-500'
                    />
                    <span className='pr-2'>{opt.label}</span>
                  </label>
                ))}
              </div>
            )}
            <div className='flex justify-end mt-14'>
              <Button disabled={buttonLoading} onClick={handleRegister}>
                {buttonLoading == true ? (
                  <SpinnerDiv />
                ) : (
                  t('contract:register')
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </ContentStateWrapper>
  );
};

export default ContractStatus;
