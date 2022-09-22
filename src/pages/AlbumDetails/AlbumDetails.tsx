import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";
import styles from "./AlbumDetails.module.scss";

interface Album {
  id: string;
  artists: {
    name: string;
    id: string;
  }[];
  images: {
    url: string;
  }[];
  name: string;
  total_tracks: string;
  tracks: {
    items: {
      track_number: number;
      duration_ms: number;
      name: string;
      preview_url: string;
    }[];
  };
}

export const AlbumDetails = () => {
  const params = useParams();
  const [album, setAlbum] = useState<Album | null>(null);

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

  useEffect(() => {
    let searchParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    fetch(`https://api.spotify.com/v1/albums/${params.id}`, searchParams)
      .then((response) => response.json())
      .then((data) => setAlbum(data));
  }, [accessToken]);

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
      <div className={styles["header"]}>
        {album ? (
          <>
            <img src={album.images[0].url} alt="" width={250} />
            <div className={styles["album-info"]}>
              <p>Album</p>
              <h1>{album.name}</h1>
              <p>
                {album.artists[0].name} - {album.total_tracks + " "}
                músicas
              </p>
            </div>
          </>
        ) : (
          <h1>dados nao encontrados</h1>
        )}
      </div>

      <div className={styles["songs-container"]}>
        {album ? (
          album.tracks.items.map((song, index: number) => (
            <div key={index} className={styles["song"]}>
              <p>{song.track_number}</p>
              <p>{song.name}</p>

              <p>{convertDurationToTimeString(song.duration_ms)}</p>
            </div>
          ))
        ) : (
          <div>
            <p>Nenhum item encontrado</p>
          </div>
        )}
      </div>
    </Layout>
  );
};
