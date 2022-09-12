import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";
import styles from "./Album.module.scss";

export const Album = () => {
  const params = useParams();
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

  let searchParams = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  fetch(
    `https://api.spotify.com/v1/albums/${params.id}/tracks?include_groups=album&market=US&limit=50`,
    searchParams
  )
    .then((response) => response.json())
    .then((data) => setItems(data.items));

  const convertDurationToTimeString = (duration: number) => {
    const minutes = Math.floor((duration / 60000) % 60);
    const seconds = duration % 60;

    const timeString = [minutes, seconds]
      .map((unit) => String(unit).padStart(2, "0"))
      .join(":");

    return timeString;
  };
  return (
    <Layout>
      {items.map((song: any, index: number) => (
        <div key={index} className={styles["songs"]}>
          <p>{song.track_number}</p>
          <p>{song.name}</p>

          <p>{convertDurationToTimeString(song.duration_ms)}</p>
        </div>
      ))}
    </Layout>
  );
};
