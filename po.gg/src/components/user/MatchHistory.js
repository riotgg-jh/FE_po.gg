import React from "react";
import MatchCard from "./MatchCard";
import "../../styles/user_search.css";

const MatchHistory = ({ matches }) => {
  return (
    <div className="match-history">
      {matches.map((match, index) => (
        <MatchCard key={index} match={match} />
      ))}
    </div>
  );
};

export default MatchHistory;
