import { blueGrey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const MUI_THEME = createTheme({
  palette: {
    secondary: {
      main: blueGrey[800],
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
