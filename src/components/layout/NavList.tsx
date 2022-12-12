import React from 'react';

// components
import { List } from '@mui/material';
import { NavItem } from './NavItem';

// store
import { useSelector } from '@/app';
import { selectList } from '@/features/tasks';

// types
import type { NavItemType } from '../../data/nav';

type Props = {
  navList: NavItemType[];
};

/**
 * Renders a list of nav items.
 */
export const NavList: React.FC<Props> = ({ navList }) => {
  const list = useSelector(selectList);

  return (
    <List sx={{ pt: 0 }}>
      {navList.map((item, index) => {
        const { title, to, listCallback, icon } = item;
        if (title === 'Past Due' && !list.filter(listCallback).length)
          return null;
        return (
          <NavItem
            key={index}
            title={title}
            to={to}
            list={list.filter(listCallback)}
            icon={icon}
          />
        );
      })}
    </List>
  );
};
