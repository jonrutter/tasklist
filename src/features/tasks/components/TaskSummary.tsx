import React from 'react';

// components
import { Typography, Grid } from '@mui/material';
import { DateChip } from '@/components/ui/DateChip';
import { PriorityIcon } from '@/components/ui/PriorityIcon';
import { Tag } from '@/features/tags';

// types
import type { PriorityType } from '../store/tasksSlice';
import type { TagType } from '@/features/tags';

/* Child Components */

const TaskDescription: React.FC<{ description?: string }> = ({ description }) =>
  description && typeof description === 'string' ? (
    <Typography variant="body2" sx={{ wordBreak: 'break-word', mb: 1 }}>
      {description.length > 100
        ? description.slice(0, 90) + '...'
        : description}
    </Typography>
  ) : null;

const TaskDueDate: React.FC<{ due?: Date }> = ({ due }) =>
  due ? (
    <Grid item>
      <DateChip date={due} />
    </Grid>
  ) : null;

const TaskPriority: React.FC<{ priority?: PriorityType }> = ({ priority }) =>
  typeof priority === 'number' ? (
    <Grid item>
      <PriorityIcon priority={priority} />
    </Grid>
  ) : null;

const TaskTag: React.FC<{ tag?: TagType }> = ({ tag }) =>
  tag ? (
    <Grid item>
      <Tag tag={tag} />
    </Grid>
  ) : null;

/* Task Summary */

type Props = {
  description: string;
  due?: Date;
  priority: PriorityType;
  tag?: TagType;
};

export const TaskSummary: React.FC<Props> = ({
  description,
  due,
  priority,
  tag,
}) => (
  <>
    <TaskDescription description={description} />
    <Grid container spacing={2} alignItems="center">
      <TaskDueDate due={due} />
      <TaskTag tag={tag} />
      <TaskPriority priority={priority} />
    </Grid>
  </>
);
