import { create } from 'zustand';
import { IProfileStore } from './types';

export const useProfileStore = create<IProfileStore>((set) => ({
  dental-society: {
    firstName: '',
    lastName: '',
    mobile: '',
    nationalId: '',
    gender: 0,
    birthDate: '',
    email: '',
    iban: '',
    province: '',
    cityId: '',
    postalCode: '',
    addressDetails: '',
  },
  setdental-society: (data) => set({ dental-society: data }),
}));
