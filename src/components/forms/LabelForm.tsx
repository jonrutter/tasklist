import React, { useState } from 'react';

// components
import { ColorField } from './ColorField';

// utils
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { ColorType } from '../../data/colors';
import { LabelIncompleteType } from '../../types';

type DefaultValues = {
  name?: string;
  color?: ColorType;
};

type Props = {
  onSubmit: (data: LabelIncompleteType) => void;
  onClose: () => void;
  defaultValues?: DefaultValues;
  title?: string;
};

/**
 * Renders a form to create/update a label.
 */
export const LabelForm: React.FC<Props> = ({
  onSubmit,
  onClose,
  defaultValues,
  title = 'Create Label',
}) => {
  const [name, setName] = useState<string>(defaultValues?.name || '');
  // default color should be an empty string instead of undefined, to avoid initializing the color field as an uncontrolled component. then convert empty colors to undefined on submission
  const [color, setColor] = useState<ColorType | ''>(
    defaultValues?.color || ''
  );

  const formValid = () => {
    return !!name;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formValid()) {
      onSubmit({ name, color: color === '' ? undefined : color });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Paper sx={{ p: 2 }}>
        <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <TextField
          label="Name"
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
          fullWidth
          sx={{ mb: 2 }}
        />
        <ColorField color={color} setColor={setColor} />
        <Grid container sx={{ mt: 2 }} justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button variant="outlined" color="error" onClick={onClose}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              disableElevation
              disabled={!formValid()}
              type="submit"
              color="success"
            >
              Add Label
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default LabelForm;
