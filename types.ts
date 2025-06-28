// types.ts
export type Post = {
  id: number;
  user_id: number;
  title: string;
  body: string;
};

export type RootStackParamList = {
  Home: undefined;
  PostDetails: { post: Post };
};
