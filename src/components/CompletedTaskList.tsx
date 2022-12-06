import React from 'react';

// mui
import { List, Typography, Box } from '@mui/material';

// components
import { CompletedTask } from '../features/tasks';
import { TaskType } from '../types';

type Props = {
  list: TaskType[];
  label: string;
};

/**
 * A modified TaskList, for rendering completed tasks.
 */
export const CompletedTaskList: React.FC<Props> = ({
  list = [],
  label = 'Completed tasks',
}) => (
  <Box sx={{ pt: 1 }}>
    <Typography variant="h6" component="h2">
      {list.length <= 0 ? 'No completed tasks' : label}
    </Typography>
    {list.length > 0 && (
      <List>
        {list.map((task) => (
          <CompletedTask key={task.id} task={task} />
        ))}
      </List>
    )}
  </Box>
);

export default CompletedTaskList;
