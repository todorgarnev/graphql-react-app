import React, { FunctionComponent, FormEvent, useState, ChangeEvent } from "react";
import { useMutation } from "@apollo/client";
import { PlusCircle } from "react-feather";
import Button from "../button/Button";
import Input from "../input/Input";
import { INewPost, INewPostResponse } from "../../common/interfaces/new-post";
import { CREATE_POST } from "./graphql/mutations";
import Utils from "../../common/utils/utils";
import Errors from "../errors/Errors";
import { FETCH_POSTS } from "../../pages/home/graphql/queries";
import styles from "./AddPost.module.scss";
import { IPost, IPostsResponse } from "../../common/interfaces/post";

const AddPost: FunctionComponent = () => {
  const [formValue, setFormValue] = useState<INewPost>({ body: "" });
  const [error, setError] = useState<string>("");
  const [createPost] = useMutation<INewPostResponse, INewPost>(CREATE_POST, {
    update(proxy, createdPostData) {
      const data: IPostsResponse | null = proxy.readQuery({ query: FETCH_POSTS });

      if (createdPostData.data) {
        const updatedPosts: IPostsResponse = data ? { getPosts: [createdPostData.data.createPost, ...data.getPosts] } :
                                                    { getPosts: [createdPostData.data.createPost] };

        proxy.writeQuery({
          query: FETCH_POSTS,
          data: updatedPosts
        });
      }

      setFormValue({ body: "" });
      setError("");
    },
    onError(err) {
      if (err.graphQLErrors[0] && err.graphQLErrors[0].extensions) {
        setError(err.graphQLErrors[0].extensions.exception.error);
      }
    },
    variables: formValue
  });

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();
    createPost();
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFormValue({ body: event.target.value });
  }

  return (
    <div className={styles.addPost}>
      <h3 className={styles.title}>Create a post:</h3>

      <form onSubmit={(event) => onSubmit(event)} noValidate>
        <Input type="text"
               name="body"
               value={formValue.body}
               onChange={onChange}
               error={Boolean(error)}
               placeholder="write a message" />

        <Button type="submit" title="Submit">
          <PlusCircle />
        </Button>
      </form>

      { Utils.isNotNull(error) && <Errors errors={[error]} />}
    </div>
  )
};

export default AddPost;