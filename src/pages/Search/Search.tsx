import { useState } from "react";
import { Cards } from "../../components/Cards/Cards";
import { Layout } from "../../components/Layout/Layout";
import { SearchArtist } from "../../components/SearchArtist/SearchArtist";
import { fetchAuth } from "../../functions/fetchAuth";
import { useAuth } from "../../hooks/useAuth";

export interface Artist {
  artists: {
    items: {
      id: string;
      name: string;
      images: {
        url: string;
      }[];
    }[];
  };
}

export const Search = () => {
  const { auth, updateAuth } = useAuth();
  const [inputSearch, setInputSearch] = useState("");
  const [items, setItems] = useState([]);
  const [artist, setArtist] = useState<Artist | null>(null);

  const handleSubmit = async () => {
    let artistId = null;
    const artistURL = `https://api.spotify.com/v1/search?q=${inputSearch}&type=artist`;

    await fetchAuth(artistURL, { auth, updateAuth })
      .then((response) => response.json())
      .then((data) => {
        setArtist(data);

        artistId = data.artists.items[0].id;
      });

    const albumURL = `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&market=US&limit=50`;

    await fetchAuth(albumURL, { auth, updateAuth })
      .then((response) => response.json())
      .then((data) => setItems(data.items));
  };

  return (
    <Layout>
      <SearchArtist
        inputSearch={inputSearch}
        onSubmit={handleSubmit}
        setInputSearch={setInputSearch}
      />
      <Cards items={items} artist={artist} />
    </Layout>
  );
};
