import React, { useEffect, useContext } from 'react';

import { SERVER } from '../constants';

import { navigate, RouteComponentProps } from '@reach/router';
import Loading from '../components/Loading';
import Context from '../Context';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Landing = (_props: RouteComponentProps) => {
  const ctx = useContext(Context);

  useEffect(() => {
    fetch(`${SERVER}/auth/login/success`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error('failed to authenticate user');
      })
      .then((responseJson) => {
        // Login
        ctx.dispatch({ type: 'login', payload: responseJson.user.id }); // TODO: check .id is the right key
        ctx.dispatch({ type: 'updateUser', payload: responseJson.user }); // TODO: check .id is the right key
        // TODO: also update to store ful user information

        navigate('/preDashboard');
      })
      .catch(() => {
        // Return to home page
        ctx.dispatch({ type: 'loginError', payload: 'Failed to login' });
        navigate('/login');
      });
  }, []);

  return <Loading />;
};

export default Landing;
