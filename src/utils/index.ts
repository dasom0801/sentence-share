import { createTheme } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const customTheme = () => {
  return createTheme({
    palette: {
      secondary: {
        main: blueGrey[800],
      },
    },
  });
};
