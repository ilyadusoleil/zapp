import React from 'react';

import { RouteComponentProps } from '@reach/router';

import { SERVER } from '../constants';

import GoogleButton from 'react-google-button';
import Zapp from '../assets/zappcopy.png';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Login = (_props: RouteComponentProps) => {
  const handleLogin = () => {
    if (SERVER) {
      window.open(`${SERVER}/auth/google`, '_self');
    } else {
      window.open(`/auth/google`, '_self');
    }
  };

  return (
    <div>
      <div className="rounded-none bg-gradient-to-r from-teal-700 to-teal-400 h-screen flex justify-center xl:rounded-tl-full xl:rounded-br-full">
        <div className="self-center">
          <img
            className="h-24 m-auto animate-pulse"
            alt="logo"
            src={Zapp}
          ></img>
          <h1 className="font-display text-6xl font-bold text-white  text-center mt-4">
            Zapp
          </h1>
          <h3 className="text-2xl text-gray-300 text-center p-4 font-body">
            Streamlined and simple issue tracking for small teams
          </h3>
          <div className="mt-12">
            <GoogleButton
              type="light"
              className="m-auto bg-red-400"
              onClick={handleLogin}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
