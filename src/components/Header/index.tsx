import React, { useContext, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { AiOutlineShopping } from 'react-icons/ai';
import { CgShoppingCart } from 'react-icons/cg';
import { FaRegUserCircle } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { authContext } from '../../context/authContext';
import { auth } from '../../firebase';
import { productContext } from '../../context/productContext';
import CartPopup from '../CartPopup';
import LogoutPopup from '../LogoutPopup';

const Header = () => {
  const { isAuth } = useContext(authContext);
  const { cart } = useContext(productContext);
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
                <div className={styles['cart__amount']}>{cart.length}</div>
                <div className={styles['popup']}>
                  <CartPopup />
                </div>
              </li>
              {!isAuth ? (
                <>
                  <li>
                    <Link to="/signUp">註冊</Link>
                  </li>
                  <li>
                    <Link to="/login">登入</Link>
                  </li>
                </>
              ) : (
                <li className={styles['user']}>
                  <Link to="/orders">
                    <FaRegUserCircle />
                    {auth.currentUser?.displayName}
                  </Link>
                  <div className={styles['popup']}>
                    <LogoutPopup />
                  </div>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
