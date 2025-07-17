export const sentence = {
  _id: '1',
  content:
    '각자의 사정을 모두 이해 할 필요는 없지 근데 너와 나의 사정은 다를 수 있다는 걸 아는게 중요한거야.',
  likes: 1,
  createdAt: '2024-02-29T06:36:59.220+00:00',
  author: {
    _id: '1',
    uid: 'uid',
    name: 'user name',
    provider: 'google.com',
    email: 'user@gmail.com',
    profileUrl: '/images/blank-profile.png',
  },
  book: {
    _id: '1',
    title: '별일 아닌 것들로 별일이 됐던 어느 밤',
    coverUrl:
      'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1652076%3Ftimestamp%3D20190131131541',
    publisher: '자화상',
    author: ['민경희'],
    isbn: '1188345052 9791188345052',
  },
  isLiked: false,
};
