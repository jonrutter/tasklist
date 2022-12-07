import React from 'react';

// routing
import { Link, useLocation } from 'react-router-dom';

// components
import { ListItemButton } from '@mui/material';

// types
type Props = React.PropsWithChildren<{
  to: string;
}>;

/**
 * Renders a React Router link as a MUI ListItemButton, for use as a navigation link.
 */
export const NavLink: React.FC<Props> = ({ to, children }) => {
  const { pathname } = useLocation();

  return (
    <ListItemButton component={Link} to={to} selected={pathname === to}>
      {children}
    </ListItemButton>
  );
};
