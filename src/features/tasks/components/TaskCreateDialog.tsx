import React from 'react';

// components
import { IconButton, Tooltip } from '@mui/material';
import { CustomDialog } from '@/components/ui/CustomDialog';
import { WarningDialog } from '@/components/ui/WarningDialog';
import { CreateTask } from './CreateTask';

// icons
import AddIcon from '@mui/icons-material/Add';

// hooks
import { usePopup } from '@/hooks/usePopup';

/**
 * Handles all UI logic for rendering a task create form as a dialog box.
 *
 * Renders a button that, when pressed, causes a task create form to render as a modal dialog.
 *
 * Also renders a warning dialog when the user attempts to close the form without saving.
 */
export const TaskCreateDialog: React.FC = () => {
  const [formOpen, openForm, closeForm] = usePopup();
  const [warningOpen, openWarning, closeWarning] = usePopup();

  // form error checking
  const close = () => {
    closeForm();
    closeWarning();
  };

  return (
    <>
      <Tooltip title="New Task">
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="create new task"
          focusRipple
          onClick={openForm}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
      <CustomDialog open={formOpen} onClose={openWarning}>
        <CreateTask onClose={close} onDiscard={openWarning} />
      </CustomDialog>
      <WarningDialog
        open={warningOpen}
        title="Discard Changes"
        body="Are you sure you want to discard your work? This cannot be undone"
        handleCancel={closeWarning}
        handleConfirm={close}
        confirmLabel={'Discard'}
        cancelLabel={'Cancel'}
      />
    </>
  );
};
