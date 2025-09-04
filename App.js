import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UrlShortenerPage from "./page/UrlShortener";
import StatsPage from "./page/Stats";
import RedirectPage from "./page/Redirect";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="src\page\UrlShortener.js" element={<UrlShortener />} />
        <Route path="src\page\Stats.js" element={<Stats />} />
        <Route path="src\page\Redirect.js" element={<Redirect />} />
      </Routes>
    </Router>
  );
}
