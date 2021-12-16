import React, { useState } from 'react';

// mui
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
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckIcon from '@mui/icons-material/Check';

const capitalize = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();

const SettingsListItem = ({ value, sortBy, handleClick }) => (
  <ListItem disablePadding>
    <ListItemButton onClick={() => handleClick(value)}>
      {sortBy === value && (
        <ListItemIcon>
          <CheckIcon />
        </ListItemIcon>
      )}
      <ListItemText inset={sortBy !== value} primary={capitalize(value)} />
    </ListItemButton>
  </ListItem>
);

// Renders controls for the task's priority
const TaskListSettings = ({ sortBy, setSortBy }) => {
  const [anchor, setAnchor] = useState(null);

  const handleClick = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleListClick = (value) => {
    console.log('Clicked');
    setSortBy(value);
    handleClose();
  };

  const open = !!anchor;
  const id = open ? 'priority-popup' : undefined;
  return (
    <Box>
      <IconButton aria-label="open settings" onClick={handleClick}>
        <SettingsIcon />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <List dense>
          <ListItem>
            <ListItemText>
              <span style={{ fontWeight: 'bold' }}>Sort By</span>
            </ListItemText>
          </ListItem>
          <Divider />
          <SettingsListItem
            value="default"
            handleClick={handleListClick}
            sortBy={sortBy}
          />
          <SettingsListItem
            value="alphabetically"
            handleClick={handleListClick}
            sortBy={sortBy}
          />
          <SettingsListItem
            value="due date"
            handleClick={handleListClick}
            sortBy={sortBy}
          />
          <SettingsListItem
            value="date added"
            handleClick={handleListClick}
            sortBy={sortBy}
          />
          <SettingsListItem
            value="priority"
            handleClick={handleListClick}
            sortBy={sortBy}
          />
        </List>
      </Popover>
    </Box>
  );
};

export default TaskListSettings;
