import React from 'react';

import { navigate, RouteComponentProps } from '@reach/router';

import { SERVER } from '../constants';

import GoogleButton from 'react-google-button';

const Login = (_props: RouteComponentProps) => {
  const handleLogin = () => {
    window.open(`${SERVER}/auth/google`, '_self'); // TODO: change this when oauth implementation
  };

  return (
    <div className="flex flex-col items-center justify-items-center">
      <h1 className="text-xl mb-3">Welcome to Zapp</h1>
      <GoogleButton onClick={handleLogin} />
    </div>
  );
};

export default Login;
