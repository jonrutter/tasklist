import React from 'react';

// components
import { Chip } from '@mui/material';

// types
import type { ChipTypeMap, ChipProps } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

/**
 * A custom MUI Chip component
 */
export const ShortChip: OverridableComponent<
  ChipTypeMap<Record<string, unknown>, 'div'>
> = (props: ChipProps) => (
  <Chip {...props} sx={{ '&.MuiChip-root': { height: '24px' } }} />
);
