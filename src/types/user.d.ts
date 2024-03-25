type User = {
  _id: string;
  uid: string;
  name: string;
  provider: string;
  email: string;
  profileUrl: string;
  likes?: Sentence[];
  sentence?: Sentence[];
};
