import React, { PropsWithChildren } from 'react';
import Header from '../components/header/header';

import styles from './main.module.scss';

interface MainLayoutProps {
  headerProps?: any;
  footerProps?: any;
}

export const MainLayout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <div className={styles.appContainer}>
      <Header />
      <main className={styles.appContent}>{children}</main>
    </div>
  );
};
