import { useLogo } from '@/hooks/use-logo';
import React from 'react';

// Inline sizing: the two brand <img>s render inside the top header
// (``layout="top"``), which has no 100vh height chain, so they cannot rely on
// the sider's ``--sider-logo-size`` variables.
const logoStyle = {
  height: 24,
  width: 'auto',
  objectFit: 'contain' as const,
  cursor: 'pointer'
};

const LogoIcon: React.FC = () => {
  const { sidebarLogo } = useLogo();

  return <img src={sidebarLogo} alt="logo" style={logoStyle} />;
};

const SLogoIcon: React.FC = () => {
  const { miniLogo } = useLogo();

  return <img src={miniLogo} alt="logo" style={logoStyle} />;
};

export { LogoIcon, SLogoIcon };
