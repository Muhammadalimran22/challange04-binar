import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchedMovie from "./pages/SearchedMovie";
import DetailMovie from "./pages/DetailMovie";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchedMovie />} />
        <Route path="/detail/:id" element={<DetailMovie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
