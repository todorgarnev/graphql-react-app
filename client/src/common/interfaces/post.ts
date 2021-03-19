export interface IPost {
  id: string;
  body: string;
  createdAt: string;
  username: string;
  likesCount: number;
  commentsCount: number;
  comments: {
    id: string;
    username: string;
    createdAt: string;
    body: string;
  };
}

export interface IPostsData {
  getPosts: IPost[];
}