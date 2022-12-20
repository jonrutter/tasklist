import React, { useCallback } from 'react';

// components
import { List, Typography, Box, Button } from '@mui/material';
import { CompletedTask } from './CompletedTask';
import { WarningDialog } from '@/components/ui/WarningDialog';

// icons
import Delete from '@mui/icons-material/Delete';

// hooks
import { useDispatch, useSelector } from '@/app';
import { usePopup } from '@/hooks/usePopup';

// utils
import { isTaskCompleted } from '@/utils/filters';

// types
import {
  deleteCompletedTasks,
  selectSortedFilteredTaskIds,
} from '../store/tasksSlice';

type Props = {
  label: string;
};

/**
 * A modified TaskList, for rendering completed tasks.
 */
export const CompletedTaskList: React.FC<Props> = ({
  label = 'Completed tasks',
}) => {
  const dispatch = useDispatch();

  const filter = useCallback(isTaskCompleted, []);
  const [warningOpen, openWarning, closeWarning] = usePopup(false);

  const deleteAll = () => {
    dispatch(deleteCompletedTasks());
    closeWarning();
  };
  const completedTaskIds = useSelector(selectSortedFilteredTaskIds(filter));

  const checkBeforeWarning = () => {
    if (completedTaskIds.length <= 0) return;
    else openWarning();
  };

  return (
    <>
      <Box sx={{ pt: 1 }}>
        <Typography variant="h6" component="h2">
          {completedTaskIds.length <= 0 ? 'No completed tasks' : label}
        </Typography>
        {completedTaskIds.length > 0 && (
          <List>
            {completedTaskIds.map((id) => (
              <CompletedTask key={id} id={id} />
            ))}
          </List>
        )}
      </Box>
      <Button
        onClick={checkBeforeWarning}
        color="error"
        startIcon={<Delete />}
        sx={{ mt: 1 }}
      >
        Delete All
      </Button>
      <WarningDialog
        open={warningOpen}
        title="Empty Trash"
        body="Are you sure you want to delete all of your completed tasks? This can't be undone."
        handleCancel={closeWarning}
        handleConfirm={deleteAll}
        cancelLabel="Cancel"
        confirmLabel="Delete"
      />
    </>
  );
};
