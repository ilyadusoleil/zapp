import React from 'react';

import { RouteComponentProps } from '@reach/router';

import { SERVER } from '../constants';

import GoogleButton from 'react-google-button';
import Zapp from '../assets/zappcopy.png'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

const Login = (_props: RouteComponentProps) => { // eslint-disable-line @typescript-eslint/no-unused-vars
  const handleLogin = () => {
    window.open(`${SERVER}/auth/google`, '_self'); // TODO: change this when oauth implementation
  };

  return (
   
<div>
    <div className='rounded-none bg-gradient-to-r from-indigo-800 to-purple-500 h-screen flex justify-center xl:rounded-tl-full xl:rounded-br-full'>
        <div className='mt-32'>
                <img className='h-24 m-auto animate-pulse xl:mt-16 ' src={Zapp}></img>
                <h1 className='font-display text-6xl font-bold text-white  text-center mt-4'>Zapp</h1>
                <h3 className='text-2xl text-gray-300 text-center p-4 font-body'>Lorem ipsum dolor sit amet, adhuc singulis sadipscing eu mei,</h3>
            <div className='mt-12'>
                <GoogleButton type='light' className='m-auto bg-red-400' onClick={handleLogin} />
            </div>
        </div>
    </div>    
</div>
);
};

export default Login;
