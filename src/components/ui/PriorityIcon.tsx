import React from 'react';

// icons
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import FlagIcon from '@mui/icons-material/Flag';

// data
import { indigo, purple, red } from '@mui/material/colors';

// types
import type { PriorityType } from '@/features/tasks';

const flagColors = [null, red[500], purple[500], indigo[500], indigo[500]];

type Props = {
  priority: PriorityType;
};

/**
 * Renders a flag icon to display a priority value. The icon's color changes based on the priority.
 * @param {number} priority - The priority.
 */
export const PriorityIcon: React.FC<Props> = ({ priority }) => {
  if (priority >= 4) {
    return <FlagOutlinedIcon sx={{ display: 'block' }} />;
  } else {
    return <FlagIcon sx={{ display: 'block', color: flagColors[priority] }} />;
  }
};
