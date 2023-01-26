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

// icons
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// tags
import { selectTagById, deleteTag, UpdateTag } from '@/features/tags';

// store
import { useSelector, useDispatch } from '@/app';

// hooks
import { usePopup } from '@/hooks/usePopup';
import { usePopover } from '@/hooks/usePopover';

type Props = {
  id: string;
};

/**
 * Renders the UI for editing tags.
 *
 * Initially renders a button that, when pressed, renders a PopOver with options to edit or delete the tag.
 *
 */
export const TagSettings: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const tag = useSelector(selectTagById(id));

  const [warningOpen, openWarning, closeWarning] = usePopup(false);
  const [editorOpen, openEditor, closeEditor] = usePopup(false);
  const [settingsAnchor, openSettings, closeSettings, settingsOpen] =
    usePopover(null);

  // event handlers
  const confirmClose = () => {
    closeEditor();
    closeSettings();
  };

  const handleDelete = () => {
    if (tag) {
      dispatch(deleteTag(tag.id));
    }
  };

  const htmlID = settingsOpen ? 'priority-popup' : undefined;

  if (!tag) return null;

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
              <ListItemText>Edit Tag</ListItemText>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem sx={{ p: 0 }}>
            <ListItemButton onClick={openWarning}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText>Delete Tag</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
      <CustomDialog open={!!editorOpen} onClose={confirmClose}>
        <UpdateTag tag={tag} onDiscard={openWarning} onClose={confirmClose} />
      </CustomDialog>
      <WarningDialog
        open={!!warningOpen}
        title="Delete Tag?"
        body="Warning: this cannot be undone."
        handleConfirm={handleDelete}
        handleCancel={closeWarning}
        confirmLabel="Delete"
      />
    </Box>
  );
};
