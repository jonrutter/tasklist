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
