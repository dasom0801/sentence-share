import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import SentenceTextCard from '../SentenceTextCard';
import { MockSentence } from '@/mocks/data';

it('enableLink props가 true이면 sentence/:id 주소를 갖는 Link가 그려진다.', () => {
  render(<SentenceTextCard sentence={MockSentence} enableLink={true} />, {
    wrapper: BrowserRouter,
  });
  const linkItem = screen.getByRole('link');
  expect(linkItem).toBeInTheDocument();
  expect(linkItem).toHaveAttribute('href', `/sentence/${MockSentence._id}`);
});

it('enableLink props가 false이면 Link 요소가 그려지지 않는다.', () => {
  render(<SentenceTextCard sentence={MockSentence} enableLink={false} />);
  const linkItem = screen.queryByRole('link');
  expect(linkItem).not.toBeInTheDocument();
});
