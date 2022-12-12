import React from 'react';

// components
import { Grid, Typography } from '@mui/material';

// icons
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

// data
import { colors } from '@/data/colors';

// types
import type { TagType } from '../store/tagsSlice';

type Props = {
  tag: TagType;
};

/**
 * Renders a tag, with a colored tag.
 */
export const Tag: React.FC<Props> = ({ tag }) => {
  const { color, name } = tag;
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
