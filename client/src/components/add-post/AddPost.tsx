import React, { FunctionComponent, FormEvent, useState, ChangeEvent } from "react";
import { useMutation } from "@apollo/client";
import { PlusCircle } from "react-feather";
import Button from "../button/Button";
import Input from "../input/Input";
import { INewPost, INewPostResponse } from "../../common/interfaces/new-post";
import { CREATE_POST } from "./graphql/mutations";
import styles from "./AddPost.module.scss";

const AddPost: FunctionComponent = () => {
  const [formValue, setFormValue] = useState<INewPost>({ body: "" });
  const [createPost, { error }] = useMutation<INewPostResponse, INewPost>(CREATE_POST, {
    update(proxy, result) {
      console.log("result >>", result);
      setFormValue({ body: "" });
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
          error={false}
          placeholder="write a message" />

        <Button type="submit" title="Submit" disabled={formValue.body === "" ? true : false}>
          <PlusCircle />
        </Button>
      </form>
    </div>
  )
};

export default AddPost;