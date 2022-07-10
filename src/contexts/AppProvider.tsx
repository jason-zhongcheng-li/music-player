import { PropsWithChildren } from 'react';
import { createSafeContext } from '../helper/context-helpers';
import { MusicProvider } from './MusicProvider';
import { SVGT } from '../components/svg/svg';

interface AppProviderState {}

interface AppProviderProps {
  logo?: SVGT;
}

const AppProviderContext = createSafeContext<AppProviderState>();

export const AppProvider = (props: PropsWithChildren<AppProviderProps>) => {
  const { children } = props;
  return (
    <AppProviderContext.Provider value={null}>
      <MusicProvider>{children}</MusicProvider>
    </AppProviderContext.Provider>
  );
};
