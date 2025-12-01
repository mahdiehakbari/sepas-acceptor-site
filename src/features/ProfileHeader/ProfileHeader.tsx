'use client';
import Image from 'next/image';
import { IProfileHeaderProps } from './types';
import { useEffect, useState } from 'react';
import { IUser } from '../layout/components/Header/types';

export const ProfileHeader = ({
  fileInputRef,
  profileImage,
  userProfile,
  handleFileChange,
}: IProfileHeaderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Invalid user JSON:', e);
      }
    }
  }, []);
  return (
    <div
      className='flex items-center space-x-3 mb-8 cursor-pointer'
      onClick={() => fileInputRef.current?.click()}
    >
      <div className='relative'>
        <div className='w-14 h-14 rounded-full overflow-hidden relative'>
          {user?.gender == 'Female' ? (
            <Image
              src={profileImage || '/assets/icons/avatar-f.jpg'}
              alt='user-profile-icon'
              width={56}
              height={56}
              className='rounded-full'
            />
          ) : user?.gender == 'Male' ? (
            <Image
              src={profileImage || '/assets/icons/avatar-m.jpg'}
              alt='user-profile-icon'
              width={56}
              height={56}
              className='rounded-full'
            />
          ) : (
            <Image
              src={profileImage || '/assets/icons/guest.jpg'}
              alt='user-profile-icon'
              width={56}
              height={56}
              className='rounded-full'
            />
          )}
        </div>
        <Image
          src='/assets/icons/profile-edit-button.svg'
          alt='edit'
          width={28}
          height={28}
          className='cursor-pointer absolute top-8 left-8'
        />
      </div>

      <h2 className='font-medium text-[#515151] text-[12px] font[700]'>
        {userProfile?.firstName} {userProfile?.lastName}
      </h2>

      <input
        type='file'
        accept='image/*'
        ref={fileInputRef}
        className='hidden'
        onChange={handleFileChange}
      />
    </div>
  );
};
