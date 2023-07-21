'use client';

import { useSelectedLayoutSegment } from 'next/navigation';

import AppContainer from '~/lib/layout/AppContainer';

import RequestBookPage from './ajukan-buku';
import DashboardBookPage from './dashboard';
import DonateBookPage from './donasi-buku';

const AppLayout = () => {
  const segment = useSelectedLayoutSegment();

  return (
    <AppContainer withoutNavbar={false} currentSegment={segment ?? ''}>
      {segment === 'dashboard' && <DashboardBookPage />}
      {segment === 'donasi-buku' && <DonateBookPage />}
      {segment !== 'dashboard' && segment !== 'donasi-buku' && (
        <RequestBookPage />
      )}
    </AppContainer>
  );
};

export default AppLayout;
