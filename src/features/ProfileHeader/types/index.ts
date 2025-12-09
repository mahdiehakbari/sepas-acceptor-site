import { IProfileFormValues } from '@/features/Form/types';
import { RefObject } from 'react';

export interface IProfileHeaderProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  profileImage: string;
  userProfile?: IProfileFormValues | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
