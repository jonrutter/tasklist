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
import { useDispatch, useSelector } from '@/app';
import { markTaskCompleted, selectTaskById } from '../store/tasksSlice';

// hooks
import { usePopup } from '@/hooks/usePopup';

type Props = {
  handleDelete: (id: string) => void;
  id: string;
};

export const Task: React.FC<Props> = ({ handleDelete, id }) => {
  const dispatch = useDispatch();
  const task = useSelector(selectTaskById(id));
  const [checked, setChecked] = useState(false);
  const [detailsOpen, openDetails, closeDetails] = usePopup(false);

  const deleteTask = useCallback(
    (id: string) => {
      handleDelete(id);
      dispatch(markTaskCompleted(id));
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

  if (!task) return null;

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
            primary={<TaskName name={task.name} />}
            secondary={
              <TaskSummary
                description={task.description}
                priority={task.priority}
                due={task.due}
                tagId={task.tag}
              />
            }
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
