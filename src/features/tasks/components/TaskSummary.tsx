import React from 'react';

// components
import { Typography, Grid } from '@mui/material';
import { DateChip } from '@/components/ui/DateChip';
import { PriorityIcon } from '@/components/ui/PriorityIcon';
import { LabelDisplay as Label } from '@/features/labels';

// types
import { PriorityType, LabelType } from '@/types';

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

const TaskLabel: React.FC<{ label?: LabelType }> = ({ label }) =>
  label ? (
    <Grid item>
      <Label label={label} />
    </Grid>
  ) : null;

/* Task Summary */

type Props = {
  description: string;
  due?: Date;
  priority: PriorityType;
  label?: LabelType;
};

export const TaskSummary: React.FC<Props> = ({
  description,
  due,
  priority,
  label,
}) => (
  <>
    <TaskDescription description={description} />
    <Grid container spacing={2} alignItems="center">
      <TaskDueDate due={due} />
      <TaskLabel label={label} />
      <TaskPriority priority={priority} />
    </Grid>
  </>
);
