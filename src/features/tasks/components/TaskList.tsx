import React, { useState, useCallback, useMemo } from 'react';

// components
import { List, Typography, Box, Grid } from '@mui/material';
import { Task } from './Task';
import { TaskListSettings } from '@/components/TaskListSettings';
import { UndoAlert } from '@/components/ui/UndoAlert';

// store
import { useStore } from '@/store/useStore';

// types
import { TaskType } from '@/types';

type Props = {
  list: TaskType[];
  label: string;
};

// callback mapping
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
 * Renders the main list of tasks
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

  const sortedList = useMemo(() => {
    if (sortBy !== 'default') {
      return list.sort(sortCallbacks[sortBy as keyof typeof sortCallbacks]);
    } else {
      return [...list];
    }
  }, [sortBy, list]);

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
            <Task key={task.id} task={task} handleDelete={handleDeleteTask} />
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
