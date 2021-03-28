import { gql } from "@apollo/client";

export const FETCH_POSTS = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likesCount
      commentsCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;