/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { colors } from '@mui/material';

import { textOverflowHidden } from '@/styles';
import { memo } from 'react';
import blankProfile from '../../../public/images/blank-profile.png';
import Image from 'next/image';

type UserInfoProps = {
  user: Partial<User>;
  className?: string;
};

const UserInfo: React.FC<UserInfoProps> = memo(function UserInfo({
  user,
  className,
}) {
  return (
    <div className={className} css={styles}>
      <Image
        src={user.profileUrl || blankProfile}
        alt={user.name || ''}
        height={30}
        width={30}
        style={{ borderRadius: '50%' }}
      />
      <div className="name">{user.name}</div>
    </div>
  );
});

const styles = css`
  display: flex;
  align-items: center;
  gap: 12px;

  .name {
    flex: 1;
    color: ${colors.blueGrey[600]};
    ${textOverflowHidden};
  }
`;

export default UserInfo;
