import { useEffect, useState } from "react";
import { Cards } from "../../components/Cards/Cards";
import { Layout } from "../../components/Layout/Layout";
import { SearchArtist } from "../../components/SearchArtist/SearchArtist";

export const Search = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [items, setItems] = useState([]);

  const [accessToken, setAccessToken] = useState("");

  const client_id = "08f5cbeae6f04906851ec89f964c31eb";
  const client_secret = "8770285b5d404f00a737c86c86591924";

  useEffect(() => {
    let authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        client_id +
        "&client_secret=" +
        client_secret,
    };

    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  const handleSubmit = async () => {
    let searchParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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
