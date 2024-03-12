/** @jsxImportSource @emotion/react */

import { useContext, useState } from 'react';
import { SentenceEditContenxt } from './SentenceEditContainer';
import { BookListItem, Button, MaxWidthWrapper } from '@/components';
import { css } from '@emotion/react';
import { TextField, colors } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useCreateSentence from './hooks/useCreateSentence';

const SentenceInputContainer = () => {
  const navigate = useNavigate();
  const { book, setActive } = useContext(SentenceEditContenxt);
  const [content, setContent] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);
  const { mutate, isPending } = useCreateSentence({
    onSuccess: (sentence) => {
      navigate(`/sentence/${sentence._id}`);
    },
  });

  const handleCancle = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    if (book && content) {
      mutate({ content, book });
    }
  };

  const validateContent = () => {
    if (!content || content.length <= 5) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  return (
    <MaxWidthWrapper styles={styles}>
      <div className='selected-book'>
        {book && <BookListItem book={book} />}
        <Button
          className=''
          variant='outlined'
          color='secondary'
          size='small'
          onClick={() => setActive('search')}
        >
          다시 선택하기
        </Button>
      </div>

      <TextField
        className='textarea'
        multiline
        placeholder='내용을 입력해주세요.'
        value={content}
        rows={4}
        onChange={(e) => setContent(e.target.value)}
        onBlur={validateContent}
        color={showError ? 'error' : 'primary'}
      />
      {showError && (
        <span className='error-text'>다섯 글자 이상 입력해 주세요. </span>
      )}

      <div className='actions'>
        <Button
          variant='outlined'
          color='secondary'
          disabled={isPending}
          onClick={handleCancle}
        >
          취소
        </Button>
        <Button variant='contained' disabled={isPending} onClick={handleSubmit}>
          등록
        </Button>
      </div>
    </MaxWidthWrapper>
  );
};

const styles = css`
  padding-top: 36px;
  padding-bottom: 36px;

  .selected-book {
    button:last-of-type {
      margin: 12px 0 0 0;
      width: 100%;
    }
  }

  .textarea {
    width: 100%;
    margin: 24px 0 0 0;
  }

  .error-text {
    font-size: 14px;
    color: ${colors.red[500]};
  }
  .actions {
    display: flex;
    gap: 8px;
    margin: 12px 0 0 0;
    button {
      flex: 1;
    }
  }
`;
export default SentenceInputContainer;
