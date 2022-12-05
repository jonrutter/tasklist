import React from 'react';

// mui
import { ListItem, ListItemText } from '@mui/material';

type Props = React.PropsWithChildren;

/**
 * Renders a styled header for lists.
 */
export const ListHeader: React.FC<Props> = ({ children }) => (
  <ListItem>
    <ListItemText>
      <span style={{ fontWeight: 'bold' }}>{children}</span>
    </ListItemText>
  </ListItem>
);

export default ListHeader;
