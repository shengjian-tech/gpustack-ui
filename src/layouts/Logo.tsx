// @ts-nocheck
import GpustackLogo from '@/assets/images/ai-computing power-cloud-logo.svg';
import SmallLogo from '@/assets/images/small-logo-200x200.png';
import React from 'react';

const LogoIcon: React.FC = () => {
  return <img src={GpustackLogo} alt="logo" style={{ height: 24,cursor:'pointer' }} />;
};
const SLogoIcon: React.FC = () => {
  return <img src={SmallLogo} alt="logo" style={{ height: 24,cursor:'pointer' }} />;
};

export { LogoIcon, SLogoIcon };
