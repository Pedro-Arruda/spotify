import { useState } from "react";
import { Cards } from "../../components/Cards/Cards";
import { Layout } from "../../components/Layout/Layout";
import { SearchArtist } from "../../components/SearchArtist/SearchArtist";
import { useAuth } from "../../hooks/useAuth";

export const Search = () => {
  const { auth } = useAuth();
  const [inputSearch, setInputSearch] = useState("");
  const [items, setItems] = useState([]);

  const handleSubmit = async () => {
    let searchParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth!.access_token}`,
      },
    };

    let artistId = null;

    await fetch(
      `https://api.spotify.com/v1/search?q=${inputSearch}&type=artist`,
      searchParams
    )
      .then((response) => response.json())
      .then((data) => {
        artistId = data.artists.items[0].id;
        console.log(artistId);
      });

    await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&market=US&limit=50`,
      searchParams
    )
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
      <Cards items={items} />
    </Layout>
  );
};
