import React from 'react';

// mui
import { Snackbar, Alert, Button, Slide } from '@mui/material';
import type { SlideProps } from '@mui/material';

// store
import { useStore } from '../store/useStore';
import { RESTORE_TASK } from '../store/actions';

type BaseSlideProps = {
  direction: 'right';
};
type SlideTProps = Omit<SlideProps, keyof BaseSlideProps>;
const SlideTransition: React.FC<SlideTProps> = (props: SlideProps) => {
  return <Slide {...props} direction="right" />;
};

type Props = {
  open: boolean;
  handleClose: () => void;
  id: string;
};

/**
 * Renders an alert confirming that a list item was deleted, with a button to undo the deletion.
task.
 */
export const UndoAlert: React.FC<Props> = ({
  open = false,
  handleClose,
  id,
}) => {
  const { dispatch } = useStore();

  // store
  const restoreCreator = () => ({
    type: RESTORE_TASK,
    payload: id,
  });

  const restoreTask = () => {
    dispatch(restoreCreator());
    handleClose();
  };

  if (!id) return null;

  return (
    <Snackbar
      open={open}
      autoHideDuration={8000}
      onClose={handleClose}
      sx={{ width: '100%', maxWidth: '280px' }}
      TransitionComponent={SlideTransition}
    >
      <Alert
        severity="success"
        elevation={6}
        variant="filled"
        sx={{ width: '100%' }}
        action={
          <Button color="inherit" size="small" onClick={restoreTask}>
            Undo
          </Button>
        }
      >
        Task completed!
      </Alert>
    </Snackbar>
  );
};

export default UndoAlert;
