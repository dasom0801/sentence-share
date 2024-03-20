/** @jsxImportSource @emotion/react */

import { AlertDialog, SentenceCard } from '@/components';
import { usePagination } from '@/lib/hooks';
import { gridContainer, pagination } from '@/styles';
import { Button, Pagination, css } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type UserSentenceListProps = {
  sentences: PaginationResult<Sentence>;
  handleDelete: (sentence: Sentence) => void;
};

const UserSentenceList = ({
  sentences,
  handleDelete,
}: UserSentenceListProps) => {
  const { page, setPage } = usePagination();
  const [deleteTarget, setDeleteTarget] = useState<Sentence | null>(null);
  const handleDeleteSentence = () => {
    if (deleteTarget) {
      handleDelete(deleteTarget);
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <ul css={gridContainer}>
        {sentences?.list.map((sentence) => {
          return (
            <li key={sentence._id}>
              <SentenceCard sentence={sentence}>
                <div css={buttons}>
                  <Button
                    component={Link}
                    to={`/edit/sentence/${sentence._id}`}
                    color='secondary'
                    size='large'
                    sx={{ borderRadius: 0 }}
                  >
                    수정
                  </Button>
                  <Button
                    variant='contained'
                    color='secondary'
                    size='large'
                    sx={{ borderRadius: 0 }}
                    onClick={() => setDeleteTarget(sentence)}
                  >
                    삭제
                  </Button>
                </div>
              </SentenceCard>
            </li>
          );
        })}
      </ul>
      <div css={pagination}>
        <Pagination
          count={sentences?.pageTotal || 1}
          shape='rounded'
          page={page}
          onChange={(_, page) => setPage(page)}
        />
      </div>
      <AlertDialog
        content='문장을 삭제하시겠습니까?'
        open={!!deleteTarget}
        handleClose={() => setDeleteTarget(null)}
        handleConfirm={() => handleDeleteSentence()}
      />
    </>
  );
};

const buttons = css`
  display: flex;
  > * {
    flex: 1;
  }
`;

export default UserSentenceList;
