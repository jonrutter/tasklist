import React from 'react';

// components
import { Box, Drawer, Divider } from '@mui/material';
import { NavTagsList } from './NavTagsList';
import { Spacebar } from './Spacebar';
import { NavList } from './NavList';

// data
import { navItems, completed } from '@/data/nav';

type DrawerProps = React.PropsWithChildren<{
  navOpen: boolean;
  toggleNav: () => void;
}>;

const NavDrawer: React.FC<DrawerProps> = ({ navOpen, toggleNav, children }) => {
  const drawerWidth = 240;
  const container = window.document.body;
  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="navigation"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={navOpen}
        onClose={toggleNav}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {children}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {children}
      </Drawer>
    </Box>
  );
};

type Props = {
  navOpen: boolean;
  toggleNav: () => void;
};

/**
 * Renders the site navigation.
 */
export const Nav: React.FC<Props> = ({ navOpen, toggleNav }) => (
  <NavDrawer navOpen={navOpen} toggleNav={toggleNav}>
    <Box>
      <Spacebar />
      <NavList navList={navItems} />
      <Divider />
      <NavTagsList />
      <Divider />
      <NavList navList={completed} />
    </Box>
  </NavDrawer>
);
