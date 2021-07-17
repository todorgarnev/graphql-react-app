import React, { FunctionComponent } from "react";
import { ThumbsUp, MessageSquare, User } from 'react-feather';
import { format } from "date-fns";
import { IPost } from "../../common/interfaces/post";
import styles from "./Post.module.scss";

interface PostProps {
  post: IPost;
}

const Post: FunctionComponent<PostProps> = ({ post }) => {
  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <span className={styles.date}>
          {format(new Date(post.createdAt), "dd.MM.yy HH:mm")}
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