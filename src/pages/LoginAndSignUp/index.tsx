import React, {
  FormEvent,
  FormEventHandler,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { authContext } from '../../context/authContext';
import styles from './styles.module.scss';

const LoginAndSignUp = () => {
  const { handleLogin, handleSignUp, isAuth } = useContext(authContext);
  const { pathname } = useLocation();
  const formRef = useRef<HTMLFormElement>(null);
  const isLoginPage = pathname === '/login';
  const isSignUpPage = pathname === '/signUp';

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const name = data.get('name') as string;
    const confirmPassword = data.get('confirmPassword');

    switch (pathname) {
      case '/login':
        handleLogin(email, password);
        return;
      case '/signUp':
        if (password !== confirmPassword) {
          return alert('密碼與確認密碼不相符，請再次確認！');
        }
        handleSignUp(email, password, name);
        return;
      default:
        return;
    }
  }

  useEffect(() => {
    formRef.current?.reset();
  }, [pathname]);

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles['login']}>
      <div className={styles['container']}>
        <div className={styles['kv']}>
          <div>雙11購物節</div>
          <div>全站1折起</div>
        </div>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className={styles['title']}>{isLoginPage ? '登入' : '註冊'}</div>
          {isSignUpPage && (
            <div className={styles['form-control']}>
              <Input
                type="text"
                name="name"
                placeholder="請輸入用戶名稱"
                required
              />
            </div>
          )}
          <div className={styles['form-control']}>
            <Input
              type="text"
              name="email"
              placeholder="請輸入E-mail"
              required
            />
          </div>
          <div className={styles['form-control']}>
            <Input
              type="password"
              name="password"
              placeholder="請輸入密碼"
              minLength="6"
              required
            />
          </div>
          {isSignUpPage && (
            <div className={styles['form-control']}>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="請再次確認密碼"
                minLength="6"
                required
              />
            </div>
          )}
          <Button type="submit">{isLoginPage ? '登入' : '註冊'}</Button>
          <div className={styles['note']}>
            {isLoginPage && (
              <>
                還沒有帳號嗎？<Link to="/signUp">註冊</Link>
              </>
            )}
            {isSignUpPage && (
              <>
                已經有帳號了？<Link to="/login">登入</Link>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginAndSignUp;
