/** @jsxImportSource @emotion/react */

import { memo, useCallback, useState } from 'react';
import { css } from '@emotion/react';
import { Button, TextField, colors } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { MaxWidthWrapper, BookInfoSection, AlertDialog } from '@/components';
import {
  SentenceEditDataProps,
  SentenceEditStep,
} from './SentenceEditContainer';
import { useCreateSentence, useUpdateSentence } from './hooks';

type SentenceInputProps = Pick<
  SentenceEditDataProps,
  'sentenceId' | 'setActive' | 'setContent' | 'book' | 'content'
>;

const SentenceInput: React.FC<SentenceInputProps> = memo(
  function SentenceInput({ sentenceId, book, content, setContent, setActive }) {
    const navigate = useNavigate();
    const [showError, setShowError] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const { mutate: createSentence, isPending: isCreatePending } =
      useCreateSentence();

    const { mutate: updateSentence, isPending: isUpdatePending } =
      useUpdateSentence();

    const handleCancel = useCallback(() => {
      navigate(-1);
    }, [navigate]);

    const handleSubmit = useCallback(() => {
      if (book && content) {
        if (sentenceId) {
          updateSentence({ content, book, id: sentenceId });
        } else {
          createSentence({ content, book });
        }
      }
      setShowAlert(false);
    }, [
      book,
      content,
      updateSentence,
      createSentence,
      setShowAlert,
      sentenceId,
    ]);

    const validateContent = useCallback(() => {
      if (!content || content.length <= 5) {
        setShowError(true);
      } else {
        setShowError(false);
      }
    }, [setShowError, content]);

    const handleChangeActive = useCallback(() => {
      setActive(SentenceEditStep.SEARCH);
    }, [setActive]);

    const handleShowAlert = useCallback(() => {
      setShowAlert(true);
    }, [setShowAlert]);

    return (
      <>
        {book && (
          <div css={bookStyles}>
            <BookInfoSection book={book}>
              <Button
                className=""
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleChangeActive}
              >
                다시 선택하기
              </Button>
            </BookInfoSection>
          </div>
        )}

        <MaxWidthWrapper styles={styles}>
          <TextField
            className="textarea"
            multiline
            placeholder="내용을 입력해주세요."
            value={content}
            rows={4}
            onChange={(e) => setContent(e.target.value)}
            onBlur={validateContent}
            color={showError ? 'error' : 'primary'}
          />
          {showError && (
            <span className="error-text">다섯 글자 이상 입력해 주세요. </span>
          )}

          <div className="actions">
            <Button
              variant="outlined"
              color="secondary"
              disabled={isCreatePending || isUpdatePending}
              onClick={handleCancel}
            >
              취소
            </Button>
            <Button
              variant="contained"
              disabled={isCreatePending || isUpdatePending}
              onClick={handleShowAlert}
            >
              {sentenceId ? '수정' : '등록'}
            </Button>
          </div>
        </MaxWidthWrapper>

        <AlertDialog
          open={showAlert}
          content={
            sentenceId
              ? '내용을 수정하시겠습니까?'
              : '작성한 내용을 등록하시겠습니까?'
          }
          confirmLabel={sentenceId ? '수정' : '등록'}
          handleClose={() => setShowAlert(false)}
          handleConfirm={handleSubmit}
        />
      </>
    );
  },
);

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
export default SentenceInput;
