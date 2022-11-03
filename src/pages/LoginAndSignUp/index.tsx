import React from 'react';
import Input from '../../components/Input';
import styles from './styles.module.scss';

const LoginAndSignUp = () => {
  function handleSubmit(e: any) {
    console.log(e);
  }

  return (
    <div className={styles['login']}>
      <div className={styles['container']}>
        <div className={styles['kv']}>
          <div>雙11購物節</div>
          <div>全站1折起</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles['title']}>登入</div>
          <Input type="text" name="email" placeholder="請輸入E-mail" />
          <Input type="password" name="password" placeholder="請輸入密碼" />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="請輸入密碼"
          />

          <button type="submit">登入</button>
        </form>
      </div>
    </div>
  );
};

export default LoginAndSignUp;
