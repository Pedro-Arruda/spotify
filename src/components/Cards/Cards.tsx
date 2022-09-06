import { useEffect } from "react";
import styles from "./Cards.module.scss";

export const Cards = ({ items }: any) => {
  useEffect(() => {
    console.log("cards" + items);
  }, []);

  return (
    <div className={styles["card-container"]}>
      {items !== "" ? (
        items.map((card: any, index: any) => (
          <div className={styles["card"]} key={index}>
            <img src={card.images[0].url} alt="img do album" width="90%" />
            <h3>{card.name}</h3>
          </div>
        ))
      ) : (
        <h1>Pesquise algum artista</h1>
      )}
    </div>
  );
};
