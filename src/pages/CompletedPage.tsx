import React from 'react';

// react helmet
import { Helmet } from 'react-helmet-async';

// mui
import { Button } from '@mui/material';
import { Delete } from '@mui/icons-material';

// components
import { Layout } from '@/components/layout/Layout';
import { CompletedTaskList } from '@/features/tasks';
import { WarningDialog } from '@/components/ui/WarningDialog';

// store
import { useStore } from '@/store/useStore';

// custom hooks
import { usePopup } from '@/hooks/usePopup';

export const CompletedPage: React.FC = () => {
  const { dispatch, deleted } = useStore();
  const [warningOpen, openWarning, closeWarning] = usePopup(false);

  const deleteAll = () => {
    dispatch({ type: 'EMPTY_TRASH' });
    closeWarning();
  };

  const checkBeforeWarning = () => {
    if (!deleted.length) return;
    else openWarning();
  };

  return (
    <Layout>
      <Helmet>
        <title>Completed | TaskList</title>
      </Helmet>

      <CompletedTaskList list={deleted} label="Completed" />
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
    </Layout>
  );
};
