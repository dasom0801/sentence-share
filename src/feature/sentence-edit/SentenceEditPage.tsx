import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import SentenceEditContainer from './SentenceEditContainer';

const SentenceEditPage: React.FC = () => {
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
