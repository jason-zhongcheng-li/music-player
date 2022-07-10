import { PropsWithChildren } from 'react';
import { createSafeContext } from '../../helper/context-helpers';

interface AppProviderState {}

interface AppProviderProps {
  logo?: any;
}

const AppProviderContext = createSafeContext<AppProviderState>();

export const AppProvider = (props: PropsWithChildren<AppProviderProps>) => {
  const { children } = props;
  return <AppProviderContext.Provider value={null}></AppProviderContext.Provider>;
};
