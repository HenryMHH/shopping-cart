import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { AiOutlineShopping } from 'react-icons/ai';
import { CgShoppingCart } from 'react-icons/cg';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [isShowLoginAndSignUp, setIsShowLoginAndSignUp] = useState(true);

  const isLoginOrSignUp =
    location.pathname === '/login' || location.pathname === '/signUp';

  useEffect(() => {
    switch (location.pathname) {
      case '/login':
      case '/signUp':
        setIsShowLoginAndSignUp(false);
        return;
      default:
        setIsShowLoginAndSignUp(true);
    }
  }, [location]);

  return (
    <div
      className={`${styles['header']} ${isLoginOrSignUp && styles['login']}`}
    >
      <div className={styles['container']}>
        <div className={styles['logo']}>
          <Link to="/">
            <AiOutlineShopping />
            亨利購物
          </Link>
        </div>
        <div className={styles['functionality']}>
          {isShowLoginAndSignUp && (
            <ul>
              <li className={styles['cart']}>
                <Link to="/cart">
                  <CgShoppingCart />
                </Link>
              </li>
              <li>
                <Link to="/signUp">註冊</Link>
              </li>
              <li>
                <Link to="/login">登入</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
