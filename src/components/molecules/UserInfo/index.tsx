import { DEFAULT_PROFILE } from '@/constants';
import type { User } from '@/types';
import Image from 'next/image';
import classes from './UserInfo.module.scss';

type UserInfoProps = {
  user: Partial<User>;
  className?: string;
};

export default function UserInfo({ user, className }: UserInfoProps) {
  return (
    <div className={`${classes.userInfo} ${className || ''}`}>
      <Image
        width={30}
        height={30}
        alt={user.name || ''}
        src={user.profileUrl || DEFAULT_PROFILE}
      />
      <div className="name">{user.name}</div>
    </div>
  );
}
