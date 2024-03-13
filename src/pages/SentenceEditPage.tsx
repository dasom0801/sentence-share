import { Helmet } from 'react-helmet-async';
import { SentenceEditContainer } from '@/containers';
import { useParams } from 'react-router-dom';

const SentenceEditPage = () => {
  const { id } = useParams();
  return (
    <>
      <Helmet>
        <title> {id ? '수정하기' : '작성하기'} - Sentence Share</title>
      </Helmet>
      <SentenceEditContainer />;
    </>
  );
};
export default SentenceEditPage;
