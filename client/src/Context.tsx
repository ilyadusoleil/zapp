import { createContext } from 'react';

type State = {
  currentProjectId: number;
  userId: string;
  isBugModalOpen: boolean;
  isProjectOpen: boolean;
  bugModalId: number;
  isAuthenticated: boolean;
  authError: string;
};

const initialState: State = {
  currentProjectId: 0,
  userId: '1',
  isBugModalOpen: false,
  isProjectOpen: false,
  bugModalId: 0,

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
    case 'updateCurrentProject':
      return Object.assign({}, state, {
        currentProjectId: action.payload,
      });

    case 'openBugModal':
      return Object.assign({}, state, {
        isBugModalOpen: true,
        bugModalId: action.payload,
      });

    case 'closeBugModal':
      return Object.assign({}, state, {
        isBugModalOpen: false,
        bugModalId: 0,
      });

    case 'openProjectModal':
      return Object.assign({}, state, {
        isProjectOpen: true,
      });

    case 'closeProjectModal':
      return Object.assign({}, state, {
        isProjectOpen: false,
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
