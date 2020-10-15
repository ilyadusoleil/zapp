import React, { useEffect, useContext } from 'react';

import { SERVER } from '../constants';

import { navigate, RouteComponentProps } from '@reach/router';

import Context from '../Context';

const Landing = (_props: RouteComponentProps) => {
  const ctx = useContext(Context);

  useEffect(() => {
    fetch(`${SERVER}/auth/login/success`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error('failed to authenticate user');
      })
      .then((responseJson) => {
        // Login
        ctx.dispatch({type: 'login', payload: responseJson.id}) // TODO: check .id is the right key
        // TODO: also update to store ful user information
        navigate('/dashboard');
      })
      .catch((error) => {
        // Return to home page
        ctx.dispatch({type: 'loginError', payload: "Failed to login"})
        navigate('/');
      });
  }, []);

  return <div>Please Wait...</div>;
};

export default Landing;
