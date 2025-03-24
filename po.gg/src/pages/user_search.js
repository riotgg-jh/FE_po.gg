import React from "react"
import SearchBar from "../components/common/SearchBar"
import UserProfile from "../components/user/UserProfile"
import MatchHistory from "../components/user/MatchHistory"
import "../styles/user_search.css"

//더미데이터-----------------------------------------------------//
const dummyUser = {
  profileIcon:
    process.env.PUBLIC_URL +
    "/assets/profileicon/Astronaut_Teemo_profileicon.png",
  summonerName: "나는강보성이다",
  tagLine: "KR1",
  level: 216,
  rank: {
    tier: "CHALLENGER",
    wins: 261,
    losses: 183,
    lp: 23,
    winRate: 58,
  },
  //매치 더미데이터
  matches: [
    {
      gameType: "자유 랭크 게임",
      matchTime: "6일 전",
      result: "승리",
      duration: "20분 45초",
      championIcon: "/assets/champion/udyr.png",
      runes: [
        "/assets/runes/Conqueror_rune.png",
        "/assets/runes/Celerity_rune.png",
      ],
      spells: ["/assets/spells/Smite_HD.png", "/assets/spells/Flash_HD.png"],
      kda: "9 / 3 / 2",
      rating: "3.67 평점",
      items: [
        "/assets/items/Black_Cleaver_item.png",
        "/assets/items/Boots_of_Swiftness_item.png",
        "/assets/items/Dead_Mans_Plate.png",
        "/assets/items/Death_Dance.png",
        "/assets/items/Guardian_Angel.png",
        "/assets/items/JakSho_The_Protean.png",
      ],
      allies: [
        {
          summonerName: "나는강보성이다다다다다다",
          championIcon: "/assets/champion/udyr.png",
        },
        {
          summonerName: "coolj67",
          championIcon: "/assets/champion/ahri.png",
        },
        { summonerName: "이멜로", championIcon: "/assets/champion/kayil.png" },
        {
          summonerName: "박재혁",
          championIcon: "/assets/champion/masterlee.png",
        },
        {
          summonerName: "떡 먹는 빵",
          championIcon: "/assets/champion/piz.png",
        },
      ],
      enemies: [
        {
          summonerName: "연애하기기기기기기기",
          championIcon: "/assets/champion/ani.png",
        },
        {
          summonerName: "불꽃남자",
          championIcon: "/assets/champion/rangar.png",
        },
        {
          summonerName: "동현약국",
          championIcon: "/assets/champion/shivana.png",
        },
        {
          summonerName: "tony0686",
          championIcon: "/assets/champion/volibear.png",
        },
        {
          summonerName: "719 MEDIC",
          championIcon: "/assets/champion/zeras.png",
        },
      ],
    },

    {
      gameType: "솔로 랭크 게임",
      matchTime: "2일 전",
      result: "패배",
      duration: "35분 10초",
      championIcon: "/assets/champion/ahri.png",
      runes: [
        "/assets/runes/primary_rune.png",
        "/assets/runes/secondary_rune.png",
      ],
      spells: ["/assets/spells/flash.png", "/assets/spells/ignite.png"],
      kda: "5 / 7 / 8",
      rating: "2.1 평점",
      items: [
        "/assets/items/Luden_Tempest.png",
        "/assets/items/Sorcerers_Shoes.png",
        "/assets/items/Zhonya_Hourglass.png",
        "/assets/items/Morellonomicon.png",
        "/assets/items/Rabadon_Deathcap.png",
        "/assets/items/Void_Staff.png",
      ],
      allies: [
        {
          summonerName: "나는강보성이다",
          championIcon: "/assets/champion/ahri.png",
        },
        { summonerName: "coolj67", championIcon: "/assets/champion/jhin.png" },
        { summonerName: "이멜로", championIcon: "/assets/champion/leesin.png" },
        { summonerName: "박재혁", championIcon: "/assets/champion/thresh.png" },
        {
          summonerName: "떡 먹는 빵",
          championIcon: "/assets/champion/malphite.png",
        },
      ],
      enemies: [
        { summonerName: "연애하기", championIcon: "/assets/champion/yone.png" },
        {
          summonerName: "불꽃남자",
          championIcon: "/assets/champion/xayah.png",
        },
        {
          summonerName: "동현약국",
          championIcon: "/assets/champion/rakan.png",
        },
        { summonerName: "tony0686", championIcon: "/assets/champion/ekko.png" },
        {
          summonerName: "719 MEDIC",
          championIcon: "/assets/champion/kayle.png",
        },
      ],
    },
    {
      gameType: "자유 랭크 게임",
      matchTime: "1일 전",
      result: "승리",
      duration: "28분 30초",
      championIcon: "/assets/champion/jhin.png",
      runes: [
        "/assets/runes/primary_rune.png",
        "/assets/runes/secondary_rune.png",
      ],
      spells: ["/assets/spells/flash.png", "/assets/spells/heal.png"],
      kda: "12 / 2 / 10",
      rating: "7.5 평점",
      items: [
        "/assets/items/Galeforce.png",
        "/assets/items/Berserkers_Greaves.png",
        "/assets/items/Infinity_Edge.png",
        "/assets/items/Lord_Dominiks_Regards.png",
        "/assets/items/Guardian_Angel.png",
        "/assets/items/Bloodthirster.png",
      ],
      allies: [
        {
          summonerName: "나는강보성이다",
          championIcon: "/assets/champion/ahri.png",
        },
        { summonerName: "coolj67", championIcon: "/assets/champion/jhin.png" },
        { summonerName: "이멜로", championIcon: "/assets/champion/leesin.png" },
        { summonerName: "박재혁", championIcon: "/assets/champion/thresh.png" },
        {
          summonerName: "떡 먹는 빵",
          championIcon: "/assets/champion/malphite.png",
        },
      ],
      enemies: [
        { summonerName: "연애하기", championIcon: "/assets/champion/yone.png" },
        {
          summonerName: "불꽃남자",
          championIcon: "/assets/champion/xayah.png",
        },
        {
          summonerName: "동현약국",
          championIcon: "/assets/champion/rakan.png",
        },
        { summonerName: "tony0686", championIcon: "/assets/champion/ekko.png" },
        {
          summonerName: "719 MEDIC",
          championIcon: "/assets/champion/kayle.png",
        },
      ],
    },
    {
      gameType: "솔로 랭크 게임",
      matchTime: "3시간 전",
      result: "패배",
      duration: "40분 12초",
      championIcon: "/assets/champion/yasuo.png",
      runes: [
        "/assets/runes/primary_rune.png",
        "/assets/runes/secondary_rune.png",
      ],
      spells: ["/assets/spells/flash.png", "/assets/spells/exhaust.png"],
      kda: "3 / 9 / 5",
      rating: "1.5 평점",
      items: [
        "/assets/items/Shieldbow.png",
        "/assets/items/Berserkers_Greaves.png",
        "/assets/items/Infinity_Edge.png",
        "/assets/items/Bloodthirster.png",
        "/assets/items/Death_Dance.png",
        "/assets/items/Guardian_Angel.png",
      ],
      allies: [
        {
          summonerName: "나는강보성이다",
          championIcon: "/assets/champion/ahri.png",
        },
        { summonerName: "coolj67", championIcon: "/assets/champion/jhin.png" },
        { summonerName: "이멜로", championIcon: "/assets/champion/leesin.png" },
        { summonerName: "박재혁", championIcon: "/assets/champion/thresh.png" },
        {
          summonerName: "떡 먹는 빵",
          championIcon: "/assets/champion/malphite.png",
        },
      ],
      enemies: [
        { summonerName: "연애하기", championIcon: "/assets/champion/yone.png" },
        {
          summonerName: "불꽃남자",
          championIcon: "/assets/champion/xayah.png",
        },
        {
          summonerName: "동현약국",
          championIcon: "/assets/champion/rakan.png",
        },
        { summonerName: "tony0686", championIcon: "/assets/champion/ekko.png" },
        {
          summonerName: "719 MEDIC",
          championIcon: "/assets/champion/kayle.png",
        },
      ],
    },
    {
      gameType: "솔로 랭크 게임",
      matchTime: "2시간 전",
      result: "승리",
      duration: "32분 45초",
      championIcon: "/assets/champion/darius.png",
      runes: [
        "/assets/runes/primary_rune.png",
        "/assets/runes/secondary_rune.png",
      ],
      spells: ["/assets/spells/flash.png", "/assets/spells/ghost.png"],
      kda: "9 / 4 / 6",
      rating: "4.2 평점",
      items: [
        "/assets/items/Shieldbow.png",
        "/assets/items/Berserkers_Greaves.png",
        "/assets/items/Infinity_Edge.png",
        "/assets/items/Bloodthirster.png",
        "/assets/items/Death_Dance.png",
        "/assets/items/Guardian_Angel.png",
      ],
      allies: [
        {
          summonerName: "나는강보성이다",
          championIcon: "/assets/champion/ahri.png",
        },
        { summonerName: "coolj67", championIcon: "/assets/champion/jhin.png" },
        { summonerName: "이멜로", championIcon: "/assets/champion/leesin.png" },
        { summonerName: "박재혁", championIcon: "/assets/champion/thresh.png" },
        {
          summonerName: "떡 먹는 빵",
          championIcon: "/assets/champion/malphite.png",
        },
      ],
      enemies: [
        { summonerName: "연애하기", championIcon: "/assets/champion/yone.png" },
        {
          summonerName: "불꽃남자",
          championIcon: "/assets/champion/xayah.png",
        },
        {
          summonerName: "동현약국",
          championIcon: "/assets/champion/rakan.png",
        },
        { summonerName: "tony0686", championIcon: "/assets/champion/ekko.png" },
        {
          summonerName: "719 MEDIC",
          championIcon: "/assets/champion/kayle.png",
        },
      ],
    },
  ],
}

const UserSearch = () => {
  const handleSearch = (region, summonerName) => {
    console.log(`🔍 검색 요청: [${region}] ${summonerName}`)
  }

  return (
    <div className="user-search-container">
      {/*검색 바*/}
      <SearchBar onSearch={handleSearch} />

      {/*유저 프로필 + 랭크 정보*/}
      <UserProfile user={dummyUser} />

      {/*매치 기록*/}
      <div className="user-content">
        <MatchHistory matches={dummyUser.matches} />
      </div>
    </div>
  )
}

export default UserSearch
