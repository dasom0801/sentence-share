/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { Avatar, colors } from '@mui/material';

import { textOverflowHidden } from '@/styles';
import { memo } from 'react';

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
      <Avatar
        sx={{ height: '30px', width: '30px' }}
        alt={user.name}
        src={user.profileUrl || '/images/blank-profile.png'}
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
