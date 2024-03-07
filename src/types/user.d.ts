type User = {
  _id: string;
  uid: string;
  name: string;
  provider: string;
  email: string;
  profileUrl: string;
  likes?: Sentence[]; // TODO: Sentence[]
  sentence?: Sentence[]; // TODO: Sentence[]
};
