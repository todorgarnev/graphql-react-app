import React, { FunctionComponent } from "react";
import { useQuery } from "@apollo/client";
import styles from "./Home.module.scss";
import { IPost, IPostsData } from "./graphql/interfaces";
import { FETCH_POSTS_QUERY } from "./graphql/queries";
import Utils from "../../common/utils";

const Home: FunctionComponent = () => {
  const { loading, data } = useQuery<IPostsData>(FETCH_POSTS_QUERY);
  const posts: IPost[] = data && data.getPosts ? data.getPosts : [];

  return (
    <>
    {
        loading ? <div>Loading..</div> :
          Utils.isArrayNotEmpty(posts) && posts.map((post: IPost, index: number) => (
            <div key={index}>
              <div>body: {post.body}</div>
              <div>createdAt: {post.createdAt}</div>
              <div>creator: {post.username}</div>
              <div>likes: {post.likesCount}</div>
              <div>comments: {post.commentsCount}</div>
            </div>
          ))
    }
    </>
  );
}

export default Home;