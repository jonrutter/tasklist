import React from 'react';
import { Toolbar } from '@mui/material';

/** Creates spacing under the main site header. */
export const Spacebar: React.FC = () => (
  <>
    <Toolbar />
    <div style={{ marginTop: '1rem', minHeight: '1rem' }}></div>
  </>
);
