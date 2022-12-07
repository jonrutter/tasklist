import React from 'react';

// components
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// icons
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';

// colors
import { colors, ColorType, isColor } from '@/data/colors';

// types
import type { SelectChangeEvent } from '@mui/material';

const capitalize = (str: string) =>
  str[0].toUpperCase() + str.slice(1).toLowerCase();

type Props = {
  color: ColorType | '';
  setColor: React.Dispatch<React.SetStateAction<ColorType | ''>>;
};

/**
 * A form control to handle picking a color.
 */
export const ColorField: React.FC<Props> = ({ color, setColor }) => {
  const handleChange = (e: SelectChangeEvent) => {
    const testColor = e.target.value;
    if (isColor(testColor) || testColor === '') {
      setColor(testColor);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="color-dropdown-label">Tag Color</InputLabel>
      <Select
        labelId="color-dropdown-label"
        id="color-dropdown"
        value={color}
        onChange={handleChange}
        label="Tag Color"
        sx={{
          '& .MuiSelect-select': { display: 'flex' },
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: '250px',
            },
          },
        }}
      >
        <MenuItem value={''}>No color</MenuItem>
        {Object.keys(colors).map((color, index) => (
          <MenuItem key={index} value={color}>
            <SquareRoundedIcon
              sx={{ color: colors[color as keyof typeof colors], mr: 2 }}
            />{' '}
            {capitalize(color)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
