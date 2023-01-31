import React, { useState, useCallback } from 'react';

// components
import { List, Typography, Box, Grid } from '@mui/material';
import { Task } from './Task';
import { UndoAlert } from '@/components/ui/UndoAlert';

// store
import { useSelector } from '@/app';

// settings
import { TaskListSettings } from '@/features/settings';

// types
import { selectSortedFilteredTaskIds, TaskType } from '../store/tasksSlice';

type Props = {
  label: string;
  filter: (task?: TaskType) => boolean;
};

/**
 * Renders the main list of tasks
 */
export const TaskList: React.FC<Props> = ({ label = 'To do', filter }) => {
  // const sortBy = useSelector(selectSortBy);
  const filteredTaskIds = useSelector(selectSortedFilteredTaskIds(filter));
  const listEmpty = filteredTaskIds.length <= 0;
  const [deletedTask, setDeletedTask] = useState<string>('');

  // task delete
  const handleDeleteTask = useCallback((id: string) => {
    setDeletedTask(id);
  }, []);

  const handleUndoDeleteTask = () => {
    setDeletedTask('');
  };

  return (
    <Box>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h6" component="h1">
            {label}
          </Typography>
        </Grid>
        <Grid item>
          <TaskListSettings />
        </Grid>
      </Grid>
      {listEmpty ? (
        <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>
          Your list is empty. Try adding a new task!
        </Typography>
      ) : (
        <List>
          {filteredTaskIds.map((id) => (
            <Task key={id} id={id} handleDelete={handleDeleteTask} />
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
