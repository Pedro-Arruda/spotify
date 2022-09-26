import { Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { AlbumDetails } from "./pages/AlbumDetails/AlbumDetails";
import { Artist } from "./pages/Artist/Artist";
import { Home } from "./pages/Home/Home";
import { Search } from "./pages/Search/Search";

export const Router = () => {
  const { auth } = useAuth();

  return (
    <Routes>
      {auth ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/details/:id" element={<AlbumDetails />} />
          <Route path="/artist/details/:id" element={<Artist />} />
        </>
      ) : (
        <Route path="/" element={<Home />} />
      )}
    </Routes>
  );
};
