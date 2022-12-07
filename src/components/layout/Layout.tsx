import React from 'react';

// components
import { Box } from '@mui/material';
import { Spacebar } from './Spacebar';

// types
type Props = React.PropsWithChildren;

/**
 * The app's main content layout component.
 */
export const Layout: React.FC<Props> = ({ children }) => (
  <Box
    sx={{
      pl: { xs: 2, sm: 4, lg: 8 },
      pr: { xs: 2, sm: 4 },
      pb: 4,
      maxWidth: '600px',
    }}
  >
    <Spacebar />

    {children}
  </Box>
);
