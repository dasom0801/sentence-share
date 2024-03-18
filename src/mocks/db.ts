import { factory, primaryKey } from '@mswjs/data';

const mockData = factory({
  user: {
    _id: primaryKey(String),
    uid: String,
    name: String,
    provider: String,
    email: String,
    profileUrl: String,
    likes: Array,
    sentence: Array,
  },
});

// mockData.user.create({
//   ...MockUser,
//   sentence: new Array(10).fill(MockSentence),
// });

export default mockData;
