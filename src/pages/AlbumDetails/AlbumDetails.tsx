import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";
import styles from "./AlbumDetails.module.scss";
import notFound from "../../assets/notfound.png";
import { useAuth } from "../../hooks/useAuth";

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
  const { auth } = useAuth();
  const params = useParams();
  const [album, setAlbum] = useState<Album | null>(null);

  useEffect(() => {
    let searchParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth!.access_token}`,
      },
    };

    fetch(`https://api.spotify.com/v1/albums/${params.id}`, searchParams)
      .then((response) => response.json())
      .then((data) => setAlbum(data));
  }, [params.id]);

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
            {album.images[0] ? (
              <img src={album.images[0].url} alt="" width={250} />
            ) : (
              <img src={notFound} alt="" width={250} />
            )}

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
