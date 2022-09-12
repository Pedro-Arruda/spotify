import styles from "./Artists.module.scss";
import { ArtistsItems } from "../../utils/artists";

export const Artists = () => {
  return (
    <section className={styles["section-artists"]}>
      <h1>Artistas</h1>
      <div className={styles["artists"]}>
        {ArtistsItems.map((artist, index) => (
          <div className={styles["artists-card"]} key={index}>
            <img
              src={artist.image.url}
              alt={artist.image.alt}
              width={170}
              height={170}
            />
            <div>
              <h4>{artist.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
