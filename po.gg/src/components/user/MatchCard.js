import React from "react"
import "../../styles/user_search.css"

const MatchCard = ({ match }) => {
  return (
    <div className={`match-card ${match.result === "승리" ? "win" : "lose"}`}>
      {/* 왼쪽 섹션: 게임 모드, 매치 시간, 승리/패배, 게임 시간 */}
      <div className="match-left">
        {/* 위쪽 섹션: 게임 모드, 매치 시간 */}
        <div className="match-left-top">
          <p
            className={`game-type ${
              match.result === "승리" ? "win-text" : "lose-text"
            }`}
          >
            {match.gameType}
          </p>
          <p className="match-time">{match.matchTime}</p>
        </div>

        {/* 구분선 추가 */}
        <div className="match-divider"></div>

        {/* 아래쪽 섹션: 게임 승패, 게임 플레이 타임 */}
        <div className="match-left-bottom">
          <p
            className={`match-result ${
              match.result === "승리" ? "win-text" : "lose-text"
            }`}
          >
            {match.result}
          </p>
          <p className="match-duration">{match.duration}</p>
        </div>
      </div>

      {/* 중앙 섹션: 챔피언 아이콘 + 룬/스펠 + KDA + 평점 + 아이템 */}
      <div className="match-center">
        {/* 위쪽 섹션: 챔피언, 스펠, 룬, KDA */}
        <div className="match-center-top">
          <img
            src={match.championIcon}
            alt="챔피언"
            className="champion-icon"
          />
          <div className="runes-spells">
            <img src={match.spells[0]} alt="스펠1" className="spell-icon" />
            <img src={match.spells[1]} alt="스펠2" className="spell-icon" />
          </div>
          <div className="runes-spells">
            <img src={match.runes[0]} alt="룬1" className="rune-icon" />
            <img src={match.runes[1]} alt="룬2" className="rune-icon" />
          </div>
          <div className="kda-info">
            <p className="kda">{match.kda}</p>
            <p className="rating">{match.rating}</p>
          </div>
        </div>

        {/* 아래쪽 섹션: 아이템 */}
        <div className="match-center-bottom">
          {match.items.map((item, idx) => (
            <img key={idx} src={item} alt="아이템" className="item-icon" />
          ))}
        </div>
      </div>

      {/* 오른쪽 섹션: 아군 & 적군 정보 */}
      <div className="match-right">
        <div className="team allies">
          {match.allies.map((player, idx) => (
            <div key={idx} className="player-info">
              <img
                src={player.championIcon}
                alt="아군 챔피언"
                className="small-champion-icon"
              />
              <p className="player-name">{player.summonerName}</p>
            </div>
          ))}
        </div>
        <div className="team enemies">
          {match.enemies.map((player, idx) => (
            <div key={idx} className="player-info">
              <img
                src={player.championIcon}
                alt="적 챔피언"
                className="small-champion-icon"
              />
              <p className="player-name">{player.summonerName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MatchCard
