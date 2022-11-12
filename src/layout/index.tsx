import React, { ReactNode } from 'react';
import Header from '../components/Header';
import styles from './styles.module.scss';

type Props = {
  children?: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className={styles['container']}>{children}</div>
    </div>
  );
};

export default Layout;
