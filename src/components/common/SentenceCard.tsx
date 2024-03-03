/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { Avatar } from '@mui/material';
import { blueGrey, red } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import Button from './Button';
import { BsSuitHeart } from 'react-icons/bs';
import { BsSuitHeartFill } from 'react-icons/bs';

type SentenceCardProps = {
  book: Book;
  sentence: Sentence;
  author: User;
  isLiked: boolean;
  toggleLike: () => void;
};

const SentenceCard = ({
  book,
  sentence,
  author,
  isLiked,
  toggleLike,
}: SentenceCardProps) => {
  return (
    <div
      css={css`
        ${container};
        background-image: url(${book.coverUrl});
      `}
    >
      <div className='backdrop'>
        <div className='header'>
          <Avatar
            sx={{ height: '30px', width: '30px' }}
            alt={author.name}
            src={author.profileUrl || '/images/blank-profile.png'}
          />
          <div className='name'>{author.name}</div>
          <time>{sentence.createdAt.split('T')[0]}</time>
        </div>

        <div className='sentence'>
          <p>{sentence.content}</p>
        </div>
        <Link className='book-info' to={`/book/${book._id}`}>
          <div>
            <div className='title'>{book.title}</div>
            <div>{book.author.join(',')}</div>
          </div>
          <img src={book.coverUrl} alt={book.title} />
        </Link>
        <div className='like-button'>
          <Button color='secondary' size='large'>
            <span>좋아요</span>
            {isLiked ? <BsSuitHeartFill color={red[500]} /> : <BsSuitHeart />}
          </Button>
        </div>
      </div>
    </div>
  );
};

const textOverflowHidden = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const container = css`
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  overflow: hidden;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  // backdrop-filter에 overflow hidden 적용하기 위해서 추가
  -webkit-filter: blur(0px);

  .backdrop {
    backdrop-filter: blur(30px);
    background-color: rgba(255, 255, 255, 0.65);
    overflow: hidden;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 16px;
    color: ${blueGrey[600]};
    background-color: white;

    .name {
      flex: 1;
      ${textOverflowHidden};
    }

    time {
      color: ${blueGrey[600]};
      font-size: 12px;
    }
  }

  .sentence {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    padding: 0 16px;

    p {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      color: ${blueGrey[900]};
      font-size: 24px;
      font-weight: 500;
      text-align: center;
    }
  }

  .book-info {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    height: 100px;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.4);

    &:hover {
      text-decoration: underline;
      background-color: rgba(255, 255, 255, 0.55);
      img {
        transform: scale(1.03);
        transition: all 0.1s ease-in;
      }
    }

    > div {
      flex: 1;
      overflow: hidden;

      .title {
        color: ${blueGrey[900]};
        font-weight: 500;
        font-size: 18px;
      }

      div {
        color: ${blueGrey[600]};
        font-size: 16px;
        ${textOverflowHidden};
      }
    }

    img {
      position: relative;
      top: 16px;
      width: auto;
      height: 170%;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
  }

  .like-button {
    background: white;

    button {
      display: flex;
      gap: 4px;
      width: 100%;
      font-size: 16px;
    }
  }
`;

export default SentenceCard;
