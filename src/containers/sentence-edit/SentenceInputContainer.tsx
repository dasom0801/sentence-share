/** @jsxImportSource @emotion/react */

import { useState } from 'react';
import { css } from '@emotion/react';
import { TextField, colors } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Button, MaxWidthWrapper, BookInfoSection } from '@/components';
import {
  SentenceEditDataProps,
  SentenceEditStep,
} from './SentenceEditContainer';
import useCreateSentence from './hooks/useCreateSentence';
import useUpdateSentence from './hooks/useUpdateSentence';

type SentenceInputContainerProps = Pick<
  SentenceEditDataProps,
  'sentenceId' | 'setActive' | 'setContent' | 'book' | 'content'
>;

const SentenceInputContainer = ({
  sentenceId,
  book,
  content,
  setContent,
  setActive,
}: SentenceInputContainerProps) => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState<boolean>(false);
  const { mutate: createSentence, isPending: isCreatePending } =
    useCreateSentence({
      onSuccess: (sentence) => {
        navigate(`/sentence/${sentence._id}`);
      },
    });

  const { mutate: updateSentence, isPending: isUpdatePending } =
    useUpdateSentence({
      onSuccess: (sentence) => {
        navigate(`/sentence/${sentence._id}`);
      },
    });

  const handleCancle = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    if (book && content) {
      if (sentenceId) {
        updateSentence({ content, book, id: sentenceId });
      } else {
        createSentence({ content, book });
      }
    }
  };

  const validateContent = () => {
    if (!content || content.length <= 5) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  const handleChangeActive = () => {
    setActive(SentenceEditStep.SEARCH);
  };

  return (
    <>
      {book && (
        <div css={bookStyles}>
          <BookInfoSection book={book}>
            <Button
              className=''
              variant='contained'
              color='secondary'
              size='small'
              onClick={handleChangeActive}
            >
              다시 선택하기
            </Button>
          </BookInfoSection>
        </div>
      )}

      <MaxWidthWrapper styles={styles}>
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
            disabled={isCreatePending || isUpdatePending}
            onClick={handleCancle}
          >
            취소
          </Button>
          <Button
            variant='contained'
            disabled={isCreatePending || isUpdatePending}
            onClick={handleSubmit}
          >
            {sentenceId ? '수정' : '등록'}
          </Button>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

const bookStyles = css`
  button {
    margin: 8px 0 0 0;
  }
`;

const styles = css`
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
