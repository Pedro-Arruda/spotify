import { PropsWithChildren } from "react";
import { Main } from "../Main/Main";
import { Sidebar } from "../Sidebar/Sidebar";
import styles from "./Layout.module.scss";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles["layout"]}>
      <Sidebar />
      <Main>{children}</Main>
    </div>
  );
};
