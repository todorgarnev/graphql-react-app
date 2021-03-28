export interface INewPost {
  body: string;
}

export interface INewPostResponse {
  createPost: {
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
}