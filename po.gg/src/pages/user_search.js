import React, { useState, useEffect } from "react";
import SearchBar from "../components/common/SearchBar";
import UserProfile from "../components/user/UserProfile";
import MatchHistory from "../components/user/MatchHistory";
import "../styles/user_search.css";

// DDragon summoner.json (소환사 주문)
async function fetchSummonerSpellMapping() {
  const response = await fetch("http://ddragon.leagueoflegends.com/cdn/15.6.1/data/en_US/summoner.json");
  const data = await response.json();
  const mapping = {};
  Object.keys(data.data).forEach((key) => {
    const spell = data.data[key];
    // spell.key -> "4" (Flash), spell.image.full -> "SummonerFlash.png"
    mapping[spell.key] = spell.image.full;
  });
  return mapping;
}

// DDragon runesReforged.json (룬)
async function fetchRunesMapping() {
  const response = await fetch("https://ddragon.leagueoflegends.com/cdn/15.6.1/data/en_US/runesReforged.json");
  const data = await response.json();
  const runeIdMapping = {};
  const treeMapping = {};
  data.forEach((tree) => {
    // 트리 아이콘(예: "perk-images/Styles/7200_Domination.png") 등
    treeMapping[tree.id] = {
      key: tree.key,   // Domination, Precision 등
      name: tree.name, // "Domination"
      icon: tree.icon, // "perk-images/Styles/7200_Domination.png"
    };
    tree.slots.forEach((slot) => {
      slot.runes.forEach((rune) => {
        // rune.id -> 8112, rune.icon -> "perk-images/Styles/Domination/Electrocute/Electrocute.png"
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
  const response = await fetch("https://ddragon.leagueoflegends.com/cdn/15.6.1/data/en_US/item.json");
  const data = await response.json();
  // data.data -> { "1001": {...}, "1004": {...}, ... }
  return data.data;
}

/**
 * API 응답 → 프론트엔드 UI 데이터 구조
 */
function parseAPIDataToUser(apiData, spellMapping, runesMapping, itemMapping) {
  const user = {
    profileIcon: "",
    summonerName: "",
    tagLine: "",
    level: 0,
    rank: {
      tier: "",
      wins: 0,
      losses: 0,
      lp: 0,
      winRate: 0,
    },
    matches: [],
  };

  // (1) 기본 프로필
  if (apiData?.SummonerDTO && apiData?.userFindDTO) {
    user.profileIcon = `http://ddragon.leagueoflegends.com/cdn/15.6.1/img/profileicon/${apiData.SummonerDTO.profileIconId}.png`;
    user.summonerName = apiData.userFindDTO.gameName || "";
    user.tagLine = apiData.userFindDTO.tagLine || "";
    user.level = apiData.SummonerDTO.summonerLevel || 0;
  }

  // (2) 솔로 랭크
  if (apiData?.soloEntries?.length > 0) {
    const solo = apiData.soloEntries[0];
    const totalGames = solo.wins + solo.losses;
    const winRate = totalGames > 0 ? Math.round((solo.wins / totalGames) * 100) : 0;
    user.rank = {
      tier: solo.tier || "",
      wins: solo.wins || 0,
      losses: solo.losses || 0,
      lp: solo.leaguePoints || 0,
      winRate,
    };
  }

  // (3) 매치 기록
  if (Array.isArray(apiData?.matchDetails)) {
    const ourPuuid = apiData?.userFindDTO?.puuid;

    user.matches = apiData.matchDetails.map((match) => {
      const info = match.info;
      const participants = info?.participants || [];
      const ourParticipant = participants.find((p) => p.puuid === ourPuuid);

      // 시간 계산 -> N일 전
      const now = Date.now();
      const diffDays = Math.floor((now - (info.gameStartTimestamp || 0)) / (1000 * 60 * 60 * 24));
      const matchTimeText = diffDays < 1 ? "오늘" : `${diffDays}일 전`;

      // 게임 길이
      const durationSec = info?.gameDuration || 0;
      const minutes = Math.floor(durationSec / 60);
      const seconds = durationSec % 60;

      // 큐 타입
      let gameType = "무작위 총력전";
      if (info?.queueId === 420) gameType = "솔로 랭크 게임";
      else if (info?.queueId === 440) gameType = "자유 랭크 게임";

      // 챔피언 아이콘
      const championName = ourParticipant?.championName || "Teemo";
      const championIcon = `http://ddragon.leagueoflegends.com/cdn/15.6.1/img/champion/${championName}.png`;

      // KDA
      const kills = ourParticipant?.kills ?? 0;
      const deaths = ourParticipant?.deaths ?? 0;
      const assists = ourParticipant?.assists ?? 0;
      const kdaFloat = ourParticipant?.challenges?.kda ?? 0;

      // 스펠
      const s1 = ourParticipant?.summoner1Id;
      const s2 = ourParticipant?.summoner2Id;
      const spell1 = s1 && spellMapping[String(s1)]
        ? `http://ddragon.leagueoflegends.com/cdn/15.6.1/img/spell/${spellMapping[String(s1)]}`
        : "";
      const spell2 = s2 && spellMapping[String(s2)]
        ? `http://ddragon.leagueoflegends.com/cdn/15.6.1/img/spell/${spellMapping[String(s2)]}`
        : "";

      // 룬
      let runes = {};
      if (ourParticipant?.perks && ourParticipant.perks.styles && runesMapping) {
        const { runeIdMapping, treeMapping } = runesMapping;

        const primaryStyle = ourParticipant.perks.styles.find(
          (style) => style.description === "primaryStyle"
        );
        const subStyle = ourParticipant.perks.styles.find(
          (style) => style.description === "subStyle"
        );

        // 핵심 룬 (primary)
        let primaryRuneIcon = "";
        let primaryRuneKey = "";
        if (primaryStyle?.selections?.length > 0) {
          const perkId = primaryStyle.selections[0].perk; // ex) 8112
          if (runeIdMapping[perkId]) {
            primaryRuneKey = runeIdMapping[perkId].key;
            primaryRuneIcon = `http://ddragon.leagueoflegends.com/cdn/img/${runeIdMapping[perkId].icon}`;
          }
        }

        // 서브 룬 (트리 아이콘)
        let subRuneTreeIcon = "";
        let subRuneTreeName = "";
        if (subStyle) {
          const treeId = subStyle.style; // ex) 8200
          if (treeMapping[treeId]) {
            subRuneTreeName = treeMapping[treeId].name; // ex) "Sorcery"
            // 서브 룬 트리 전체 아이콘
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

      // 아이템 처리
      // 아이템0~5 = 메인 아이템 6개, 아이템6 = 장신구(Trinket)
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
            // 아이템ID가 있지만 item.json에 없는 경우
            mainItems.push("");
          }
        } else {
          // 아이템이 없는 경우 -> placeholder
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
        mainItems, // 6개
        trinket,   // 장신구
        allies: [],
        enemies: [],
      };
    });
  }

  return user;
}

const UserSearch = () => {
  const [userData, setUserData] = useState(null);
  const [spellMapping, setSpellMapping] = useState(null);
  const [runesMapping, setRunesMapping] = useState(null);
  const [itemMapping, setItemMapping] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 주문
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

  // 룬
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

  // 아이템
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

  const handleSearch = async (region, summonerName, tagLine) => {
    console.log(`🔍 검색 요청: [${region}] ${summonerName} ${tagLine}`);
    setLoading(true);
    setError(null);

    try {
      const url = `http://211.210.179.191:8888/api/userFind/profile?summoners_name=${encodeURIComponent(
        summonerName
      )}&tag=${encodeURIComponent(tagLine)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`에러 발생: ${response.status}`);
      }
      const apiData = await response.json();
      console.log("받은 데이터:", apiData);

      if (!spellMapping || !runesMapping || !itemMapping) {
        throw new Error("데이터 로드가 아직 완료되지 않았습니다.");
      }

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

  return (
    <div className="user-search-container">
      <SearchBar onSearch={handleSearch} />

      {loading && <p>로딩중...</p>}
      {error && <p>오류: {error}</p>}

      {userData ? (
        <>
          <UserProfile user={userData} />
          <div className="user-content">
            <MatchHistory matches={userData.matches || []} />
          </div>
        </>
      ) : (
        <p>검색 후 결과가 여기에 표시됩니다.</p>
      )}
    </div>
  );
};

export default UserSearch;
