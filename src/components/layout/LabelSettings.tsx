import React from 'react';

// components
import {
  Box,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemButton,
  ListItemIcon,
  Tooltip,
} from '@mui/material';
import { WarningDialog } from '@/components/ui/WarningDialog';
import { CustomDialog } from '@/components/ui/CustomDialog';
import { UpdateLabel } from '@/features/labels';

// icons
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// store
import { useStore } from '@/store/useStore';

// hooks
import { usePopup } from '@/hooks/usePopup';
import { usePopover } from '@/hooks/usePopover';

// types
import { LabelType } from '@/types';

type Props = {
  id: string;
};

/**
 * Renders the UI for editing labels.
 *
 * Initially renders a button that, when pressed, renders a PopOver with options to edit or delete the label.
 *
 */
export const LabelSettings: React.FC<Props> = ({ id }) => {
  const { labels, dispatch } = useStore();
  const label: LabelType | undefined =
    labels.find((label) => label.id === id) || undefined;

  const [warningOpen, openWarning, closeWarning] = usePopup(false);
  const [editorOpen, openEditor, closeEditor] = usePopup(false);
  const [settingsAnchor, openSettings, closeSettings, settingsOpen] =
    usePopover(null);

  // event handlers
  const confirmClose = () => {
    closeEditor();
    closeSettings();
  };

  const deleteLabel = () => {
    if (label) {
      dispatch({
        type: 'DELETE_LABEL',
        payload: { label },
      });
    }
  };

  const htmlID = settingsOpen ? 'priority-popup' : undefined;

  if (!label) return null;

  return (
    <Box>
      <Tooltip title="More options">
        <IconButton aria-label="more options" edge="end" onClick={openSettings}>
          <MoreHorizIcon />
        </IconButton>
      </Tooltip>
      <Popover
        id={htmlID}
        open={settingsOpen}
        anchorEl={settingsAnchor}
        onClose={closeSettings}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <List>
          <ListItem sx={{ p: 0 }}>
            <ListItemButton onClick={openEditor}>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText>Edit Label</ListItemText>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem sx={{ p: 0 }}>
            <ListItemButton onClick={openWarning}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText>Delete Label</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
      <CustomDialog open={!!editorOpen} onClose={confirmClose}>
        <UpdateLabel
          label={label}
          onDiscard={openWarning}
          onClose={confirmClose}
        />
      </CustomDialog>
      <WarningDialog
        open={!!warningOpen}
        title="Delete Label?"
        body="Warning: this cannot be undone."
        handleConfirm={deleteLabel}
        handleCancel={closeWarning}
        confirmLabel="Delete"
      />
    </Box>
  );
};
