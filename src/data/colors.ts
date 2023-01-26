import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  grey,
  blueGrey,
} from '@mui/material/colors';

export const colors = {
  red: red[500],
  pink: pink[500],
  purple: purple[500],
  'deep purple': deepPurple[500],
  indigo: indigo[500],
  blue: blue[500],
  'light blue': lightBlue[500],
  cyan: cyan[500],
  teal: teal[500],
  green: green[500],
  'light green': lightGreen[600],
  lime: lime[500],
  yellow: yellow[500],
  amber: amber[500],
  orange: orange[500],
  'deep orange': deepOrange[500],
  brown: brown[500],
  grey: grey[500],
  'blue grey': blueGrey[500],
};

export type ColorType = keyof typeof colors;

export const isColor = (color: unknown): color is ColorType => {
  return typeof color === 'string' && color in colors;
};
