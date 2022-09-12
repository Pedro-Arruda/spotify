import styles from "./RecentsArtists.module.scss";
import { RecentsArtistsItems } from "../../utils/recents";

export const Recents = () => {
  return (
    <section className={styles["section-recents-artists"]}>
      <h1>Tocados Recentemente</h1>
      <div className={styles["recents-artists"]}>
        {RecentsArtistsItems.map((artist, index) => (
          <div className={styles["recents-artists-card"]} key={index}>
            <img
              src={artist.image.url}
              alt={artist.image.alt}
              width={180}
              height={180}
            />
            <div>
              <h4>{artist.name}</h4>
              <p>{artist.band}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
