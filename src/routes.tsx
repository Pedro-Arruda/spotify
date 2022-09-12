import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Album } from "./pages/Album/Album";
import { Home } from "./pages/Home/Home";
import { Search } from "./pages/Search/Search";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/search/details/:id" element={<Album />} />
    </Routes>
  );
};
