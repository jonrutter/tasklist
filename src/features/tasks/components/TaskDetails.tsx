import React from 'react';

// components
import { Button, Box, Typography, Grid } from '@mui/material';
import { PriorityIcon } from '@/components/ui/PriorityIcon';
import { DateChip } from '@/components/ui/DateChip';
import { WarningDialog } from '@/components/ui/WarningDialog';
import { CustomDialog } from '@/components/ui/CustomDialog';
import { Tag } from '@/features/tags';
import { UpdateTask } from './UpdateTask';

// store
import { useSelector } from '@/app';
import { selectTaskById } from '../store/tasksSlice';

// hooks
import { usePopup } from '@/hooks/usePopup';

// types
import type { TaskType } from '../store/tasksSlice';

/* Child Components */
const ButtonGrid: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Grid container sx={{ mt: 2 }} justifyContent="flex-end" spacing={2}>
    {children}
  </Grid>
);

type BoxProps = {
  task: TaskType;
  openEditor: () => void;
};

const DetailsBox: React.FC<BoxProps> = ({ task, openEditor }) => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h6" component="h3" sx={{ mb: 3 }}>
      {task.name}
    </Typography>
    {task.description && (
      <Typography variant="body1" sx={{ mb: 4 }}>
        {task.description}
      </Typography>
    )}
    <Grid container justifyContent="space-between" spacing={2}>
      {task.due && (
        <Grid item>
          <DateChip dateString={task.due} />
        </Grid>
      )}
      <Grid item>
        <Grid container alignItems="center" spacing={2}>
          {task.tag && (
            <Grid item>
              <Tag id={task.tag} />
            </Grid>
          )}
          <Grid item>
            <PriorityIcon priority={task.priority} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <ButtonGrid>
      <Grid item>
        <Button variant="outlined" onClick={openEditor}>
          Update
        </Button>
      </Grid>
    </ButtonGrid>
  </Box>
);

/* Task Details */

type Props = {
  open: boolean;
  onClose: () => void;
  id: string;
};

/**
 * Renders a modal box to display the Task's full details.
 */
export const TaskDetails: React.FC<Props> = ({ open = false, onClose, id }) => {
  const task = useSelector(selectTaskById(id));
  const [warningOpen, openWarning, closeWarning] = usePopup(false);
  const [editorOpen, openEditor, closeEditor, tryCloseEditor] = usePopup(false);

  // TODO: this could use a major refactor for clarity
  const confirmClose = () => {
    closeWarning();
    closeEditor();
    onClose();
  };

  // attemps to close the ui
  const tryClose = () =>
    tryCloseEditor(() => !editorOpen, confirmClose, openWarning);

  if (!task) return null;

  return (
    <CustomDialog onClose={tryClose} open={open}>
      {editorOpen ? (
        <UpdateTask
          task={task}
          onClose={confirmClose}
          onDiscard={openWarning}
        />
      ) : (
        <DetailsBox task={task} openEditor={openEditor} />
      )}
      <WarningDialog
        open={warningOpen}
        title="Discard changes"
        body="Are you sure you want to discard all your changes? This can't be undone."
        cancelLabel="Keep Editing"
        confirmLabel="Discard"
        handleCancel={closeWarning}
        handleConfirm={confirmClose}
      />
    </CustomDialog>
  );
};
