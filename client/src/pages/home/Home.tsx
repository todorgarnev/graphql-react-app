import React, { FunctionComponent } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "./graphql/queries";
import Utils from "../../common/utils/utils";
import { IPost, IPostsData } from "../../common/interfaces/post";
import Post from "../../components/post/Post";
import styles from "./Home.module.scss";

const Home: FunctionComponent = () => {
  const { loading, data } = useQuery<IPostsData>(FETCH_POSTS_QUERY);
  const posts: IPost[] = data && data.getPosts ? data.getPosts : [];

  return (
    <>
      {
        loading ? <div>Loading..</div> :
          Utils.isArrayNotEmpty(posts) && posts.map((post: IPost, index: number) => (
            <Post key={index} post={post} />
          ))
      }
    </>
  );
}

export default Home;