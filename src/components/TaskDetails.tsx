import React from 'react';

// mui
import { Button, Box, Typography, Grid } from '@mui/material';

// components
import PriorityIcon from './PriorityIcon';
import DateChip from './DateChip';
import WarningDialog from './WarningDialog';
import CustomDialog from './CustomDialog';
import LabelDisplay from './LabelDisplay';

// store
import { useStore } from '../store/useStore';

// hooks
import { usePopup } from '../hooks/usePopup';

// types
import { TaskType } from '../types';
import { UpdateTask } from './forms/UpdateTask';

export const DetailsGrid: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <Grid container justifyContent="space-between">
    {children}
  </Grid>
);

export const ButtonGrid: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Grid container sx={{ mt: 2 }} justifyContent="flex-end" spacing={2}>
    {children}
  </Grid>
);

type BoxProps = {
  task: TaskType;
  openEditor: () => void;
};

const TaskDetailsBox: React.FC<BoxProps> = ({ task, openEditor }) => (
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
          <DateChip date={task.due} />
        </Grid>
      )}
      <Grid item>
        <Grid container alignItems="center" spacing={2}>
          {task.label && (
            <Grid item>
              <LabelDisplay label={task.label} />
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

type Props = {
  open: boolean;
  onClose: () => void;
  id: string;
};

/**
 * Renders a modal box to display the Task's details.
 */
export const TaskDetails: React.FC<Props> = ({ open = false, onClose, id }) => {
  const { list } = useStore();
  // get all details of currently-opened task
  const task = list.find((task) => task.id === id) || null;
  const [warningOpen, openWarning, closeWarning] = usePopup(false);
  const [editorOpen, openEditor, closeEditor, tryCloseEditor] = usePopup(false);

  // closes the TaskDetails dialog
  const confirmClose = () => {
    closeWarning();
    closeEditor();
    onClose();
  };

  // attempts to close the ui
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
        <TaskDetailsBox task={task} openEditor={openEditor} />
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

export default TaskDetails;
