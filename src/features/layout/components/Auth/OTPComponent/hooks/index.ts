'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { API_AUTHENTICATE } from '@/config/api_address.config';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/Auth/authStore';
import { getProfileImage } from '@/features/layout/components/SideMenu/api/profileImage.api';

export const useOtp = (onClose: () => void) => {
  const [phone] = useState(() => Cookies.get('phoneNumber') || '');
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { user, setAuth } = useAuthStore();

  useEffect(() => {
    const token = Cookies.get('token');
    const userData = localStorage.getItem('user');
    const expiresAt = Cookies.get('expiresAt');

    if (token && userData && expiresAt) {
      try {
        const parsedUser = JSON.parse(userData);
        setAuth(token, parsedUser, expiresAt);
      } catch (err) {
        console.error('Failed to parse user from localStorage', err);
      }
    }
  }, [setAuth]);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError('');

      const response = await axios.post(API_AUTHENTICATE, {
        phoneNumber: phone,
        otp,
      });

      const { token, user, expiresAt } = response.data;

      setAuth(token, user, expiresAt);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Fetch profile image after successful login
      try {
        const profileImageData = await getProfileImage(token);
        if (profileImageData && profileImageData.base64Image) {
          // Store the base64 image in localStorage
          localStorage.setItem(
            'profileImage',
            `data:image/jpeg;base64,${profileImageData.base64Image}`,
          );
        } else {
          // Remove any existing profile image if none exists
          localStorage.removeItem('profileImage');
        }
      } catch (error) {
        console.error('Failed to fetch profile image:', error);
        // Continue with login even if image fetch fails
      }

      if (!user.isVerified) {
        // router.push('/profile');
        Cookies.set('isLoggedIn', 'false');
      } else {
        Cookies.set('isLoggedIn', 'true');
        // router.push('/');
      }

      onClose();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'خطایی رخ داده است.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('خطای ناشناخته رخ داده است.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    phone,
    otp,
    setOtp,
    isSubmitting,
    error,
    handleSubmit,
    user,
  };
};
