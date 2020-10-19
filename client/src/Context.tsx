import { createContext } from 'react';
import { User } from './types/User';

type State = {
  currentProjectId: number;
  userId: number;
  user?: User;
  isAuthenticated: boolean;
  authError: string;
};

const initialState: State = {
  currentProjectId: 0,
  userId: 0,
  isAuthenticated: false,
  authError: '',
};

const Context = createContext<{
  state: State;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state: State, action: any) => {
  switch (action.type) {
    case 'setCurrentProjectId':
      return Object.assign({}, state, {
        currentProjectId: action.payload,
      });

    case 'updateUser':
      return Object.assign({}, state, {
        user: action.payload,
      });

    case 'login':
      return Object.assign({}, state, {
        isAuthenticated: true,
        authError: '',
        userId: action.payload,
      });

    case 'loginError':
      return Object.assign({}, state, {
        isAuthenticated: false,
        authError: action.payload,
        userId: 0,
      });

    case 'logout':
      return Object.assign({}, state, {
        isAuthenticated: false,
        authError: '',
        userId: 0,
      });

    default:
      // eslint-disable-next-line no-console
      console.log('Uncaught context state change');
      return state;
  }
};

export { reducer };

export default Context;
