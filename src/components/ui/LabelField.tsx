import React from 'react';

// components
import {
  Box,
  Button,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  Tooltip,
} from '@mui/material';
import { ListHeader } from './ListHeader';

// icons
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';

// store
import { useStore } from '@/store/useStore';

// colors
import { colors } from '@/data/colors';

// hooks
import { usePopover } from '@/hooks/usePopover';

// types
import { LabelType } from '@/types';

type Props = {
  label: LabelType | undefined;
  setLabel: React.Dispatch<React.SetStateAction<LabelType | undefined>>;
};

/**
 * A form control to handle adding a label to a task.
 */
export const LabelField: React.FC<Props> = ({ label, setLabel }) => {
  const [anchor, handleOpen, handleClose, open] = usePopover();
  const { labels } = useStore();

  const handleClick = (label: LabelType) => {
    setLabel(label);
    handleClose();
  };

  const clearLabel = () => {
    setLabel(undefined);
    handleClose();
  };

  const id = open ? 'label-popup' : undefined;

  return (
    <Box>
      {label ? (
        <Tooltip title="Update Label">
          <Button
            aria-label="Update Label"
            onClick={handleOpen}
            sx={(theme) => ({
              color: theme.palette.text.primary,
              textTransform: 'capitalize',
              fontWeight: 'normal',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
            })}
            startIcon={
              <LocalOfferIcon
                sx={{
                  color: label.color
                    ? colors[label.color as keyof typeof colors]
                    : 'grey',
                }}
              />
            }
          >
            {label.name}
          </Button>
        </Tooltip>
      ) : (
        <Tooltip title="Set Label">
          <IconButton aria-label="Set label" onClick={handleOpen}>
            <LocalOfferOutlinedIcon />
          </IconButton>
        </Tooltip>
      )}
      <Popover
        id={id}
        data-testid={id}
        open={open}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <List>
          <ListHeader>Label</ListHeader>
          <Divider />
          {labels.map((label) => (
            <ListItem key={label.id} sx={{ p: 0 }}>
              <ListItemButton onClick={() => handleClick(label)}>
                <ListItemIcon>
                  <LocalOfferIcon
                    sx={{
                      color: label.color
                        ? colors[label.color as keyof typeof colors]
                        : 'grey',
                    }}
                  />
                </ListItemIcon>
                <ListItemText>{label.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
          <Divider />
          <ListItem key={id} sx={{ p: 0 }}>
            <ListItemButton onClick={clearLabel}>
              <ListItemIcon>
                <DoNotDisturbAltIcon />
              </ListItemIcon>
              <ListItemText>No Label</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </Box>
  );
};
