import { createContext } from 'react';

type State = {
  currentProjectId: number;
  userId: string;
  isModalOpen: boolean;
  bugModalId: number;
};

const initialState: State = {
  currentProjectId: 0,
  userId: '1',
  isModalOpen: false,
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

    case 'openModal':
      return Object.assign({}, state, {
        isModalOpen: true,
        bugModalId: action.payload,
      });

    case 'closeModal':
      return Object.assign({}, state, {
        isModalOpen: false,
        bugModalId: 0,
      });

    default:
      // eslint-disable-next-line no-console
      console.log('Uncaught context state change');
      return state;
  }
};

export { reducer };

export default Context;
