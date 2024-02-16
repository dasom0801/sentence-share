import { ThemeProvider } from '@mui/material/styles';
import MuiButton, { type ButtonProps } from '@mui/material/Button';
import { customTheme } from '../../../utils';

const theme = customTheme();
const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <ThemeProvider theme={theme}>
      <MuiButton {...props} disableElevation>
        {children}
      </MuiButton>
    </ThemeProvider>
  );
};
export default Button;
