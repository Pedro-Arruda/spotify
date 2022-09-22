import styles from "./TopArtists.module.scss";
import { TopArtistsItems } from "../../utils/principais";
import { Link } from "react-router-dom";

export const TopArtists = () => {
  return (
    <section className={styles["section-top-artists"]}>
      <h1>Seus artistas mais ouvidos</h1>
      <div className={styles["top-artists"]}>
        {TopArtistsItems.map((artist, index) => (
          <div className={styles["top-artists-card"]} key={index}>
            <img
              src={artist.image.url}
              alt={artist.image.alt}
              width={90}
              height={"100%"}
            />
            <h3>{artist.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};
