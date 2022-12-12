import React from 'react';

// components
import { ListItem, ListItemIcon, Badge, ListItemText } from '@mui/material';
import { NavLink } from './NavLink';

// types
import type { TaskType } from '@/features/tasks';

export type NavLinkType = {
  title: string;
  list: TaskType[];
  icon: JSX.Element;
  to: string;
};

/**
 * Renders a nav list item. The NavItem component handles appearance and UI of the list item, and renders a NavLink to handle the routing logic.
 */
export const NavItem: React.FC<NavLinkType> = ({
  title,
  list = [],
  icon,
  to,
}) => (
  <ListItem sx={{ p: 0 }}>
    <NavLink to={to}>
      <ListItemIcon>
        <Badge
          badgeContent={list.length}
          color={title === 'Past Due' ? 'error' : 'primary'}
        >
          {icon}
        </Badge>
      </ListItemIcon>
      <ListItemText primary={title} />
    </NavLink>
  </ListItem>
);
