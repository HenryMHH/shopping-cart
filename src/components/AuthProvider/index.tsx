import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Provider } from '../../context/authContext';
import { auth } from '../../firebase';

interface Props {
  children?: ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const removeListener = onAuthStateChanged(auth, (user) => {
      user ? setIsAuth(true) : setIsAuth(false);
    });

    return removeListener;
  }, []);

  async function handleSignUp(
    account: string,
    password: string,
    userName: string,
  ) {
    try {
      await createUserWithEmailAndPassword(auth, account, password);
      if (auth.currentUser) {
        updateProfile(auth.currentUser, { displayName: userName });
      }
    } catch (error) {
      alert((error as Error).message);
    }
  }

  async function handleLogin(account: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, account, password);
    } catch (error) {
      alert((error as Error).message);
    }
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      alert('登出成功！');
      navigate('/');
    } catch (error) {
      alert((error as Error).message);
    }
  }

  const value = { isAuth, handleSignUp, handleLogin, handleLogout };

  return <Provider value={value}>{children}</Provider>;
};

export default AuthProvider;
