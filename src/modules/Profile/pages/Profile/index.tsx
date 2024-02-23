import { Outlet } from 'react-router-dom';
import { ProfileMenu } from '../../components';
import { MaxWidthWrapper } from '../../../../components';

const menus = [
  { label: '내가 공유한 문장', path: '/profile/sentence' },
  { label: '내가 좋아한 문장', path: '/profile/likes' },
  { label: '설정', path: '/profile/setting' },
];

const Profile = () => {
  return (
    <MaxWidthWrapper>
      <ProfileMenu menus={menus} />
      <Outlet />
    </MaxWidthWrapper>
  );
};
export default Profile;
