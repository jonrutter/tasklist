import React, { useState, useEffect, useCallback } from 'react';

// components
import {
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import { TaskCheckbox } from './TaskCheckbox';
import { TaskName } from './TaskName';
import { TaskSummary } from './TaskSummary';
import { TaskDetails } from './TaskDetails';

// store
import { useStore } from '@/store/useStore';

// hooks
import { usePopup } from '@/hooks/usePopup';

// types
import { TaskType } from '@/types';

type Props = {
  handleDelete: (id: string) => void;
  task: TaskType;
};

export const Task: React.FC<Props> = ({ handleDelete, task }) => {
  const { dispatch } = useStore();
  const [checked, setChecked] = useState(false);
  const [detailsOpen, openDetails, closeDetails] = usePopup(false);

  // getting task name and id
  const { name, id } = task;

  const deleteTask = useCallback(
    (id: string) => {
      handleDelete(id);
      dispatch({ type: 'DELETE_TASK', payload: id });
    },
    [handleDelete, dispatch]
  );

  useEffect(() => {
    let deleteTimeout: number | undefined = undefined;
    if (checked) {
      deleteTimeout = window.setTimeout(() => deleteTask(id), 500);
    } else {
      clearTimeout(deleteTimeout);
    }
    return () => window.clearTimeout(deleteTimeout);
  }, [checked, deleteTask, id]);

  const handleCheck = () => {
    setChecked((prev) => !prev);
  };

  if (!name || !id) return null;

  return (
    <>
      <ListItem disablePadding>
        <ListItemIcon>
          <TaskCheckbox
            checked={checked}
            onCheck={handleCheck}
            taskName={task.name}
          />
        </ListItemIcon>
        <ListItemButton onClick={openDetails}>
          <ListItemText
            disableTypography
            primary={<TaskName name={name} />}
            secondary={<TaskSummary {...task} />}
          />
        </ListItemButton>
      </ListItem>
      <TaskDetails
        open={task && detailsOpen}
        onClose={closeDetails}
        {...task}
      />
      <Divider component="li" sx={{ ml: 7 }} />
    </>
  );
};
