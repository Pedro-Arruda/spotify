import { FaHome, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import spotifyLogo from "../../assets/spotify.png";

import styles from "./Sidebar.module.scss";

export const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <>
      <aside className={styles["sidebar"]}>
        <img src={spotifyLogo} alt="" width={150} />
        <ul>
          <li>
            <FaHome size={18} />
            <Link to={"/"}>Inicio</Link>
          </li>
          <li>
            <FaSearch size={18} />
            <Link to={"/search"}>Buscar</Link>
          </li>
        </ul>
      </aside>
      <div className={styles["bottom-bar"]}>
        <div className={styles["bottom-bar-container"]}>
          <ul>
            <li>
              <FaHome size={18} />
              <Link to={"/"}>Inicio</Link>
            </li>
            <li>
              <FaSearch size={18} />
              <Link to={"/search"}>Buscar</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
