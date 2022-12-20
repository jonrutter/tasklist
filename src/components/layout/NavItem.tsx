import React from 'react';

// components
import { ListItem, ListItemIcon, Badge, ListItemText } from '@mui/material';
import { NavLink } from './NavLink';

// types
import { selectNumberOfTasks, TaskType } from '@/features/tasks';
import { useSelector } from '@/app';

export type NavLinkType = {
  title: string;
  icon: JSX.Element;
  to: string;
  filter: (_?: TaskType) => boolean;
};

/**
 * Renders a nav list item. The NavItem component handles appearance and UI of the list item, and renders a NavLink to handle the routing logic.
 */
export const NavItem: React.FC<NavLinkType> = ({ title, icon, to, filter }) => {
  const number = useSelector(selectNumberOfTasks(filter));
  // only display 'Past Due' if there are tasks past due
  if (title === 'Past Due' && number <= 0) return null;

  return (
    <ListItem sx={{ p: 0 }}>
      <NavLink to={to}>
        <ListItemIcon>
          <Badge
            badgeContent={number}
            color={title === 'Past Due' ? 'error' : 'primary'}
          >
            {icon}
          </Badge>
        </ListItemIcon>
        <ListItemText primary={title} />
      </NavLink>
    </ListItem>
  );
};
