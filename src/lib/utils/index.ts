import { createTheme } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// MUI 컴포넌트 theme 설정
export const customTheme = () => {
  return createTheme({
    palette: {
      secondary: {
        main: blueGrey[800],
      },
    },
  });
};

export const getBearerToken = () => {
  const token = localStorage.getItem('token');
  const authorization = token ? `Bearer ${token}` : null;
  return authorization;
};
