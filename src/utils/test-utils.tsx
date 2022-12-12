import React from 'react';

import { render } from '@testing-library/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { HelmetProvider } from 'react-helmet-async';

// store
import { Provider as StoreProvider } from 'react-redux';
import { store } from '@/app';

// types
import type { RenderOptions } from '@testing-library/react';
type Props = React.PropsWithChildren;

const Wrapper: React.FC<Props> = ({ children }) => (
  <HelmetProvider>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StoreProvider store={store}>{children}</StoreProvider>
    </LocalizationProvider>
  </HelmetProvider>
);

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Wrapper, ...options });

// eslint-disable-next-line
export * from '@testing-library/react';

// eslint-disable-next-line
export { customRender as render };
