import { PropsWithChildren } from "react";

import styles from "./Main.module.scss";

export const Main = ({ children }: PropsWithChildren) => {
  return <main className={styles["main"]}>{children}</main>;
};
