import React from 'react';

// components
import { Checkbox } from '@mui/material';

// types
type Props = {
  checked: boolean;
  onCheck: () => void;
  taskName: string;
  action?: 'Delete' | 'Restore';
};

/**
 * Renders the UI for a checkbox that can delete/restore a task.
 */
export const TaskCheckbox: React.FC<Props> = ({
  checked,
  onCheck,
  action = 'delete',
  taskName,
}) => (
  <Checkbox
    edge="end"
    onChange={onCheck}
    checked={checked}
    inputProps={{ 'aria-label': `${action} task: ${taskName}` }}
  />
);
