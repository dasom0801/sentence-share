import { getUser } from '@/lib/api';
import MaxWidthWrapper from '@components/common/max-width-wrapper';
import { Divider } from '@mui/material';
import { Metadata } from 'next';
import SettingUserImage from './_components/setting-user-image';
import SettingUserInfo from './_components/setting-user-info';
import UserActionButtons from './_components/user-action-buttons';
import classes from './page.module.scss';

export const metadata: Metadata = {
  title: '설정 - Sentence Share',
};

export default async function SettingPage() {
  const { data: currentUser } = await getUser();

  return (
    <main>
      <MaxWidthWrapper className={classes.wrapper}>
        <SettingUserImage user={currentUser} />
        <SettingUserInfo user={currentUser} />
        <Divider />
        <UserActionButtons />
      </MaxWidthWrapper>
      ;
    </main>
  );
}
