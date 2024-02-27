import { factory, primaryKey } from '@mswjs/data';
import { MockUser } from '../index.mock';

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

mockData.user.create(MockUser);

export default mockData;
