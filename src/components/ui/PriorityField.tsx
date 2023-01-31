import React from 'react';

// components
import {
  Box,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
} from '@mui/material';
import { PriorityIcon } from './PriorityIcon';
import { ListHeader } from './ListHeader';

// hooks
import { usePopover } from '@/hooks/usePopover';
import type { PriorityType } from '@/features/tasks';

// types
type Props = {
  priority: PriorityType;
  setPriority: React.Dispatch<React.SetStateAction<PriorityType>>;
};

/**
 * A form control for selecting a task's priority.
 *
 * Renders a button that opens a PopOver with options to select a priority.
 */
export const PriorityField: React.FC<Props> = ({ priority, setPriority }) => {
  const [anchor, handleOpen, handleClose, open] = usePopover();

  const priorities: PriorityType[] = [1, 2, 3, 4];

  const handleClick = (num: PriorityType) => {
    setPriority(num);
    handleClose();
  };

  const id = open ? 'priority-popup' : undefined;
  return (
    <Box>
      <Tooltip title="Set Priority">
        <IconButton aria-label={`Set Priority`} onClick={handleOpen}>
          <PriorityIcon priority={priority} />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        data-testid={id}
        open={open}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <List>
          <ListHeader>Priority</ListHeader>
          <Divider />
          {priorities.map((num) => (
            <ListItem key={num} sx={{ p: 0 }}>
              <ListItemButton onClick={() => handleClick(num)}>
                <ListItemIcon>
                  <PriorityIcon priority={num} />
                </ListItemIcon>
                <ListItemText>Priority {num}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </Box>
  );
};
