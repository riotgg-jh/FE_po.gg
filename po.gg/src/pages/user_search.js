import React, { useState, useEffect } from "react";
import SearchBar from "../components/common/SearchBar";
import UserProfile from "../components/user/UserProfile";
import MatchHistory from "../components/user/MatchHistory";
import "../styles/user_search.css";
import { useLocation } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

// DDragon summoner.json (소환사 주문)
async function fetchSummonerSpellMapping() {
  const response = await fetch(
    "http://ddragon.leagueoflegends.com/cdn/15.6.1/data/en_US/summoner.json"
  );
  const data = await response.json();
  const mapping = {};
  Object.keys(data.data).forEach((key) => {
    const spell = data.data[key];
    mapping[spell.key] = spell.image.full;
  });
  return mapping;
}

// DDragon runesReforged.json (룬)
async function fetchRunesMapping() {
  const response = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/15.6.1/data/en_US/runesReforged.json"
  );
  const data = await response.json();
  const runeIdMapping = {};
  const treeMapping = {};

  data.forEach((tree) => {
    treeMapping[tree.id] = {
      key: tree.key,
      name: tree.name,
      icon: tree.icon,
    };
    tree.slots.forEach((slot) => {
      slot.runes.forEach((rune) => {
        runeIdMapping[rune.id] = {
          key: rune.key,
          name: rune.name,
          icon: rune.icon,
        };
      });
    });
  });

  return { runeIdMapping, treeMapping };
}

// DDragon item.json (아이템)
async function fetchItemMapping() {
  const response = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/15.6.1/data/en_US/item.json"
  );
  const data = await response.json();
  return data.data;
}

function parseAPIDataToUser(apiData, spellMapping, runesMapping, itemMapping) {
  const user = {
    profileIcon: "",
    summonerName: "",
    tagLine: "",
    level: 0,
    soloEntries: [],
    flexEntries: [],
    matches: [],
  };

  // 기본 프로필
  if (apiData?.SummonerDTO && apiData?.userFindDTO) {
    user.profileIcon = `http://ddragon.leagueoflegends.com/cdn/15.6.1/img/profileicon/${apiData.SummonerDTO.profileIconId}.png`;
    user.summonerName = apiData.userFindDTO.gameName || "";
    user.tagLine = apiData.userFindDTO.tagLine || "";
    user.level = apiData.SummonerDTO.summonerLevel || 0;
  }

  // 랭크 타입
  user.soloEntries = apiData?.soloEntries || [];
  user.flexEntries = apiData?.flexEntries || [];

  // 매치 기록
  if (Array.isArray(apiData?.matchDetails)) {
    const ourPuuid = apiData?.userFindDTO?.puuid;
    user.matches = apiData.matchDetails.map((match) => {
      const info = match.info;
      const participants = info?.participants || [];

      // teamId 설정
      participants.forEach((p) => {
        const pid = p.participantId;
        p.teamId = pid <= 5 ? 100 : 200;
      });

      const ourParticipant = participants.find((p) => p.puuid === ourPuuid);

      // 게임 시간 계산
      const now = Date.now();
      const diffDays = Math.floor(
        (now - (info.gameStartTimestamp || 0)) / (1000 * 60 * 60 * 24)
      );
      const matchTimeText = diffDays < 1 ? "오늘" : `${diffDays}일 전`;

      // 게임 길이 계산
      const durationSec = info?.gameDuration || 0;
      const minutes = Math.floor(durationSec / 60);
      const seconds = durationSec % 60;

      // 큐 타입
      let gameType = "무작위 총력전";
      if (info?.queueId === 420) gameType = "솔로 랭크 게임";
      else if (info?.queueId === 440) gameType = "자유 랭크 게임";

      // 챔피언 아이콘 설정
      const championName = ourParticipant?.championName || "Teemo";
      const championIcon = `http://ddragon.leagueoflegends.com/cdn/15.6.1/img/champion/${championName}.png`;

      // KDA 정보
      const kills = ourParticipant?.kills ?? 0;
      const deaths = ourParticipant?.deaths ?? 0;
      const assists = ourParticipant?.assists ?? 0;
      const kdaFloat = ourParticipant?.challenges?.kda ?? 0;

      // 스펠
      const s1 = ourParticipant?.summoner1Id;
      const s2 = ourParticipant?.summoner2Id;
      const spell1 =
        s1 && spellMapping[String(s1)]
          ? `http://ddragon.leagueoflegends.com/cdn/15.6.1/img/spell/${spellMapping[String(s1)]}`
          : "";
      const spell2 =
        s2 && spellMapping[String(s2)]
          ? `http://ddragon.leagueoflegends.com/cdn/15.6.1/img/spell/${spellMapping[String(s2)]}`
          : "";

      // 룬
      let runes = {};
      if (
        ourParticipant?.perks &&
        ourParticipant.perks.styles &&
        runesMapping
      ) {
        const { runeIdMapping, treeMapping } = runesMapping;
        const primaryStyle = ourParticipant.perks.styles.find(
          (style) => style.description === "primaryStyle"
        );
        const subStyle = ourParticipant.perks.styles.find(
          (style) => style.description === "subStyle"
        );

        let primaryRuneIcon = "";
        let primaryRuneKey = "";
        if (primaryStyle?.selections?.length > 0) {
          const perkId = primaryStyle.selections[0].perk;
          if (runeIdMapping[perkId]) {
            primaryRuneKey = runeIdMapping[perkId].key;
            primaryRuneIcon = `http://ddragon.leagueoflegends.com/cdn/img/${runeIdMapping[perkId].icon}`;
          }
        }

        let subRuneTreeIcon = "";
        let subRuneTreeName = "";
        if (subStyle) {
          const treeId = subStyle.style;
          if (treeMapping[treeId]) {
            subRuneTreeName = treeMapping[treeId].name;
            subRuneTreeIcon = `http://ddragon.leagueoflegends.com/cdn/img/${treeMapping[treeId].icon}`;
          }
        }

        runes = {
          primaryRuneKey,
          primaryRuneIcon,
          subRuneTreeName,
          subRuneTreeIcon,
        };
      }

      // 아이템
      let mainItems = [];
      for (let i = 0; i < 6; i++) {
        const itemId = ourParticipant[`item${i}`];
        if (itemId && itemId !== 0) {
          const key = String(itemId);
          if (itemMapping[key]) {
            const itemFilename = itemMapping[key].image.full;
            const itemUrl = `http://ddragon.leagueoflegends.com/cdn/15.6.1/img/item/${itemFilename}`;
            mainItems.push(itemUrl);
          } else {
            mainItems.push("");
          }
        } else {
          mainItems.push(null);
        }
      }
      // 장신구
      let trinket = null;
      const trinketId = ourParticipant?.item6;
      if (trinketId && trinketId !== 0) {
        const key = String(trinketId);
        if (itemMapping[key]) {
          const itemFilename = itemMapping[key].image.full;
          trinket = `http://ddragon.leagueoflegends.com/cdn/15.6.1/img/item/${itemFilename}`;
        }
      }

      // 아군/적군 분리
      let allies = [];
      let enemies = [];
      if (ourParticipant && ourParticipant.teamId != null) {
        const ourTeamId = ourParticipant.teamId;
        participants.forEach((p) => {
          const playerData = {
            summonerName: p.riotIdGameName || p.summonerName,
            championIcon: `http://ddragon.leagueoflegends.com/cdn/15.6.1/img/champion/${p.championName}.png`,
          };

          if (p.teamId === ourTeamId) {
            allies.push(playerData);
          } else {
            enemies.push(playerData);
          }
        });
      }

      return {
        gameType,
        matchTime: matchTimeText,
        result: ourParticipant?.win ? "승리" : "패배",
        duration: `${minutes}분 ${seconds}초`,
        championIcon,
        runes,
        spells: [spell1, spell2],
        kda: `${kills} / ${deaths} / ${assists}`,
        rating: `${kdaFloat.toFixed(2)} 평점`,
        mainItems,
        trinket,
        allies,
        enemies,
      };
    });
  }

  return user;
}

const UserSearch = () => {
  const location = useLocation();

  const [userData, setUserData] = useState(null);
  const [spellMapping, setSpellMapping] = useState(null);
  const [runesMapping, setRunesMapping] = useState(null);
  const [itemMapping, setItemMapping] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // pendingSearch 상태 추가 (매핑 데이터가 준비되지 않았을 때 검색 파라미터 저장)
  const [pendingSearch, setPendingSearch] = useState(null);

  // 매핑 데이터 로드
  useEffect(() => {
    async function loadSpell() {
      try {
        const mapping = await fetchSummonerSpellMapping();
        setSpellMapping(mapping);
      } catch (err) {
        console.error("Spell mapping 로드 실패:", err);
      }
    }
    loadSpell();
  }, []);

  useEffect(() => {
    async function loadRunes() {
      try {
        const data = await fetchRunesMapping();
        setRunesMapping(data);
      } catch (err) {
        console.error("Runes mapping 로드 실패:", err);
      }
    }
    loadRunes();
  }, []);

  useEffect(() => {
    async function loadItems() {
      try {
        const data = await fetchItemMapping();
        setItemMapping(data);
      } catch (err) {
        console.error("Item mapping 로드 실패:", err);
      }
    }
    loadItems();
  }, []);

  // 매핑 데이터가 모두 준비되면 pendingSearch가 있을 경우 자동 검색 실행
  useEffect(() => {
    if (pendingSearch && spellMapping && runesMapping && itemMapping) {
      handleSearch(null, pendingSearch.summonerName, pendingSearch.tagLine);
      setPendingSearch(null);
    }
  }, [spellMapping, runesMapping, itemMapping, pendingSearch]);

  const handleSearch = async (_, summonerName, tagLine) => {
    console.log(`🔍 검색 요청: ${summonerName} ${tagLine}`);
    setError(null);
    setLoading(true);

    // 매핑 데이터가 준비되지 않았다면 pendingSearch에 저장 후 종료
    if (!spellMapping || !runesMapping || !itemMapping) {
      setPendingSearch({ summonerName, tagLine });
      setLoading(false);
      return;
    }

    try {
      // 기존 API 엔드포인트 사용 (쿼리 파라미터: summoners_name, tag)
      const url = `http://211.210.179.191:8888/api/userFind/profile?summoners_name=${encodeURIComponent(
        summonerName
      )}&tag=${encodeURIComponent(tagLine)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`에러 발생: ${response.status}`);
      }
      const apiData = await response.json();
      console.log("받은 데이터:", apiData);

      const parsedUser = parseAPIDataToUser(apiData, spellMapping, runesMapping, itemMapping);
      setUserData(parsedUser);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  // 홈에서 넘어온 검색 파라미터 자동 처리
  useEffect(() => {
    if (
      location.state &&
      location.state.summonerName &&
      location.state.summonerName.trim() !== ""
    ) {
      handleSearch(null, location.state.summonerName, location.state.tagLine);
    }
  }, [location.state]);

  const handleRefresh = (summonerName, tagLine) => {
    handleSearch(null, summonerName, tagLine);
  };

  return (
    <div className="user-search-container">
      <SearchBar onSearch={handleSearch} />
      {userData ? (
        <>
          <UserProfile user={userData} onRefresh={handleRefresh} />
          <div className="user-content">
            <MatchHistory matches={userData.matches || []} />
          </div>
        </>
      ) : (
        <p>검색 후 결과가 여기에 표시됩니다.</p>
      )}
      {/* loading 상태일 때 전체 화면 오버레이와 Spinner 표시 */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {error && <p>오류: {error}</p>}
    </div>
  );
};

export default UserSearch;
