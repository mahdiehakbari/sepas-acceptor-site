import { create } from 'zustand';
import { IProfile, IProfileStore } from './types';

export const useProfileStore = create<IProfileStore>((set) => ({
  profile: {
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
  setProfile: (data: IProfile | undefined) => set({ profile: data }),
}));
