import React, { useState } from "react";
import "../../styles/search_bar.css";
import searchIcon from "../../assets/icons/magnifying-glass.png"; // 돋보기 아이콘 추가

const SearchBar = ({ onSearch }) => {
  const [region, setRegion] = useState("KR");
  const [summonerName, setSummonerName] = useState("");

  const handleSearch = () => {
    if (summonerName.trim() !== "") {
      onSearch(region, summonerName);
    }
  };

  return (
    <div className="search-bar">
      <select className="region-select" value={region} onChange={(e) => setRegion(e.target.value)}>
        <option value="KR">KR</option>
        <option value="NA">개발중,,</option>
      </select>
      <input
        type="text"
        className="summoner-input"
        placeholder="소환사명을 입력하세요..."
        value={summonerName}
        onChange={(e) => setSummonerName(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
      />
      <button className="search-button" onClick={handleSearch}>
        <img src={searchIcon} alt="검색" />
      </button>
    </div>
  );
};

export default SearchBar;
