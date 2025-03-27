import React from "react";
import "../../styles/user_search.css";

const MatchCard = ({ match }) => {
  return (
    <div className={`match-card ${match.result === "승리" ? "win" : "lose"}`}>
      {/* 왼쪽 섹션 */}
      <div className="match-left">
        <div className="match-left-top">
          <p className={`game-type ${match.result === "승리" ? "win-text" : "lose-text"}`}>
            {match.gameType}
          </p>
          <p className="match-time">{match.matchTime}</p>
        </div>
        <div className="match-divider"></div>
        <div className="match-left-bottom">
          <p className={`match-result ${match.result === "승리" ? "win-text" : "lose-text"}`}>
            {match.result}
          </p>
          <p className="match-duration">{match.duration}</p>
        </div>
      </div>

      {/* 중앙 섹션 */}
      <div className="match-center">
        {/* 챔피언 아이콘 */}
        <img src={match.championIcon} alt="챔피언" className="champion-icon" />

        {/* 스펠 */}
        <div className="runes-spells">
          <img src={match.spells[0]} alt="스펠1" className="spell-icon" />
          <img src={match.spells[1]} alt="스펠2" className="spell-icon" />
        </div>

        {/* 룬 */}
        <div className="runes-spells">
          {match.runes?.primaryRuneIcon && (
            <img
              src={match.runes.primaryRuneIcon}
              alt={match.runes.primaryRuneKey}
              className="rune-icon"
            />
          )}
          {match.runes?.subRuneTreeIcon && (
            <img
              src={match.runes.subRuneTreeIcon}
              alt={match.runes.subRuneTreeName}
              className="rune-icon"
            />
          )}
        </div>

        {/* KDA */}
        <div className="kda-info">
          <p className="kda">{match.kda}</p>
          <p className="rating">{match.rating}</p>
        </div>

        {/* 아이템 */}
        <div className="items-container">
          <div className="main-items">
            {match.mainItems.map((itemUrl, idx) =>
              itemUrl ? (
                <img
                  key={idx}
                  src={itemUrl}
                  alt={`아이템 ${idx}`}
                  className="item-icon"
                />
              ) : (
                <div key={idx} className="item-icon placeholder" />
              )
            )}
          </div>
          <div className="trinket-slot">
            {match.trinket ? (
              <img src={match.trinket} alt="장신구" className="trinket-icon" />
            ) : (
              <div className="trinket-icon placeholder" />
            )}
          </div>
        </div>
      </div>

      {/* 팀원 정보 */}
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
  );
};

export default MatchCard;
