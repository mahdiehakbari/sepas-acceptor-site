// import { useState } from 'react';
// import { toast } from 'react-toastify';
// import Cookies from 'js-cookie';
// import { AxiosError } from 'axios';
// import { useTranslation } from 'react-i18next';
// import { uploadProfileImage } from '../api/profileImage.api';

// export const useUploadProfileImage = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const { t } = useTranslation();

//   const uploadImage = async (base64Image: string, description?: string) => {
//     const token = Cookies.get('token');
//     if (!token) {
//       toast.error(t('dental-society:token_missing'));
//       return false;
//     }

//     setIsLoading(true);

//     try {
//       await uploadProfileImage(token, {
//         base64Image,
//         description: description || 'User profile picture',
//       });
//       toast.success('عکس پروفایل شما با موفقیت ثبت شد.');
//       return true;
//     } catch (error) {
//       const axiosError = error as AxiosError<{ message?: string }>;
//       toast.error(
//         axiosError.response?.data?.message || t('dental-society:update_error'),
//       );
//       return false;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { uploadImage, isLoading };
// };

import { useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { AxiosError, AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';
import { uploadProfileImage } from '../api/profileImage.api';

interface UploadProfileImageResponse {
  message?: string;
  success?: boolean;
  imageFilePath?: string | null;
  assetId?: string | null;
}

export const useUploadProfileImage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  const uploadImage = async (
    base64Image: string,
    description?: string,
  ): Promise<string | null> => {
    const token = Cookies.get('token');

    if (!token) {
      toast.error(t('dental-society:token_missing'));
      return null;
    }

    setIsLoading(true);

    try {
      const response: AxiosResponse<UploadProfileImageResponse> =
        await uploadProfileImage(token, {
          base64Image,
          description: description || 'User profile picture',
        });

      console.log('Upload profile image response:', response);

      if (response.data?.success && response.data.imageFilePath) {
        toast.success('عکس پروفایل با موفقیت بروزرسانی شد.');
        return response.data.imageFilePath;
      } else {
        toast.error(response.data?.message || 'dental-society:update_error');
        return null;
      }
    } catch (error) {
      const axiosError = error as AxiosError<UploadProfileImageResponse>;

      toast.error(
        axiosError.response?.data?.message || 'dental-society:update_error',
      );

      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    uploadImage,
    isLoading,
  };
};
