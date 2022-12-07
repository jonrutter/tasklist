import React, { useState } from 'react';

// components
import { ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { TaskCheckbox } from './TaskCheckbox';
import { TaskName } from './TaskName';
import { TaskSummary } from './TaskSummary';

// store
import { useStore } from '@/store/useStore';

// types
import type { TaskType } from '@/types';

type Props = {
  task: TaskType;
};

/**
 * A modified TaskListItem, rendered by the CompletedTaskList to represent a task that has been deleted.
 */
export const CompletedTask: React.FC<Props> = ({ task }) => {
  // store
  const { dispatch } = useStore();
  const [checked, setChecked] = useState(true);

  // destructuring task properties
  const { name, description, priority, due, id, tag } = task;

  const restoreTask = (id: string) => {
    setChecked(false);
    dispatch({ type: 'RESTORE_TASK', payload: id });
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
              tag={tag}
            />
          }
        />
      </ListItem>

      <Divider component="li" sx={{ ml: 7 }} />
    </>
  );
};
