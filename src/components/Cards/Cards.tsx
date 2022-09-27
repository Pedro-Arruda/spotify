import { Link } from "react-router-dom";
import { Artist } from "../../pages/Search/Search";
import styles from "./Cards.module.scss";

interface CardsProps {
  items: any[];
  artist: Artist | null;
}

export const Cards = ({ items, artist }: CardsProps) => {
  return (
    <div className={styles["card-container"]}>
      {artist && (
        <Link
          to={`/artist/details/${artist?.artists.items[0].id}`}
          className={styles["card-artist"]}
        >
          <img
            src={artist?.artists.items[0].images[0].url}
            alt="img do album"
          />
          <h3>{artist?.artists.items[0].name}</h3>
        </Link>
      )}

      {items.length > 0 ? (
        items.map((card: any, index: any) => (
          <Link
            to={`/details/${card.id}`}
            className={styles["card"]}
            key={index}
          >
            <img src={card.images[0].url} alt="img do album" width="90%" />
            <h3>{card.name}</h3>
          </Link>
        ))
      ) : (
        <h1>Pesquise algum artista</h1>
      )}
    </div>
  );
};
