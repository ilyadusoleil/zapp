import { createContext } from 'react';

type State = {
  currentProjectId: number;
  userId: string;
  isBugOpen: boolean;
  isProjectOpen: boolean;
  bugModalId: number;
};

const initialState: State = {
  currentProjectId: 0,
  userId: '1',
  isBugOpen: false,
  isProjectOpen: false,
  bugModalId: 0,
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
        isBugOpen: true,
        bugModalId: action.payload,
      });

      case 'closeBugModal':
        return Object.assign({}, state, {
          isBugOpen: false,
          bugModalId: 0,
        });

      case 'openProjectModal':
      return Object.assign({}, state, {
        isProjectOpen: true,
      });

    default:
      // eslint-disable-next-line no-console
      console.log('Uncaught context state change');
      return state;
  }
};

export { reducer };

export default Context;
