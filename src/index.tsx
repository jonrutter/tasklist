import React from 'react';
import ReactDOM from 'react-dom/client';
import { App, store, persistState } from '@/app';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider as StoreProvider } from 'react-redux';

// mui/date
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// react helmet
import { HelmetProvider } from 'react-helmet-async';

// fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

store.subscribe(() => {
  persistState({
    tasks: store.getState().tasks,
    tags: store.getState().tags,
  });
});

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
