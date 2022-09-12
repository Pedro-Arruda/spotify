import styles from "./ThisIsArtist.module.scss";
import { ThisIsArtistsItems } from "../../utils/thisIsArtists";

export const ThisIsArtist = () => {
  return (
    <section className={styles["section-recents-artists"]}>
      <h1>O melhor de cada artista</h1>
      <div className={styles["recents-artists"]}>
        {ThisIsArtistsItems.map((artist, index) => (
          <div className={styles["recents-artists-card"]} key={index}>
            <img
              src={artist.image.url}
              alt={artist.image.alt}
              width={180}
              height={180}
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
