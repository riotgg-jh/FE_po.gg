import React from "react"
import "../../styles/user_search.css"
import RankInfo from "./RankInfo"

const UserProfile = ({ user, onRefresh }) => {
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
          <button
            className="refresh-button"
            onClick={() => onRefresh(user.summonerName, user.tagLine)}
          >
            전적갱신
          </button>
        </div>
      </div>

      {/* 오른쪽: 티어 정보 (soloEntries와 flexEntries 전달) */}
      <RankInfo soloEntries={user.soloEntries} flexEntries={user.flexEntries} />
    </div>
  )
}

export default UserProfile
