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
import { ListHeader } from '@/components/ui/ListHeader';

// icons
import CheckIcon from '@mui/icons-material/Check';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// store
import { useSelector, useDispatch } from '@/app';
import { selectSortBy, updateSortBy } from '../store/settingsSlice';

// hooks
import { usePopover } from '@/hooks/usePopover';

// types
import type { SortByOption } from '../store/settingsSlice';

const options: SortByOption[] = [
  'default',
  'alphabetically',
  'due date',
  'date added',
  'priority',
];

const capitalize = (str: string) =>
  str[0].toUpperCase() + str.slice(1).toLowerCase();

type ItemProps = {
  value: SortByOption;
  sortBy: string;
  onClick: (value: SortByOption) => void;
};

const SettingsListItem: React.FC<ItemProps> = ({ value, sortBy, onClick }) => (
  <ListItem disablePadding>
    <ListItemButton onClick={() => onClick(value)}>
      {sortBy === value && (
        <ListItemIcon>
          <CheckIcon />
        </ListItemIcon>
      )}
      <ListItemText inset={sortBy !== value} primary={capitalize(value)} />
    </ListItemButton>
  </ListItem>
);

/**
 * Renders a button that, when pressed, opens a popover that allows users to sort the list in different ways.
 *
 */
export const TaskListSettings = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector(selectSortBy);
  const [anchor, handleOpen, handleClose, open] = usePopover();

  const handleClick = (value: SortByOption) => {
    dispatch(updateSortBy(value));
    handleClose();
  };

  const id = open ? 'priority-popup' : undefined;
  return (
    <Box>
      <Tooltip title="Sort list">
        <IconButton aria-label="sort list" onClick={handleOpen}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>

      <Popover
        id={id}
        open={open}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <List dense>
          <ListHeader>Sort By</ListHeader>
          <Divider />
          {options.map((option) => (
            <SettingsListItem
              key={option}
              value={option}
              onClick={handleClick}
              sortBy={sortBy}
            />
          ))}
        </List>
      </Popover>
    </Box>
  );
};
