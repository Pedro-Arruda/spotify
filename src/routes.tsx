import { Route, Routes } from "react-router-dom";
import { AlbumDetails } from "./pages/AlbumDetails/AlbumDetails";
import { Home } from "./pages/Home/Home";
import { Search } from "./pages/Search/Search";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/search/details/:id" element={<AlbumDetails />} />
    </Routes>
  );
};
