import React from 'react';
import { render } from '@testing-library/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as StoreProvider } from 'react-redux';
import type { RootState, AppStore } from '@/app';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { reducer as tasksReducer } from '@/features/tasks';
import { reducer as tagsReducer } from '@/features/tags';
import { reducer as settingsReducer } from '@/features/settings';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

const basePreloadedState: PreloadedState<RootState> = {
  tasks: {
    entities: {},
    ids: [],
  },
  tags: {
    entities: {},
    ids: [],
  },
  settings: {
    sortBy: 'defaultSorting',
  },
};

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = basePreloadedState,
    store = configureStore({
      reducer: {
        tasks: tasksReducer,
        tags: tagsReducer,
        settings: settingsReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <HelmetProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StoreProvider store={store}>{children}</StoreProvider>
      </LocalizationProvider>
    </HelmetProvider>
  );
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export * from '@testing-library/react';
