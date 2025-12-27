import { IProfileFormValues } from '../../types';
import { Dispatch, SetStateAction } from 'react';

export interface ProfileSubmitProps {
  name: string;
  setIsEditing?: (v: boolean) => void;
  setShowProfileModal?: ((v: boolean) => void) | null;
  setShowCreditNoteModal?: (v: boolean) => void;
  setUser?: Dispatch<SetStateAction<IProfileFormValues>>;
}
