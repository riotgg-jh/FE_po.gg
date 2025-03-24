import React, { useState } from "react"
import "../../styles/search_bar.css"
import searchIcon from "../../assets/icons/magnifying-glass.png"

const SearchBar = ({ onSearch, className = "" }) => {
  const [region, setRegion] = useState("KR")
  const [summonerName, setSummonerName] = useState("")
  const [tagLine, setTagLine] = useState("")

  const handleSearch = () => {
    if (summonerName.trim() !== "") {
      onSearch(region, summonerName, tagLine)
    }
  }

  return (
    <div className={`search-bar ${className}`}>
      <select
        className="region-select"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      >
        <option value="KR">KR</option>
        <option value="NA">개발중,,</option>
      </select>

      <input
        type="text"
        className="summoner-input"
        placeholder="소환사명을 입력해주세요..."
        value={summonerName}
        onChange={(e) => setSummonerName(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
      />

      <input
        type="text"
        className="tag-input"
        placeholder="#TAG"
        value={tagLine}
        onChange={(e) => setTagLine(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
      />

      <button className="search-button" onClick={handleSearch}>
        <img src={searchIcon} alt="검색" />
      </button>
    </div>
  )
}

export default SearchBar
