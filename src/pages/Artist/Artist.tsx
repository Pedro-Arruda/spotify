import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";
import { fetchAuth } from "../../functions/fetchAuth";
import { useAuth } from "../../hooks/useAuth";
import styles from "./Artist.module.scss";

interface Artist {
  images: {
    url: string;
  }[];
  name: string;
  followers: {
    total: number;
  };
}

interface Album {
  id: string;
  images: {
    url: string;
  }[];
  name: string;
}

interface TopTracks {
  tracks: {
    album: {
      images: {
        url: string;
      }[];
    };
    name: string;
    duration_ms: number;
  }[];
}

export const Artist = () => {
  const { auth, updateAuth } = useAuth();

  const params = useParams();
  const [topTracks, setTopTracks] = useState<TopTracks | null>(null);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [albums, setAlbums] = useState<Album[] | null>(null);

  const convertDurationToTimeString = (duration: number) => {
    const minutes = Math.floor((duration / 60000) % 60);
    const seconds = duration % 60;

    const timeString = [minutes, seconds]
      .map((unit) => String(unit).padStart(2, "0"))
      .join(":");

    return timeString;
  };

  useEffect(() => {
    fetchAuth(`https://api.spotify.com/v1/artists/${params.id}`, {
      auth,
      updateAuth,
    })
      .then((response) => response.json())
      .then((data) => setArtist(data));

    fetchAuth(
      `https://api.spotify.com/v1/artists/${params.id}/top-tracks?market=ES`,
      {
        auth,
        updateAuth,
      }
    )
      .then((response) => response.json())
      .then((data) => setTopTracks(data));

    fetchAuth(
      `https://api.spotify.com/v1/artists/${params.id}/albums?include_groups=album&market=US&limit=6`,
      { auth, updateAuth }
    )
      .then((response) => response.json())
      .then((data) => setAlbums(data.items));
  }, [params.id]);

  return (
    <Layout>
      {artist ? (
        <>
          <div className={styles["header-artist"]}>
            <img src={artist.images[0].url} alt="" width={250} height={200} />
            <div className={styles["artist-info"]}>
              <h1>{artist.name}</h1>
              <p>{artist.followers.total} ouvintes mensais</p>
            </div>
          </div>
          <div className={styles["top-tracks"]}>
            <h1>Populares</h1>
            <div className={styles["top-tracks-container"]}>
              {topTracks && topTracks.tracks.length > 0 ? (
                topTracks.tracks.map((track, index) => (
                  <div className={styles["track"]} key={index}>
                    <img src={track.album.images[0].url} alt="" height={70} />
                    <p>{track.name}</p>
                    <span>
                      {convertDurationToTimeString(track.duration_ms)}
                    </span>
                  </div>
                ))
              ) : (
                <div>
                  <p>Nenhuma musica encontrada</p>
                </div>
              )}
            </div>
          </div>
          <div className={styles["card-container"]}>
            {albums && albums?.length > 0 ? (
              albums.map((card, index) => (
                <Link
                  to={`/details/${card.id}`}
                  className={styles["card"]}
                  key={index}
                >
                  <img
                    src={card.images[0].url}
                    alt="img do album"
                    width="90%"
                  />
                  <h3>{card.name}</h3>
                </Link>
              ))
            ) : (
              <h1>nenhuma album encontrado</h1>
            )}
          </div>
        </>
      ) : (
        <p>Artista nao encontrado</p>
      )}
    </Layout>
  );
};
