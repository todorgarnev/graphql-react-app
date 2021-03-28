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
    commentCount: number;
  }
}