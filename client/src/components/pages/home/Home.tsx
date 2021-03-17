import React, { FunctionComponent } from "react";
import styles from "./Home.module.scss";

interface HomeProps {
  test: string;
};

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}

export default Home;