import React, { FunctionComponent } from "react";
import { IPost } from "../../common/interfaces/post";
import { ThumbsUp, MessageSquare, User } from 'react-feather';
import styles from "./Post.module.scss";
import moment from "moment";

interface PostProps {
  post: IPost;
}

const Post: FunctionComponent<PostProps> = ({ post }) => {
  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <span className={styles.date}>
          {`${moment(post.createdAt).format("DD.MM.YY")}  ${moment(post.createdAt).format("HH:mm")}`}
        </span>
        <span className={styles.likes}>
          <ThumbsUp size={15} className={styles.likeIcon} /> {post.likesCount}
        </span>
      </div>

      <div className={styles.body}>
        <div className={styles.userContainer}>
          <User size={15} />
          <span className={styles.username}>{post.username}</span>
        </div>

        <div className={styles.main}>
          <div className={styles.text}>{post.body}</div>
          <div className={styles.comments}>
            {post.commentsCount} <MessageSquare size={15} className={styles.commentsIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;