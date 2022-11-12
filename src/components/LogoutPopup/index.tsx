import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { authContext } from '../../context/authContext';

import styles from './styles.module.scss';

const LogoutPopup = () => {
  const { handleLogout } = useContext(authContext);
  const navigate = useNavigate();

  function handleNavigation() {
    navigate('/orders');
  }

  return (
    <div className={styles['popup']}>
      <ul>
        <li onClick={handleNavigation}>查看訂單</li>
        <li onClick={handleLogout}>登出</li>
      </ul>
    </div>
  );
};

export default LogoutPopup;
