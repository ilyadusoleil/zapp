import { createContext } from 'react';

type State = {
  currentProjectId: number;
};

const initialState: State = {
  currentProjectId: 0,
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

    default:
      // eslint-disable-next-line no-console
      console.log('Uncaught context state change');
      return state;
  }
};

export { reducer };

export default Context;
