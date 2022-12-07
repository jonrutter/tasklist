import React, { useState } from 'react';

// components
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  ListItemIcon,
  ListItem,
} from '@mui/material';

// icons
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

type Props = React.PropsWithChildren<{
  label: string;
  secondaryAction: JSX.Element;
}>;

/**
 * Renders a MUI List component with a dropdownlist.
 */
export const CollapseList: React.FC<Props> = ({
  label,
  secondaryAction = null,
  children,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleClick = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <List>
      <ListItem sx={{ p: 0 }} secondaryAction={secondaryAction}>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            {expanded ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
          <ListItemText primary={label} />
        </ListItemButton>
      </ListItem>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List disablePadding>{children}</List>
      </Collapse>
    </List>
  );
};
