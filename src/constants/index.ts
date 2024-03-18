import { colors, createTheme } from '@mui/material';

export const DEFAULT_PROFILE = '/images/blank-profile.png';

export const MUI_THEME = createTheme({
  palette: {
    secondary: {
      main: colors.blueGrey[800],
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});

export const apiRoutes = {
  user: '/api/user/me',
  sentences: '/api/user/:userId/sentence',
};

export const pageRoutes = {
  edit: '/edit/sentence',
};
