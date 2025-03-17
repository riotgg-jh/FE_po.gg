import React, { useState } from "react";
import "../../styles/user_search.css";

const RankInfo = ({ rank }) => {
  const [selectedQueue, setSelectedQueue] = useState("솔로랭크");

  const rankImages = {
    CHALLENGER: process.env.PUBLIC_URL + "/assets/rank/Rank=Challenger.png",
    GRANDMASTER: process.env.PUBLIC_URL + "/assets/rank/Rank=Grandmaster.png",
    MASTER: process.env.PUBLIC_URL + "/assets/rank/Rank=Master.png",
    DIAMOND: process.env.PUBLIC_URL + "/assets/rank/Rank=Diamond.png",
    PLATINUM: process.env.PUBLIC_URL + "/assets/rank/Rank=Platinum.png",
    GOLD: process.env.PUBLIC_URL + "/assets/rank/Rank=Gold.png",
    SILVER: process.env.PUBLIC_URL + "/assets/rank/Rank=Silver.png",
    BRONZE: process.env.PUBLIC_URL + "/assets/rank/Rank=Bronze.png",
    IRON: process.env.PUBLIC_URL + "/assets/rank/Rank=Iron.png",
  };

  return (
    <div className="profile-rank"> {/* ✅ 불필요한 div.rank-info-container 제거 */}
      <div className="queue-select">
        <button
          className={`queue-btn ${selectedQueue === "솔로랭크" ? "active" : ""}`}
          onClick={() => setSelectedQueue("솔로랭크")}
        >
          솔로랭크
        </button>
        <button
          className={`queue-btn ${selectedQueue === "자유랭크" ? "active" : ""}`}
          onClick={() => setSelectedQueue("자유랭크")}
        >
          자유랭크
        </button>
      </div>

      <div className="rank-details">
        <img
          src={rankImages[rank.tier] || process.env.PUBLIC_URL + "/assets/rank/default.png"}
          alt="랭크 아이콘"
          className="rank-icon"
        />
        <div className="rank-info">
          <h2 className="rank-tier">{rank.tier}</h2>
          <p className="rank-lp">{rank.lp} LP</p>
          <p className="rank-winrate">
            승률 {rank.winRate}% ({rank.wins}승 {rank.losses}패)
          </p>
        </div>
      </div>
    </div>
  );
};

export default RankInfo;
