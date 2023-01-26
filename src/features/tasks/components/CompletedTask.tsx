import React, { useState } from 'react';

// components
import { ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { TaskCheckbox } from './TaskCheckbox';
import { TaskName } from './TaskName';
import { TaskSummary } from './TaskSummary';

// store
import { useDispatch, useSelector } from '@/app';
import { selectTaskById, unmarkTaskCompleted } from '../store/tasksSlice';

type Props = {
  id: string;
};

/**
 * A modified TaskListItem, rendered by the CompletedTaskList to represent a task that has been deleted.
 */
export const CompletedTask: React.FC<Props> = ({ id }) => {
  // store
  const dispatch = useDispatch();
  const task = useSelector(selectTaskById(id));
  const [checked, setChecked] = useState(true);

  if (!task) return null;

  // destructuring task properties
  const { name, description, priority, due, tag } = task;

  const restoreTask = (id: string) => {
    setChecked(false);
    dispatch(unmarkTaskCompleted(id));
  };

  if (!name || !id) return null;

  return (
    <>
      <ListItem disablePadding>
        <ListItemIcon>
          <TaskCheckbox
            checked={checked}
            onCheck={() => restoreTask(id)}
            taskName={task.name}
            action={'Restore'}
          />
        </ListItemIcon>
        <ListItemText
          sx={{ p: '0.5rem 1rem' }}
          disableTypography
          primary={<TaskName name={name} />}
          secondary={
            <TaskSummary
              description={description}
              due={due}
              priority={priority}
              tagId={tag}
            />
          }
        />
      </ListItem>

      <Divider component="li" sx={{ ml: 7 }} />
    </>
  );
};
