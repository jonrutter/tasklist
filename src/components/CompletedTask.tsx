import React, { useState } from 'react';

// mui
import {
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';

// store
import { useStore } from '../store/useStore';

// components
import TaskDeleteControl from './TaskListItem/TaskDeleteControl';
import TaskPrimaryInfo from './TaskListItem/./TaskPrimaryInfo';
import TaskSecondaryInfo from './TaskListItem/./TaskSecondaryInfo';

import type { TaskType } from '../types';

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
  const { name, description, priority, due, id, label } = task;

  const restoreTask = (id: string) => {
    setChecked(false);
    dispatch({ type: 'RESTORE_TASK', payload: id });
  };

  if (!name || !id) return null;

  return (
    <>
      <ListItem disablePadding>
        <ListItemIcon>
          <TaskDeleteControl
            checked={checked}
            handleCheck={() => restoreTask(id)}
            taskName={task.name}
            action={'Restore'}
          />
        </ListItemIcon>
        <ListItemButton>
          <ListItemText
            disableTypography
            primary={<TaskPrimaryInfo name={name} />}
            secondary={
              <TaskSecondaryInfo
                description={description}
                due={due}
                priority={priority}
                label={label}
              />
            }
          />
        </ListItemButton>
      </ListItem>
      <Divider component="li" sx={{ ml: 7 }} />
    </>
  );
};

export default CompletedTask;
