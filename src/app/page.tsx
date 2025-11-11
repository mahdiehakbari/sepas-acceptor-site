import { BannerSection, ContentComponent } from '@/features/mainPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'پنل پزشکان دنتالیت',
  description: 'loan site',
};

export default function Home() {
  return (
    <>
      <BannerSection />
      <ContentComponent />
    </>
  );
}
