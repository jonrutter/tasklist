import React, { useState } from 'react';

// components
import { Box } from '@mui/material';
import { Spacebar } from './Spacebar';
import { Header } from './Header';
import { Nav } from './Nav';

// types
type Props = React.PropsWithChildren;

/**
 * The app's main content layout component.
 */
export const Layout: React.FC<Props> = ({ children }) => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const toggleNav = () => setNavOpen((prev) => !prev);
  return (
    <Box sx={{ display: 'flex' }}>
      <Header navOpen={navOpen} toggleNav={toggleNav} />
      <Nav navOpen={navOpen} toggleNav={toggleNav} />
      <Box component="main" sx={{ width: '100%' }}>
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
      </Box>
    </Box>
  );
};
