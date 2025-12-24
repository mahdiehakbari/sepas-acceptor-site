import { TAccordionItemType } from '../types';

export const accordionData: TAccordionItemType[] = [
  {
    title: 'faq:doctor_register_question',
    content: 'faq:doctor_register_answer',
  },
  {
    title: 'faq:required_info_question',
    content: '',
       list: [
      'faq:required_info_identity',
      'faq:required_info_medical_system',
      'faq:required_info_practice_license',
      'faq:required_info_bank_account',
      'faq:required_info_contact',
    ],
  
  },
  {
    title: 'faq:patient_referral_question',
    content: 'faq:patient_referral_answer',
  },
  {
    title: 'faq:treatment_cost_register_question',
    content: 'faq:treatment_cost_register_answer',
 
  },
  {
    title: 'faq:treatment_cost_edit_question',
    content: 'faq:treatment_cost_edit_answer',
  },
  {
    title: 'faq:receive_payment_question',
    content: 'faq:receive_payment_answer',
  },
  {
    title: 'faq:payment_time_question',
    content: 'faq:payment_time_answer',
  },
  {
    title: 'faq:change_settlement_question',
    content: 'faq:change_settlement_answer',
  },
  {
    title: 'faq:platform_fee_question',
    content: 'faq:platform_fee_answer',
  },
  {
    title: 'faq:installment_responsibility_question',
    content: 'faq:installment_responsibility_answer',
  },
  {
    title: 'faq:installment_default_question',
    content: 'faq:installment_default_answer',
  },
  {
    title: 'faq:support_question',
    content: 'faq:support_answer',
    hasLink: true,
  },
  
];
