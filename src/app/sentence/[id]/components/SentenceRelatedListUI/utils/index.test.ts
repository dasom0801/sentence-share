import { MockSentence } from '@/mocks/data';
import { Sentence } from '@/types';
import { excludeSentenceFromList } from '.';

describe('excludeSentenceFromList', () => {
  const targetId = 'target-sentence-id';
  const mockSentences: Sentence[] = [
    { ...MockSentence, _id: targetId },
    ...Array.from({ length: 2 }, (_, id) => ({
      ...MockSentence,
      _id: `sentence-${id.toString()}`,
    })),
  ];

  it('지정된 ID의 문장을 제외하고 반환한다', () => {
    const result = excludeSentenceFromList(mockSentences, targetId);
    expect(result).toHaveLength(2);
    expect(result.map((s) => s._id)).toEqual(['sentence-0', 'sentence-1']);
    expect(result.find((s) => s._id === targetId)).toBeUndefined();
  });

  it('존재하지 않는 ID를 제외하려 하면 원본 배열과 같은 길이를 반환한다', () => {
    const result = excludeSentenceFromList(mockSentences, 'test-sentence-id');
    expect(result).toHaveLength(3);
    expect(result).toEqual(mockSentences);
  });

  it('빈 배열을 전달하면 빈 배열을 반환한다', () => {
    const result = excludeSentenceFromList([], 'test-sentence-id');

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });
});
