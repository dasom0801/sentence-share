import MaxWidthWrapper from '@components/common/max-width-wrapper';
import classes from './page.module.scss';
import { Metadata } from 'next';
import { getUser } from '@/lib/api';
import UserActionButtons from './_components/user-action-buttons';
import SettingUserImage from './_components/setting-user-image';
import SettingUserInfo from './_components/setting-user-info';
import { Divider } from '@mui/material';

export const metadata: Metadata = {
  title: '설정 - Sentence Share',
};

export default async function SettingPage() {
  // TODO: zustand 사용하기
  const currentUser = await getUser();

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
