import React from 'react';
import styles from './styles.module.scss';

type Props = {};

const Input = ({ ...props }) => {
  return (
    <div className={styles['container']}>
      <input {...props} className={styles['input']} />
    </div>
  );
};

export default Input;
