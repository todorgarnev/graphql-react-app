import React, { FunctionComponent, useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import Auth from "../../common/utils/auth";
import styles from "./Menu.module.scss";

const Menu: FunctionComponent = () => {
  const [isTokenSet, setIsTokenSet] = useState<boolean>(Auth.isTokenSet());

  const logout = (): void => {
    Auth.clearToken();
    setIsTokenSet(false);
  }

  return (
    <div className={styles.menu}>
      <ul className={styles.listItems}>
        <li><NavLink exact to="/" activeClassName={styles.active}>Home</NavLink></li>
        {
          isTokenSet ?
            <li><NavLink to="/" onClick={logout}>Log out</NavLink></li> :
            <>
              <li><NavLink to="/login" activeClassName={styles.active}>Log in</NavLink></li>
              <li><NavLink to="/register" activeClassName={styles.active}>Register</NavLink></li>
            </>
        }
      </ul>
    </div>
  );
}

export default Menu;