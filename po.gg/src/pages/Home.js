import React from "react"
import "../styles/home.css" // ✅ 스타일 추가
import logo from "../assets/po.gg logo.png" // ✅ 로고 이미지 추가

function Home() {
  return (
    <div className="home-container">
      {/* 로고 */}
      <img src={logo} alt="PO.GG Logo" className="home-logo" />

      {/* 검색 바 */}
      <div className="search-container">
        <select className="region-select">
          <option value="KR">KR</option>
          <option value="NA">개발 중...</option>
        </select>
        <input
          type="text"
          placeholder="소환사명을 입력하세요..."
          className="search-input"
        />
        <button className="search-button">🔍</button>
      </div>
    </div>
  )
}

export default Home
