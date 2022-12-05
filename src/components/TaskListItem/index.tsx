import React, { useState, useEffect, useCallback } from 'react';

// mui
import {
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';

// components
import TaskDeleteControl from './TaskDeleteControl';
import TaskPrimaryInfo from './TaskPrimaryInfo';
import TaskSecondaryInfo from './TaskSecondaryInfo';
import TaskDetails from '../TaskDetails';

// store
import { useStore } from '../../store/useStore';

// hooks
import { usePopup } from '../../hooks/usePopup';

import { TaskType } from '../../types';

type Props = {
  handleDelete: (id: string) => void;
  task: TaskType;
};

/**
 * Renders a task's data as a MUI ListItem.
 */
export const TaskListItem: React.FC<Props> = ({ handleDelete, task }) => {
  const { dispatch } = useStore();
  // checkbox state: when true, the item is deleted
  const [checked, setChecked] = useState(false);
  const [detailsOpen, openDetails, closeDetails] = usePopup(false);

  // destructuring task properties
  const { name, id } = task;

  const deleteTask = useCallback(
    (id: string) => {
      handleDelete(id);
      dispatch({ type: 'DELETE_TASK', payload: id });
    },
    [dispatch, handleDelete]
  );

  // creates 500ms lag between clicking checkbox and deleting item.
  useEffect(() => {
    let deleteTimeout: number | undefined = undefined;
    if (checked) {
      deleteTimeout = window.setTimeout(() => deleteTask(id), 500);
    } else {
      clearTimeout(deleteTimeout);
    }
    return () => window.clearTimeout(deleteTimeout);
  }, [checked, deleteTask, id]);

  // check handler
  const handleCheck = () => {
    setChecked((prev) => !prev);
  };

  if (!name || !id) return null;

  return (
    <>
      <ListItem disablePadding>
        <ListItemIcon>
          <TaskDeleteControl
            checked={checked}
            handleCheck={handleCheck}
            taskName={task.name}
          />
        </ListItemIcon>
        <ListItemButton onClick={openDetails}>
          <ListItemText
            disableTypography
            primary={<TaskPrimaryInfo name={name} />}
            secondary={<TaskSecondaryInfo {...task} />}
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

export default TaskListItem;
