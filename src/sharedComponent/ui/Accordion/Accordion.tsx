'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';
import { accordionData } from './constants';
import ResponsiveModal from '../ResponsiveModal/Modal';

export const Accordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const { t } = useTranslation();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='space-y-2'>
      <h3 className='text-center text-[16px] text-black font-bold mb-6'>
        {t('faq:doctor_faq_title')}
      </h3>

      {accordionData.map((item, index: number) => (
        <div
          key={index}
          className='border border-border-color rounded-lg p-4 cursor-pointer bg-secondary'
        >
          {/* Header */}
          <div
            className='flex justify-between items-center'
            onClick={() => toggle(index)}
          >
            <h2 className='font-medium text-[13px]'>{t(item.title)}</h2>
            <ChevronDown
              className={`w-5 h-5 transform transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </div>

          {/* Content */}
          <div
            className={`mt-2 overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-40' : 'max-h-0'
            }`}
          >
            <div className='text-second-text-color text-[13px] font-medium'>
          {item.hasLink ? (
            <Trans
              ns="faq"
              i18nKey="support_answer"
              components={{
                1: (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('clicked');
                      setIsSupportModalOpen(true);
                    }}
                    className="text-primary underline font-medium cursor-pointer"
                  />
                ),
              }}
            />


          ) : (
            t(item.content)
          )}

              {item.list && (
                <ul className='mt-2 list-disc pr-5 text-[12px] space-y-1'>
                  {item.list.map((li, i) => (
                    <li key={i}>{t(li)}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ))}
       <ResponsiveModal
          title={t('panel:contact_support')}
          isOpen={isSupportModalOpen}
          onClose={() => setIsSupportModalOpen(false)}
        >
         <div className='md:w-[500px] py-8 px-6'>
            <div className='flex items-center gap-2'>
              <p>شماره تماس پشتیبانی:</p>
              <p>۰۲۱-۷۹۵۷۲۰۰۰</p>
            </div>
          </div>
        </ResponsiveModal>
    </div>
  );
};
