import React from "react"
import "../../styles/user_search.css"
import RankInfo from "./RankInfo"

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      {/* 왼쪽: 프로필 정보 */}
      <div className="profile-left">
        <img
          src={user.profileIcon}
          alt="소환사 아이콘"
          className="profile-icon"
        />
        <div className="profile-info">
          <h2>
            {user.summonerName}#{user.tagLine}
          </h2>
          <p className="profile-level">Level: {user.level}</p>
          <button className="refresh-button">전적갱신</button>
        </div>
      </div>

      {/* 오른쪽: 티어 정보 (UserProfile 내부로 이동) */}
      <RankInfo rank={user.rank} />
    </div>
  )
}

export default UserProfile
