import React, { FunctionComponent } from "react";
import { Loader as LoadingIcon } from 'react-feather';
import styles from "./Loader.module.scss";

const Loader: FunctionComponent = () => (
  <LoadingIcon className={styles.loading} />
);

export default Loader;