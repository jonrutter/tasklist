import React from 'react';

// components
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from './NavLink';
import { LabelSettings } from './LabelSettings';

// icons
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

// colors
import { colors } from '@/data/colors';

// types
import type { LabelType } from '@/types';

type Props = {
  label: LabelType;
};

/**
 * A modified NavItem, for rendering links to label pages.
 */
export const NavLabelItem: React.FC<Props> = ({ label }) => {
  const { name, color, id } = label;
  return (
    <ListItem sx={{ p: 0, pl: 4 }} secondaryAction={<LabelSettings id={id} />}>
      <NavLink to={`/label/${name}`}>
        <ListItemIcon sx={{ minWidth: '32px' }}>
          <LocalOfferIcon
            sx={{
              color: color ? colors[color as keyof typeof colors] : 'grey',
            }}
          />
        </ListItemIcon>
        <ListItemText primary={name} />
      </NavLink>
    </ListItem>
  );
};
