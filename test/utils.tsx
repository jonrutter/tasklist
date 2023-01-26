/**
 * This module provides a custom wrapper for react-testing-library's `render()` method, and re-exports everything else from RTL.
 *
 * All RTL methods (including render) should be imported from '@test/utils'
 */

import React from 'react';
import { render } from '@testing-library/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as StoreProvider } from 'react-redux';
import { store } from '@/app';
import type { RenderOptions } from '@testing-library/react';

/** Wraps all tested components with helmet, localization, and store context providers. */
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <HelmetProvider>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StoreProvider store={store}>{children}</StoreProvider>
    </LocalizationProvider>
  </HelmetProvider>
);

// overwrite react-testing-library's `render()` method with a custom method that wraps tested components with context providers
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Wrapper, ...options });

// eslint-disable-next-line
export * from '@testing-library/react';
// eslint-disable-next-line
export { customRender as render };
