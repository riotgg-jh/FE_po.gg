import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home.js";
import FindDuo from "./pages/find_duo.js";
import UserSearch from "./pages/user_search.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/find_duo" element={<FindDuo />} />
            <Route path="/user_search" element={<UserSearch />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
