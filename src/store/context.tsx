import React, { useReducer } from 'react';
import { LabelType, TaskType } from '../types';

import { StateType, ActionType, defaultState, reducer } from './reducer';

type ContextType = {
  dispatch: React.Dispatch<ActionType>;
} & StateType;

export const StoreContext = React.createContext<ContextType>({
  ...defaultState,
  dispatch: () => null,
});

type Props = React.PropsWithChildren<{
  testDefaultState?: {
    list?: TaskType[];
    labels?: LabelType[];
    deleted?: TaskType[];
    navOpen?: false;
    sortBy?: string;
  };
}>;

export const StoreProvider: React.FC<Props> = ({
  testDefaultState,
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const defaults = { ...state, ...testDefaultState };
  return (
    <StoreContext.Provider value={{ dispatch, ...defaults }}>
      {children}
    </StoreContext.Provider>
  );
};
