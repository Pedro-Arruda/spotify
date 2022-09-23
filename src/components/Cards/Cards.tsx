import { Link } from "react-router-dom";
import styles from "./Cards.module.scss";

interface CardsProps {
  items: any[];
}

export const Cards = ({ items }: CardsProps) => {
  return (
    <div className={styles["card-container"]}>
      {items.length > 0 ? (
        items.map((card: any, index: any) => (
          <Link
            to={`details/${card.id}`}
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
