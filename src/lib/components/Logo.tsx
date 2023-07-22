import Image from 'next/image';
import type React from 'react';

export const Logo: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Image src="/Logo_GarudaHacks.png" alt="Logo" width={100} height={50} />
    </div>
  );
};
