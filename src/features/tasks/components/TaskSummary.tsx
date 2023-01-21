import React from 'react';

// components
import { Typography, Grid } from '@mui/material';
import { DateChip } from '@/components/ui/DateChip';
import { PriorityIcon } from '@/components/ui/PriorityIcon';
import { Tag } from '@/features/tags';

// types
import type { PriorityType } from '../store/tasksSlice';

/* Child Components */

const TaskDescription: React.FC<{ description?: string }> = ({ description }) =>
  description && typeof description === 'string' ? (
    <Typography variant="body2" sx={{ wordBreak: 'break-word', mb: 1 }}>
      {description.length > 100
        ? description.slice(0, 90) + '...'
        : description}
    </Typography>
  ) : null;

const TaskDueDate: React.FC<{ due?: string }> = ({ due }) =>
  due ? (
    <Grid item>
      <DateChip dateString={due} />
    </Grid>
  ) : null;

const TaskPriority: React.FC<{ priority?: PriorityType }> = ({ priority }) =>
  typeof priority === 'number' ? (
    <Grid item>
      <PriorityIcon priority={priority} />
    </Grid>
  ) : null;

const TaskTag: React.FC<{ tagId?: string }> = ({ tagId }) => (
  <Grid item>
    <Tag id={tagId} />
  </Grid>
);

/* Task Summary */

type Props = {
  description: string;
  due?: string;
  priority: PriorityType;
  tagId?: string;
};

export const TaskSummary: React.FC<Props> = ({
  description,
  due,
  priority,
  tagId,
}) => (
  <>
    <TaskDescription description={description} />
    <Grid container spacing={2} alignItems="center">
      <TaskDueDate due={due} />
      <TaskTag tagId={tagId} />
      <TaskPriority priority={priority} />
    </Grid>
  </>
);
