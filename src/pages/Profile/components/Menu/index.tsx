import { Tab, Tabs, ThemeProvider } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { customTheme } from '../../../../utils';

type MenuItem = {
  label: string;
  path: string;
};

type MenuProps = {
  menus: MenuItem[];
};

const theme = customTheme();

const Menu = ({ menus }: MenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleOnChange = (event: React.SyntheticEvent, value: string) => {
    navigate(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Tabs
        className='border-solid border-b border-secondary-200'
        textColor='secondary'
        indicatorColor='secondary'
        value={location.pathname}
        onChange={handleOnChange}
      >
        {menus.map(({ label, path }) => (
          <Tab key={path} label={label} value={path} />
        ))}
      </Tabs>
    </ThemeProvider>
  );
};
export default Menu;
