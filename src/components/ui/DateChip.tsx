import React from 'react';

// components
import { ShortChip } from './ShortChip';

// date
import { displayDate } from '@/utils/date';

// types
type Props = {
  dateString: string;
  noLabel?: string;
};

/**
 * Renders a MUI Chip component to display a date.
 *
 * Parse's the date value and formats it as 'Today', 'Tomorrow', or else the full date in 'mm/dd/yyyy' format.
 *
 * If no date is provided, it will display a custom text.
 */
export const DateChip: React.FC<Props> = ({
  dateString,
  noLabel = 'Unscheduled',
}) => {
  const d = new Date(dateString);
  const label = displayDate(d, noLabel);
  const chipColor = displayDate(d, noLabel, 'Past Due');
  let color: 'success' | 'primary' | 'error' | undefined;

  switch (chipColor) {
    case 'Today':
      color = 'success';
      break;
    case 'Tomorrow':
      color = 'primary';
      break;
    case 'Past Due':
      color = 'error';
      break;
    default:
      return <ShortChip label={label} variant="outlined" />;
  }

  return (
    <ShortChip color={color || undefined} label={label} variant="outlined" />
  );
};
