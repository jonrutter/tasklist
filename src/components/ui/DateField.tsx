import React from 'react';

// components
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
  Popover,
  TextField,
  Divider,
  Tooltip,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// icons
import TodayIcon from '@mui/icons-material/Today';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';

// utils
import add from 'date-fns/add';
import { displayDate } from '../../utils/date';

// hooks
import { usePopover } from '../../hooks/usePopover';

// types
type ItemProps = {
  title: string;
  icon: JSX.Element;
  onClick: () => void;
};

// components
const DateListItem: React.FC<ItemProps> = ({ title, icon, onClick }) => (
  <ListItem sx={{ p: 0 }}>
    <ListItemButton onClick={onClick}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{title}</ListItemText>
    </ListItemButton>
  </ListItem>
);

type Props = {
  dateString: string | undefined;
  setDateString: React.Dispatch<React.SetStateAction<string | undefined>>;
};

/**
 * A form control to handle picking a date.
 */
export const DateField: React.FC<Props> = ({ dateString, setDateString }) => {
  const [anchor, handleOpen, handleClose, open] = usePopover();

  // deserialize the datestring so MUI datepicker props will be correctly typed
  const date = dateString ? new Date(dateString) : new Date();

  /**
   * Handles clicking a date button (e.g., 'Today', 'Tomorrow').
   *
   * Updates state with the given date value (if available), and closes the dialog.
   */
  const handleClick = (newDate: Date | undefined) => {
    if (newDate) {
      // serialize the date and update state
      setDateString(newDate.toJSON());
    }
    handleClose();
  };

  const id = open ? 'date-popup' : undefined;
  return (
    <Box>
      <Tooltip title="Set Due Date" aria-label="Set due date">
        <Button onClick={handleOpen} variant="outlined">
          {date ? displayDate(date) : 'Schedule'}
        </Button>
      </Tooltip>
      <Popover
        id={id}
        data-testid={id}
        open={open}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ pt: 2 }}>
          <DatePicker
            label="Due Date"
            value={date}
            onChange={(newDate) => {
              if (newDate) {
                setDateString(newDate.toJSON());
              }
            }}
            onAccept={handleClose}
            renderInput={(params) => (
              <TextField size="small" sx={{ m: 2 }} {...params} />
            )}
            minDate={new Date()}
          />
          <List>
            <Divider />
            <DateListItem
              title="Today"
              icon={<TodayIcon color="success" />}
              onClick={() => handleClick(new Date())}
            />
            <DateListItem
              title="Tomorrow"
              icon={<UpcomingIcon color="primary" />}
              onClick={() => handleClick(add(new Date(), { days: 1 }))}
            />
            <DateListItem
              title="Next Week"
              icon={<InsertInvitationIcon color="secondary" />}
              onClick={() => handleClick(add(new Date(), { weeks: 1 }))}
            />
            <Divider />
            <DateListItem
              title="No Date"
              icon={<DoNotDisturbAltIcon />}
              onClick={() => handleClick(undefined)}
            />
          </List>
        </Box>
      </Popover>
    </Box>
  );
};
