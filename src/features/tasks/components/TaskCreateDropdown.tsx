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
import type { PriorityType } from '../store/tasksSlice';
import type { TagType } from '@/features/tags';

type DefaultItem = {
  name?: string;
  description?: string;
  priority?: PriorityType;
  due?: Date | number;
  tag?: TagType;
  date?: Date | number;
  id?: string;
};

type Props = {
  defaultItem?: DefaultItem;
};

/**
 * Renders a button that, when pressed, causes a Task creation form to be rendered as a dropdown.
 *
 * Also renders a warning dialog when the user attempts to close the form without saving.
 */
export const TaskCreateDropdown: React.FC<Props> = ({ defaultItem }) => {
  const [formOpen, openForm, closeForm] = usePopup(false);
  const [warningOpen, openWarning, closeWarning] = usePopup(false);

  // TODO: fix
  console.log(defaultItem);

  // closes the entire ui
  const close = () => {
    closeForm();
    closeWarning();
  };

  return (
    <Box sx={{ mt: 2 }}>
      {formOpen ? (
        <CreateTask onClose={close} onDiscard={openWarning} />
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
