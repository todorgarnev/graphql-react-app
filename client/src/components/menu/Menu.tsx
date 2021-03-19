import React, { FunctionComponent } from "react";
import { NavLink, Redirect } from "react-router-dom";
import styles from "./Menu.module.scss";
import { ROUTES } from "../../common/constants/constants";
import { IRoute } from "../../common/interfaces/route";

const Menu: FunctionComponent = () => {
  return (
    <div className={styles.menu}>
      <ul className={styles.listItems}>
        {
          ROUTES.map((route: IRoute, index: number) => (
            <li key={index}>
              <NavLink exact to={route.path} activeClassName={styles.active}>{route.name}</NavLink>
            </li>
          ))
        }
        <Redirect to="/" />
      </ul>
    </div>
  );
}

export default Menu;