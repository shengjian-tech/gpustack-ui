import { createContext } from 'react';
import { DashboardProps } from './types';

export const DashboardContext = createContext<
  DashboardProps & { fetchData: (params?: Record<string, any>) => Promise<any> }
>(
  {} as DashboardProps & {
    fetchData: (params?: Record<string, any>) => Promise<any>;
  }
);

export default DashboardContext;
