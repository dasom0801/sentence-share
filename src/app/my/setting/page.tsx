import { MaxWidthWrapper } from '@/components/atoms';
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
  return (
    <main>
      <MaxWidthWrapper className={classes.wrapper}>
        <SettingUserImage />
        <SettingUserInfo />
        <Divider />
        <UserActionButtons />
      </MaxWidthWrapper>
    </main>
  );
}
