import React from 'react';
import ReactDOM from 'react-dom/client';
import { App, store, persistState } from '@/app';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider as StoreProvider } from 'react-redux';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { HelmetProvider } from 'react-helmet-async';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// subscribe to state changes, to persist state to localStorage
store.subscribe(() => {
  persistState({
    tasks: store.getState().tasks,
    tags: store.getState().tags,
  });
});

// render app
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StoreProvider store={store}>
          <CssBaseline />
          <App />
        </StoreProvider>
      </LocalizationProvider>
    </HelmetProvider>
  </React.StrictMode>
);
