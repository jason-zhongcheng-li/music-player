import React from 'react';

import styles from './header.module.scss';

const Header = () => {
  return (
    <header className={styles.header} role="banner">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <div className={styles.headerContent}>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </div>
    </header>
  );
};

export default Header;
