import React from 'react';

// components
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from '@/components/layout/NavLink';
import { TagSettings } from './TagSettings';

// icons
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

// colors
import { colors } from '@/data/colors';

// store
import { useSelector } from '@/app';
import { selectTagById } from '@/features/tags';

type Props = {
  id: string;
};

/**
 * A modified NavItem, for rendering links to tag pages.
 */
export const NavTagItem: React.FC<Props> = ({ id }) => {
  const tag = useSelector(selectTagById(id));
  if (!tag) return null;

  const { name, color } = tag;

  return (
    <ListItem sx={{ p: 0, pl: 4 }} secondaryAction={<TagSettings id={id} />}>
      <NavLink to={`/tag/${id}`}>
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
