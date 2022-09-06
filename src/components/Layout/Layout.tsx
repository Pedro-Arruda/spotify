import { Main } from "../Main/Main";
import { Sidebar } from "../Sidebar/Sidebar";
import styles from "./Layout.module.scss";

export const Layout = () => {
  return (
    <div className={styles["layout"]}>
      <Sidebar />
      <Main />
    </div>
  );
};
