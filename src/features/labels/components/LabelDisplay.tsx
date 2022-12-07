import React from 'react';

// components
import { Grid, Typography } from '@mui/material';

// icons
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

// data
import { colors } from '@/data/colors';

// types
import { LabelType } from '@/types';

type Props = {
  label: LabelType;
};

/**
 * Renders a label, with a colored tag.
 */
export const LabelDisplay: React.FC<Props> = ({ label }) => {
  const { color, name } = label;
  return (
    <Grid container alignItems="center">
      <Grid item sx={{ mr: 1, height: 'auto' }}>
        <LocalOfferIcon
          fontSize="small"
          sx={{
            display: 'block',
            color: color ? colors[color as keyof typeof colors] : 'grey',
          }}
        />
      </Grid>
      <Grid item>
        <Typography variant="body2">{name}</Typography>
      </Grid>
    </Grid>
  );
};
