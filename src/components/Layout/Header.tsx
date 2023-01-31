import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { TaskCreateDialog } from '@/features/tasks';
import Logo from '@/images/logo.svg';

type Props = {
  navOpen: boolean;
  toggleNav: () => void;
};

/**
 * Renders the site header.
 */
export const Header: React.FC<Props> = ({ navOpen, toggleNav }) => (
  <>
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={Logo}
            alt="TaskList Logo"
            sx={{
              mr: 2,
              width: { xs: 24, sm: 36 },
              height: { xs: 24, sm: 36 },
            }}
          />
          <Typography
            component="span"
            noWrap
            sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              TaskList
            </Link>
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TaskCreateDialog />
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="Toggle menu"
            sx={{ display: { md: 'none' }, ml: 2 }}
            focusRipple
            onClick={toggleNav}
          >
            {navOpen ? (
              <CloseIcon sx={{ display: { xs: 'block', md: 'none' } }} />
            ) : (
              <MenuIcon sx={{ display: { xs: 'block', md: 'none' } }} />
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
    <div style={{ marginTop: '5rem' }} />
  </>
);
