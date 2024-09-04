import Image from 'next/image';
import classes from './index.module.scss';
import blankProfile from '../../../../public/images/blank-profile.png';

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
        src={user.profileUrl || blankProfile}
      />
      <div className="name">{user.name}</div>
    </div>
  );
}
