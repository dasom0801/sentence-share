import { Tab, Tabs, ThemeProvider } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { customTheme } from '../../../../utils';

type MenuItem = {
  label: string;
  path: string;
};

type ProfileMenuProps = {
  menus: MenuItem[];
};

const theme = customTheme();

const ProfileMenu = ({ menus }: ProfileMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleOnChange = (event: React.SyntheticEvent, value: string) => {
    navigate(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Tabs
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
export default ProfileMenu;
