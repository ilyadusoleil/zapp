import React from 'react';

import { navigate, RouteComponentProps } from '@reach/router';

const Login = (_props: RouteComponentProps) => {
  const handleLogin = () => {
    navigate('dashboard');
  };

  return (
    <>
      <h1>Login</h1>
      <button onClick={handleLogin}>Press me to login</button>
    </>
  );
};

export default Login;
