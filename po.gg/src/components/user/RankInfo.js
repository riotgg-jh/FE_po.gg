import React, { useState } from "react"
import "../../styles/user_search.css"

const RankInfo = ({ soloEntries, flexEntries }) => {
  const [selectedQueue, setSelectedQueue] = useState("솔로랭크")

  const unrankedEntry = {
    tier: "UNRANKED",
    rank: "",
    leaguePoints: 0,
    wins: 0,
    losses: 0,
  }

  // soloEntries가 빈 배열이면 언랭크
  const soloRank =
    soloEntries && soloEntries.length > 0 ? soloEntries[0] : unrankedEntry

  // flexEntries가 빈 배열이면 언랭크
  const flexRank =
    flexEntries && flexEntries.length > 0 ? flexEntries[0] : unrankedEntry

  const entry = selectedQueue === "솔로랭크" ? soloRank : flexRank

  // 랭크 이미지 매핑
  const rankImages = {
    CHALLENGER: process.env.PUBLIC_URL + "/assets/rank/Rank=Challenger.png",
    GRANDMASTER: process.env.PUBLIC_URL + "/assets/rank/Rank=Grandmaster.png",
    MASTER: process.env.PUBLIC_URL + "/assets/rank/Rank=Master.png",
    DIAMOND: process.env.PUBLIC_URL + "/assets/rank/Rank=Diamond.png",
    EMERALD: process.env.PUBLIC_URL + "/assets/rank/Rank=Emerald.png",
    에메랄드: process.env.PUBLIC_URL + "/assets/rank/Rank=Emerald.png",
    PLATINUM: process.env.PUBLIC_URL + "/assets/rank/Rank=Platinum.png",
    GOLD: process.env.PUBLIC_URL + "/assets/rank/Rank=Gold.png",
    SILVER: process.env.PUBLIC_URL + "/assets/rank/Rank=Silver.png",
    BRONZE: process.env.PUBLIC_URL + "/assets/rank/Rank=Bronze.png",
    IRON: process.env.PUBLIC_URL + "/assets/rank/Rank=Iron.png",
    UNRANKED: process.env.PUBLIC_URL + "/assets/rank/Rank=Unranked.png",
    언랭크: process.env.PUBLIC_URL + "/assets/rank/Rank=Unranked.png",
  }

  // 승률 계산
  const totalGames = entry.wins + entry.losses
  const winRate =
    totalGames > 0 ? Math.round((entry.wins / totalGames) * 100) : 0

  return (
    <div className="profile-rank">
      {/* 솔로랭크 / 자유랭크 탭 */}
      <div className="queue-select">
        <button
          className={`queue-btn ${
            selectedQueue === "솔로랭크" ? "active" : ""
          }`}
          onClick={() => setSelectedQueue("솔로랭크")}
        >
          솔로랭크
        </button>
        <button
          className={`queue-btn ${
            selectedQueue === "자유랭크" ? "active" : ""
          }`}
          onClick={() => setSelectedQueue("자유랭크")}
        >
          자유랭크
        </button>
      </div>

      {/* 랭크 상세 정보 */}
      <div className="rank-details">
        <img
          src={
            rankImages[entry.tier] ||
            process.env.PUBLIC_URL + "/assets/rank/default.png"
          }
          alt="랭크 아이콘"
          className="rank-icon"
        />
        <div className="rank-info">
          <h2 className="rank-tier">
            {entry.tier} {entry.rank}
          </h2>
          <p className="rank-lp">{entry.leaguePoints} LP</p>
          <p className="rank-winrate">
            승률 {winRate}% ({entry.wins}승 {entry.losses}패)
          </p>
        </div>
      </div>
    </div>
  )
}

export default RankInfo
