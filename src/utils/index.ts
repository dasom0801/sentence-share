import { createTheme } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { clsx, type ClassValue } from 'clsx';
import type { ToastOptions } from 'react-toastify';
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

// React toast의 기본 설정
export const getToastConfig = (): Partial<ToastOptions> => {
  return {
    position: 'top-center',
    hideProgressBar: true,
    pauseOnFocusLoss: false,
  };
};
