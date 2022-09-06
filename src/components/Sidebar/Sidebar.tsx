import { FaHome, FaSearch } from "react-icons/fa";
import spotifyLogo from "../../assets/spotify.png";

import styles from "./Sidebar.module.scss";

export const Sidebar = () => {
  return (
    <aside className={styles["sidebar"]}>
      <img src={spotifyLogo} alt="" width={150} />
      <ul>
        <li>
          <FaHome size={18} /> Início
        </li>
        <li>
          <FaSearch size={18} /> Buscar
        </li>
      </ul>
    </aside>
  );
};
