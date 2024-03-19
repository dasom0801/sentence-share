/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { Avatar, colors } from '@mui/material';

import { textOverflowHidden } from '@/styles';

type UserInfoProps = {
  user: Partial<User>;
  className?: string;
};

const UserInfo = ({ user, className }: UserInfoProps) => {
  return (
    <div className={className} css={styles}>
      <Avatar
        sx={{ height: '30px', width: '30px' }}
        alt={user.name}
        src={user.profileUrl || '/images/blank-profile.png'}
      />
      <div className='name'>{user.name}</div>
    </div>
  );
};

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
