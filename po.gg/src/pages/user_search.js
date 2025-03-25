import React, { useState } from "react";
import SearchBar from "../components/common/SearchBar";
import UserProfile from "../components/user/UserProfile";
import MatchHistory from "../components/user/MatchHistory";
import "../styles/user_search.css";

const UserSearch = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (region, summonerName, tagLine) => {
    console.log(`검색 요청: ${summonerName} ${tagLine}`);
    setLoading(true);
    setError(null);
    try {
      const url = `http://211.210.179.191:8888/api/userFind/profile?summoners_name=${summonerName}&tag=${tagLine}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`에러 발생: ${response.status}`);
      }
      const data = await response.json();
      console.log("받은 데이터:", data);
      setUserData(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-search-container">
      <SearchBar onSearch={handleSearch} />
      {loading && <p>로딩중...</p>}
      {error && <p>오류: {error}</p>}
      {userData ? (
        <>
          <UserProfile user={userData.SummonerDTO} />
          <div className="user-content">
            <MatchHistory matches={userData.matchDetails} />
          </div>
        </>
      ) : (
        <p>검색 후 결과가 여기에 표시됩니다.</p>
      )}
    </div>
  );
};

export default UserSearch;
