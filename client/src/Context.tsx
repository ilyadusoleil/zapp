import { createContext } from 'react';

type State = {
  currentProjectIdx: number;
};

const initialState: State = {
  currentProjectIdx: 0,
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
        currentProjectIdx: action.payload,
      });

    default:
      // eslint-disable-next-line no-console
      console.log('Uncaught context state change');
      return state;
  }
};

export { reducer };

export default Context;
