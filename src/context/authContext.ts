import { createContext } from 'react';

type Context = {
  isAuth: boolean;
  handleLogin: (account: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleSignUp: (
    account: string,
    password: string,
    userName: string,
  ) => Promise<void>;
};

export const authContext = createContext<Context>({} as Context);
export const { Provider } = authContext;
