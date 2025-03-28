import React from "react";
import "../styles/home.css";
import logo from "../assets/POGG_logo_shadow.png";
import SearchBar from "../components/common/SearchBar";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleSearch = (region, summonerName, tagLine) => {
    console.log("검색된 유저:", summonerName, tagLine);
    // region 정보는 사용하지 않고 summonerName과 tagLine만 전달
    navigate("/user_search", { state: { summonerName, tagLine } });
  };

  return (
    <div className="home-container">
      <img src={logo} alt="PO.GG Logo" className="home-logo" />

      <div className="search-container">
        <SearchBar onSearch={handleSearch} className="search-bar-home" />
      </div>
    </div>
  );
}

export default Home;
