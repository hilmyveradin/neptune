'use client';

import { useSelectedLayoutSegment } from 'next/navigation';

import AppContainer from '~/lib/layout/AppContainer';

import DashboardBookPage from './dashboard';
import DonateBookPage from './donasi-buku';
import ForumBookPage from './forum-buku';
import RequestBookPage from './permintaan-buku';

const AppLayout = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <AppContainer withoutNavbar={false} currentSegment={segment ?? ''}>
      {segment === 'dashboard' && <DashboardBookPage />}
      {segment === 'donasi-buku' && <DonateBookPage />}
      {segment === 'permintaan-buku' && <RequestBookPage />}
      {segment !== 'dashboard' &&
        segment !== 'donasi-buku' &&
        segment !== 'permintaan-buku' && <ForumBookPage />}
    </AppContainer>
  );
};

export default AppLayout;
