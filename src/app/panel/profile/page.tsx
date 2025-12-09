'use client';
import { API_AUTHENTICATE_ME } from '@/config/api_address.config';
import { ProfileForm } from '@/features/Form/ProfileForm';
import { SpinnerDiv } from '@/sharedComponent/ui';
import { IProfileFormValues } from '@/sharedComponent/ui/Input/types';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [user, setUser] = useState<IProfileFormValues>({
    fullName: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    mobile: '',
    nationalId: '',
    birthDate: '',
    gender: 0,
    email: undefined,
    iban: undefined,
    province: '',
    cityId: '',
    postalCode: '',
    addressDetails: '',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    address: {
      id: '',
      cityId: '',
      cityName: '',
      provinceId: '',
      provinceName: '',
      details: '',
      postalCode: '',
      certificateNumber: '',
      workPlacePhoneNumber: '',
    },
    medicalSystemNumber: '',
    educationLevel: '',
    contractType: '',
    certificateNumber: '',
    workPlacePhoneNumber: '',
  });

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPageLoading(false);
      return;
    }

    setPageLoading(true);
    axios
      .get(API_AUTHENTICATE_ME, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const userData =
          typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
        setUser(userData);
      })
      .catch(() => {})
      .finally(() => setPageLoading(false));
  }, []);

  const handleBack = () => {
    setIsEditing(false);
  };

  if (pageLoading) {
    return (
      <div className='flex justify-center items-center h-[60vh]'>
        <SpinnerDiv size='lg' />
        <p className='px-2'>در حال بارگذاری...</p>
      </div>
    );
  }

  return (
    <>
      {isEditing && (
        <ProfileForm
          name='userAccount'
          handleBack={handleBack}
          setUser={setUser}
          setIsEditing={setIsEditing}
          userData={user}
        />
      )}
    </>
  );
};

export default Profile;
