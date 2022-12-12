import React from 'react';

// components
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from './NavLink';
import { TagSettings } from './TagSettings';

// icons
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

// colors
import { colors } from '@/data/colors';

// types
import type { TagType } from '@/features/tags';

type Props = {
  tag: TagType;
};

/**
 * A modified NavItem, for rendering links to tag pages.
 */
export const NavTagItem: React.FC<Props> = ({ tag }) => {
  const { name, color, id } = tag;
  return (
    <ListItem sx={{ p: 0, pl: 4 }} secondaryAction={<TagSettings id={id} />}>
      <NavLink to={`/tag/${name}`}>
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
