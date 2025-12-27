'use client';
import { API_AUTHENTICATE_ME } from '@/config/api_address.config';
import { ProfileForm } from '@/features/Form/ProfileForm';
import { ShowUserData } from '@/features/ShowUserData';
import { Button, SpinnerDiv } from '@/sharedComponent/ui';
import { IProfileFormValues } from '@/sharedComponent/ui/Input/types';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
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
    address: {
      id: '',
      cityId: '',
      cityName: '',
      provinceId: '',
      provinceName: '',
      postalCode: '',
      workPlacePhoneNumber: '',
      merchantAddress: '',
    },
    merchantAddress: '',
    medicalSystemNumber: '',
    educationLevel: '',
    contractType: '',
    certificateNumber: '',
    workPlacePhoneNumber: '',
    professionalTitle: '',
    bio: '',
    merchantBio: '',
    skills: [],
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
      {isEditing ? (
        <ProfileForm
          name='userAccount'
          handleBack={handleBack}
          setUser={setUser}
          setIsEditing={setIsEditing}
          userData={user}
        />
      ) : (
        <>
          <ShowUserData user={user} />
          <div className='flex justify-end my-2'>
            <Button onClick={() => setIsEditing(true)}>
              {t('dental-society:edit')}
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
