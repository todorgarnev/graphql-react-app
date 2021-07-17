import React, { FunctionComponent } from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { FETCH_POSTS } from "./graphql/queries";
import Utils from "../../common/utils/utils";
import { IPost, IPostsResponse } from "../../common/interfaces/post";
import Post from "../../components/post/Post";
import Loader from "../../components/loader/Loader";
import { Store } from "../../store/types";
import AddPost from "../../components/add-post/AddPost";
import styles from "./Home.module.scss";

const Home: FunctionComponent = () => {
  const user = useSelector((state: Store) => state.user);
  const { loading, data } = useQuery<IPostsResponse>(FETCH_POSTS);
  const posts: IPost[] = data && data.getPosts ? data.getPosts : [];

  return (
    <>
      {Utils.isNotNull(user) && <AddPost />}
      {
        loading ? <Loader /> :
          Utils.isArrayNotEmpty(posts) ? posts.map((post: IPost, index: number) => <Post key={index} post={post} />) :
            <div className={styles.noPosts}>No posts</div>
      }
    </>
  );
}

export default Home;