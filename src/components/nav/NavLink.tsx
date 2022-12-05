import React from 'react';

// routing
import { useLocation } from 'react-router-dom';

// mui
import { ListItemButton } from '@mui/material';

// hooks
import { useRenderLink } from '../../hooks/useRenderLink';

type Props = React.PropsWithChildren<{
  to: string;
}>;

/**
 * Renders a React Router link as a MUI ListItemButton, for use as a navigation link.
 */
export const NavLink: React.FC<Props> = ({ to, children }) => {
  const { pathname } = useLocation();
  const renderLink = useRenderLink(to);

  return (
    <ListItemButton component={renderLink} selected={pathname === to}>
      {children}
    </ListItemButton>
  );
};

export default NavLink;
