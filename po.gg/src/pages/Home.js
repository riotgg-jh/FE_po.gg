import React from "react"
import "../styles/home.css"
import logo from "../assets/POGG_logo_shadow.png"
import SearchBar from "../components/common/SearchBar"

function Home() {
  const handleSearch = (region, summonerName, tagLine) => {
    console.log("검색된 유저:", region, summonerName, tagLine)
  }

  return (
    <div className="home-container">
      <img src={logo} alt="PO.GG Logo" className="home-logo" />

      <div className="search-container">
        <SearchBar onSearch={handleSearch} className="search-bar-home" />
      </div>
    </div>
  )
}

export default Home
