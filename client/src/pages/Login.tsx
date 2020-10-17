import React from 'react';

import { RouteComponentProps } from '@reach/router';

import { SERVER } from '../constants';

import GoogleButton from 'react-google-button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

const Login = (_props: RouteComponentProps) => { // eslint-disable-line @typescript-eslint/no-unused-vars
  const handleLogin = () => {
    window.open(`${SERVER}/auth/google`, '_self'); // TODO: change this when oauth implementation
  };

  return (
    <div className='flex justify-center items-center h-screen ml-2 relative rounded-lg'>
            <div className=' mr-40 w-3/5'>
                <div className='bg-gradient-to-r from-pink-600 to-pink-500 mt-1 rounded'>
                <FontAwesomeIcon
            icon={faBug}
            size={'2x'}
            className="ml-2 mt-1 mb-1 text-gray-100"
          />
                </div>
                <div className='h-40 bg-gradient-to-r from-indigo-600 to-indigo-200 mt-1 rounded'></div>
                <div className='h-40 bg-gradient-to-r from-indigo-200 to-indigo-600 mt-1 rounded'></div>
                <div className='h-40 bg-gradient-to-r from-indigo-600 to-indigo-200 mt-1 rounded'></div>
            </div>
            <div className="flex absolute right-0 w-3/6 mr-64 rounded bg-white shadow-2xl border-pink-500 border-4 animate-wiggle opacity-75">
                <div className='p-8'>
                <h1 className="mb-3 font-display text-6xl font-extrabold text-black">Welcome to Zapp.</h1>
                <h3 className='font-body text-2xl'>Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</h3>
                <GoogleButton className='mt-8' onClick={handleLogin} />
                </div>
                <div>
                    <div className='bg-pink-500 h-full w-6 '><FontAwesomeIcon
            icon={faCheckSquare}
            size={'2x'}
            className="mb-0 p-1 text-gray-100 items-end"
          /></div>
                </div>
            </div>
    </div>
  );
};

export default Login;
