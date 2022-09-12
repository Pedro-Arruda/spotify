import { Artists } from "../../components/Artists/Artists";
import { Layout } from "../../components/Layout/Layout";
import { Recents } from "../../components/Recents/Recents";
import { ThisIsArtist } from "../../components/ThisIsArtist/ThisIsArtist";
import { TopArtists } from "../../components/TopArtists/TopArtists";

export const Home = () => {
  return (
    <Layout>
      <TopArtists />
      <Recents />
      <Artists />
      <ThisIsArtist />
    </Layout>
  );
};
