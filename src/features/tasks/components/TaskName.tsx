import React from 'react';

// components
import { Typography } from '@mui/material';

// types
type Props = {
  name: string;
};

/**
 * Renders the task's name.
 */
export const TaskName: React.FC<Props> = ({ name }) => (
  <Typography
    variant="subtitle1"
    component="h3"
    gutterBottom
    sx={{ wordBreak: 'break-word' }}
  >
    {name}
  </Typography>
);
