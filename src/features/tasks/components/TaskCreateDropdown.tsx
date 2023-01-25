import React from 'react';

// components
import { Box, Button } from '@mui/material';
import { CreateTask } from './CreateTask';
import { WarningDialog } from '@/components/ui/WarningDialog';

// hooks
import { usePopup } from '@/hooks/usePopup';

// icons
import AddIcon from '@mui/icons-material/Add';

// types
import type { TaskType } from '@/features/tasks';

type Props = {
  defaultItem?: Partial<TaskType>;
};

/**
 * Renders a button that, when pressed, causes a Task creation form to be rendered as a dropdown.
 *
 * Also renders a warning dialog when the user attempts to close the form without saving.
 */
export const TaskCreateDropdown: React.FC<Props> = ({ defaultItem }) => {
  const [formOpen, openForm, closeForm] = usePopup(false);
  const [warningOpen, openWarning, closeWarning] = usePopup(false);

  // closes the entire ui
  const close = () => {
    closeForm();
    closeWarning();
  };

  return (
    <Box sx={{ mt: 2 }}>
      {formOpen ? (
        <CreateTask
          onClose={close}
          onDiscard={openWarning}
          defaultItem={defaultItem}
        />
      ) : (
        <Button variant="text" onClick={openForm} startIcon={<AddIcon />}>
          New task
        </Button>
      )}
      <WarningDialog
        open={warningOpen}
        title="Discard Changes"
        body="Are you sure you want to discard your work? This cannot be undone"
        handleCancel={closeWarning}
        handleConfirm={close}
        confirmLabel={'Discard'}
        cancelLabel={'Cancel'}
      />
    </Box>
  );
};
