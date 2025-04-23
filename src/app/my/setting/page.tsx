import { MaxWidthWrapper } from '@/components/atoms';
import { getUser } from '@/lib/api';
import { Divider } from '@mui/material';
import { Metadata } from 'next';

import {
  SettingUserImage,
  SettingUserInfo,
  UserActionButtons,
} from './components';
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
