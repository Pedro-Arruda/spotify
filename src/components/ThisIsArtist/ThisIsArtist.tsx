import styles from "./ThisIsArtist.module.scss";
import { ThisIsArtistsItems } from "../../utils/thisIsArtists";
import { Link } from "react-router-dom";

export const ThisIsArtist = () => {
  return (
    <section className={styles["section-recents-artists"]}>
      <h1>O melhor de cada artista</h1>
      <div className={styles["recents-artists"]}>
        {ThisIsArtistsItems.map((artist, index) => (
          <Link
            to={`/artist/details/${artist.id}`}
            className={styles["recents-artists-card"]}
            key={index}
          >
            <img
              src={artist.image.url}
              alt={artist.image.alt}
              width={180}
              height={180}
            />
            <h4>{artist.name}</h4>
          </Link>
        ))}
      </div>
    </section>
  );
};
