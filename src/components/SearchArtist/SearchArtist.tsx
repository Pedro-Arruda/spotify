import { FormEvent } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchArtist.module.scss";

interface SearchProps {
  inputSearch: string;
  setInputSearch: (e: string) => void;
  onSubmit: () => void;
}

export const SearchArtist = ({
  inputSearch,
  setInputSearch,
  onSubmit,
}: SearchProps) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <header className={styles["header"]}>
      <form onSubmit={handleSubmit}>
        <div className={styles["input-container"]}>
          <div className={styles["input"]}>
            <FaSearch color="#333" />
            <input
              type="text"
              value={inputSearch}
              placeholder="Digite um artista"
              onChange={(e) => setInputSearch(e.target.value)}
            />
          </div>

          <button typeof="submit">Pesquisar</button>
        </div>
      </form>
    </header>
  );
};
