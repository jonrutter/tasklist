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
import { selectFilteredTaskIds, TaskType } from '../store/tasksSlice';

type Props = {
  label: string;
  filter: (task?: TaskType) => boolean;
};

// callback mapping
// const sortCallbacks = {
//   alphabetically: (a: TaskType, b: TaskType) => (a.name < b.name ? -1 : 1),
//   'due date': (a: TaskType, b: TaskType) => {
//     if (!b.due) return -1;
//     if (!a.due) return 1;
//     return a.due.getTime() - b.due.getTime();
//   },
//   priority: (a: TaskType, b: TaskType) => a.priority - b.priority,
//   'date added': () => 0,
//   default: () => 0,
// };

/**
 * Renders the main list of tasks
 */
export const TaskList: React.FC<Props> = ({ label = 'To do', filter }) => {
  // const sortBy = useSelector(selectSortBy);
  const filteredTaskIds = useSelector(selectFilteredTaskIds(filter));
  const listEmpty = filteredTaskIds.length <= 0;
  const [deletedTask, setDeletedTask] = useState<string>('');
  console.log(filteredTaskIds);

  // task delete
  const handleDeleteTask = useCallback((id: string) => {
    setDeletedTask(id);
  }, []);

  const handleUndoDeleteTask = () => {
    setDeletedTask('');
  };

  // const sortedList = useMemo(() => {
  //   if (sortBy !== 'default') {
  //     return list.sort(sortCallbacks[sortBy as keyof typeof sortCallbacks]);
  //   } else {
  //     return [...list];
  //   }
  // }, [sortBy, list]);

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
