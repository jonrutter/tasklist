import React from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// mui
import { Button } from '@mui/material';
import { Delete } from '@mui/icons-material';

// components
import { WarningDialog } from '@/components/ui/WarningDialog';

// tasks
import {
  deleteCompletedTasks,
  selectCompleted,
  CompletedTaskList,
} from '@/features/tasks';

// store
import { useSelector, useDispatch } from '@/app';

// custom hooks
import { usePopup } from '@/hooks/usePopup';

export const CompletedPage: React.FC = () => {
  const dispatch = useDispatch();
  const completedList = useSelector(selectCompleted);

  const [warningOpen, openWarning, closeWarning] = usePopup(false);

  const deleteAll = () => {
    dispatch(deleteCompletedTasks());
    closeWarning();
  };

  const checkBeforeWarning = () => {
    if (!completedList.length) return;
    else openWarning();
  };

  return (
    <>
      <Helmet>
        <title>Completed | TaskList</title>
      </Helmet>

      <CompletedTaskList list={completedList} label="Completed" />
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
