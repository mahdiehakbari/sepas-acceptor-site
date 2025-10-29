import { BannerSection, ContentComponent } from '@/features/mainPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'main page',
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
