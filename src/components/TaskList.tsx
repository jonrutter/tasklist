import React, { useState, useCallback } from 'react';

// mui
import { List, Typography, Box, Grid } from '@mui/material';

// components
import TaskListItem from './TaskListItem';
import TaskListSettings from './TaskListSettings';
import UndoAlert from './UndoAlert';

// store
import { useStore } from '../store/useStore';

import { TaskType } from '../types';

type Props = {
  list: TaskType[];
  label: string;
};

const sortCallbacks = {
  alphabetically: (a: TaskType, b: TaskType) => (a.name < b.name ? -1 : 1),
  'due date': (a: TaskType, b: TaskType) => {
    if (!b.due) return -1;
    if (!a.due) return 1;
    return a.due.getTime() - b.due.getTime();
  },
  priority: (a: TaskType, b: TaskType) => a.priority - b.priority,
  'date added': () => 0,
  default: () => 0,
};

/**
 * Renders a list of tasks.
 */
export const TaskList: React.FC<Props> = ({ list = [], label = 'To do' }) => {
  const { sortBy } = useStore();
  const listEmpty = !list.length;
  const [deletedTask, setDeletedTask] = useState<string>('');

  // task delete
  const handleDeleteTask = useCallback((id: string) => {
    setDeletedTask(id);
  }, []);

  const handleUndoDeleteTask = () => {
    setDeletedTask('');
  };

  const sortedList = [...list];

  if (sortBy !== 'default')
    sortedList.sort(sortCallbacks[sortBy as keyof typeof sortCallbacks]);

  return (
    <Box>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h6" component="h2">
            {listEmpty ? 'Your list is empty' : label}
          </Typography>
        </Grid>
        <Grid item>
          <TaskListSettings />
        </Grid>
      </Grid>
      {!listEmpty && (
        <List>
          {sortedList.map((task) => (
            <TaskListItem
              key={task.id}
              task={task}
              handleDelete={handleDeleteTask}
            />
          ))}
        </List>
      )}
      <UndoAlert
        open={!!deletedTask}
        id={deletedTask}
        handleClose={handleUndoDeleteTask}
      />
    </Box>
  );
};

export default TaskList;
