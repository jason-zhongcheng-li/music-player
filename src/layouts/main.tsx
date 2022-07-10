import React, { PropsWithChildren } from 'react';
import Header from '../components/header/header';
import useViewportSizes from 'use-viewport-sizes';
import { Breakpoint } from '../helper/string-helper';

import styles from './main.module.scss';

interface MainLayoutProps {
  headerProps?: any;
  footerProps?: any;
}

export const MainLayout = (props: PropsWithChildren<MainLayoutProps>) => {
  const { children } = props;
  const [vpWith] = useViewportSizes({ dimension: 'w' });

  return (
    <div className={styles.appContainer}>
      {vpWith >= Breakpoint.tablet && <Header />}
      <main className={styles.appContent}>{children}</main>
    </div>
  );
};
