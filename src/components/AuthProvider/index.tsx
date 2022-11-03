import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default AuthProvider;
