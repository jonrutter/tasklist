import React from 'react';
import { Box, Drawer, Divider } from '@mui/material';

// data
import { navItems, completed } from '../../data/nav';

// components
import NavLabelsList from './NavLabelsList';
import Spacebar from '../Spacebar';
import NavList from './NavList';

// store
import { useStore } from '../../store/useStore';
import { TOGGLE_NAV } from '../../store/actions';

const NavDrawer = ({ children }) => {
  const { dispatch, navOpen } = useStore();
  const toggleNav = () => dispatch({ type: TOGGLE_NAV });

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

const Nav = () => {
  return (
    <NavDrawer>
      <Box>
        <Spacebar />
        <NavList navList={navItems} />
        <Divider />
        <NavLabelsList />
        <Divider />
        <NavList navList={completed} />
      </Box>
    </NavDrawer>
  );
};

export default Nav;
