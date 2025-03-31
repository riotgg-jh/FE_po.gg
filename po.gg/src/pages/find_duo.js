import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import WriteModal from "./../duo/WriteModal";
import "./../styles/find_duo.css";

// 상단 필터/아이콘 표시용 (아이콘 예시)
import anything_icon from "./../assets/position/anything.png";
import top_icon from "./../assets/position/Top_icon.png";
import jungle_icon from "./../assets/position/Jungle_icon.png";
import mid_icon from "./../assets/position/Middle_icon.png";
import bottom_icon from "./../assets/position/Bottom_icon.png";
import support_icon from "./../assets/position/Support_icon.png";

import reloadIcon from "./../assets/icons/reload.png";
import DuoCard from "./../duo/DuoCard.js";

/**
 * 모드(한글) -> 백엔드 categoryId(enum) 변환
 * "솔로랭크" -> "SOLO_RANK"
 * "자유랭크" -> "FLEX_RANK"
 * "일반"    -> "NORMAL"
 * "칼바람"  -> "ARAM"
 */
const textToCategoryEnum = {
  "솔로랭크": "SOLO_RANK",
  "자유랭크": "FLEX_RANK",
  "일반": "NORMAL",
  "칼바람": "ARAM",
};

/**
 * 백엔드 categoryId(enum) -> 한글
 * "SOLO_RANK" -> "솔로랭크"
 * "FLEX_RANK" -> "자유랭크"
 * "NORMAL"    -> "일반"
 * "ARAM"      -> "칼바람"
 */
const categoryEnumToText = {
  SOLO_RANK: "솔로랭크",
  FLEX_RANK: "자유랭크",
  NORMAL: "일반",
  ARAM: "칼바람",
};

/**
 * 인덱스 -> 백엔드 PositionType(enum)
 * 0 -> "TOP"
 * 1 -> "JUG"
 * 2 -> "MID"
 * 3 -> "ADC"
 * 4 -> "SUP"
 */
function convertIndexToPositionEnum(index) {
  const mapping = ["TOP", "JUG", "MID", "ADC", "SUP"];
  return mapping[index] || "TOP";
}

/**
 * 백엔드 PositionType(enum) -> 한글
 * "TOP" -> "탑"
 * "JUG" -> "정글"
 * "MID" -> "미드"
 * "ADC" -> "원딜"
 * "SUP" -> "서폿"
 */
function convertEnumToPositionText(enumStr) {
  const mapObj = {
    TOP: "탑",
    JUG: "정글",
    MID: "미드",
    ADC: "원딜",
    SUP: "서폿",
  };
  return mapObj[enumStr] || "상관없음";
}

function FindDuo() {
  const [cards, setCards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noData, setNoData] = useState(false);

  // 모달(WriteModal)에서 포지션 단일 선택 시 표시할 아이콘
  // 0->TOP, 1->JUG, 2->MID, 3->ADC, 4->SUP
  const positionImages = [
    top_icon,
    jungle_icon,
    mid_icon,
    bottom_icon,
    support_icon,
  ];

  // 페이지 로드 시 게시글 목록(GET)
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("http://211.210.179.191:8888/api/posts/");
        if (res.status === 404) {
          setCards([]);
          setNoData(true);
          return;
        }
        if (!res.ok) throw new Error("게시글 불러오기 실패");

        const posts = await res.json();
        if (!Array.isArray(posts) || posts.length === 0) {
          setCards([]);
          setNoData(true);
          return;
        }
        // posts 예: [{ id, gameName, myPosition, lookingForPosition, categoryId, content, createdAt }, ...]
        const transformed = posts.map((post) => {
          const modeText = categoryEnumToText[post.categoryId] || "";
          // 단일 문자열: post.myPosition = "TOP", post.lookingForPosition = "JUG" 등
          // 탭 구분: myPosition이 있으면 member, 없으면 party
          const tabType = post.myPosition ? "member" : "party";

          // 제목 생성
          const title = generateTitleFromPost(
            modeText,
            post.myPosition,
            post.lookingForPosition,
            tabType
          );

          return {
            id: post.id,
            createdAt: post.createdAt,
            summonerName: post.gameName,
            description: post.content,
            myPosition: post.myPosition,            // "TOP" 등
            lookingForPosition: post.lookingForPosition,  // "JUG" 등
            categoryId: post.categoryId,
            tabType,
            mode: modeText,
            title,
          };
        });
        setCards(transformed);
        setNoData(false);
      } catch (error) {
        console.error(error);
        setNoData(true);
      }
    }
    fetchPosts();
  }, []);

  // 모달에서 등록(POST)
  const handleModalSubmit = async (payload) => {
    // payload 예: { summonerName, tagLine, mode:"솔로랭크", myPosition:0, lookingForPosition:2, description, ... }
    const categoryId = textToCategoryEnum[payload.mode] || "SOLO_RANK";
    // 인덱스를 enum 문자열로 변환
    const myPos = payload.myPosition !== null
      ? convertIndexToPositionEnum(payload.myPosition)
      : null;
    const lookPos = payload.lookingForPosition !== null
      ? convertIndexToPositionEnum(payload.lookingForPosition)
      : null;

    // positionid:"ACTIVE" 필드 추가
    const postPayload = {
      gameName: payload.summonerName,
      myPosition: myPos,            // "TOP","JUG","MID","ADC","SUP" (or null)
      lookingForPosition: lookPos,  // "TOP","JUG","MID","ADC","SUP" (or null)
      categoryId,                   // "SOLO_RANK","FLEX_RANK","NORMAL","ARAM"
      positionid: "ACTIVE",         // 새 필드
      content: payload.description,
    };

    try {
      const response = await fetch("http://211.210.179.191:8888/api/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postPayload),
      });
      if (!response.ok) throw new Error("게시글 등록 실패");

      const data = await response.json();
      const newId = data.id || Date.now();
      const newCreatedAt = data.createdAt || new Date().toISOString();

      // 프론트 표시용 제목
      const newTitle = generateTitle(payload);

      const newCard = {
        ...payload,
        id: newId,
        createdAt: newCreatedAt,
        summonerName: payload.summonerName,
        description: payload.description,
        categoryId, // 저장해두면 필요할 수도 있음
        title: newTitle,
      };
      setCards((prev) => [newCard, ...prev]);
      setNoData(false);
    } catch (error) {
      console.error(error);
      alert("게시글 등록 중 오류 발생");
    }
  };

  // 프론트용 제목 생성 ("솔로랭크 탑 구함" 등)
  const generateTitle = (data) => {
    const { mode, myPosition, lookingForPosition } = data;
    // 인덱스를 한글로 변환
    const myPosText = (myPosition !== null) ? convertEnumToPositionText(convertIndexToPositionEnum(myPosition)) : "";
    const lookPosText = (lookingForPosition !== null) ? convertEnumToPositionText(convertIndexToPositionEnum(lookingForPosition)) : "";
    // 탭 구분
    const tabType = data.tabType || "member";
    const positionLabel = (tabType === "member") ? myPosText : lookPosText;
    const ending = (tabType === "member") ? "구함" : "감";
    return `${mode} ${positionLabel} ${ending}`;
  };

  // DB에서 불러온 데이터로 제목 생성
  // post.myPosition = "TOP" 등
  const generateTitleFromPost = (modeText, myPosEnum, lookPosEnum, tabType) => {
    const myPosText = myPosEnum ? convertEnumToPositionText(myPosEnum) : "";
    const lookPosText = lookPosEnum ? convertEnumToPositionText(lookPosEnum) : "";
    const positionLabel = (tabType === "member") ? myPosText : lookPosText;
    const ending = (tabType === "member") ? "구함" : "감";
    return `${modeText} ${positionLabel} ${ending}`;
  };

  return (
    <div className="findduo-container">
      <div className="findduo-title">
        <h1>듀오찾기</h1>
      </div>

      <div className="findduo-navbar">
        <div className="left-section">
          <button className="update-btn" onClick={() => window.location.reload()}>
            <img src={reloadIcon} alt="업데이트" className="icon-img" />
            업데이트
          </button>
          {/* 상단 필터(모드/랭크) + 포지션 아이콘 */}
          <div className="filters">
            <select className="filter-dropdown mode-filter">
              <option value="">전체</option>
              <option value="솔로랭크">솔로랭크</option>
              <option value="자유랭크">자유랭크</option>
              <option value="일반">일반</option>
              <option value="칼바람">칼바람</option>
            </select>
            <select className="filter-dropdown rank-filter">
              <option value="">상관없음</option>
              <option value="아이언">아이언</option>
              <option value="브론즈">브론즈</option>
              <option value="실버">실버</option>
              <option value="골드">골드</option>
              <option value="플래티넘">플래티넘</option>
              <option value="에메랄드">에메랄드</option>
              <option value="다이아">다이아</option>
              <option value="마스터">마스터</option>
              <option value="그랜드마스터">그랜드마스터</option>
              <option value="챌린저">챌린저</option>
            </select>
            <div className="filter-icons">
              <button className="icon-btn">
                <img src={anything_icon} alt="상관없음" />
              </button>
              <button className="icon-btn">
                <img src={top_icon} alt="TOP" />
              </button>
              <button className="icon-btn">
                <img src={jungle_icon} alt="Jungle" />
              </button>
              <button className="icon-btn">
                <img src={mid_icon} alt="MID" />
              </button>
              <button className="icon-btn">
                <img src={bottom_icon} alt="Bottom" />
              </button>
              <button className="icon-btn">
                <img src={support_icon} alt="Support" />
              </button>
            </div>
          </div>
        </div>
        <button className="write-btn" onClick={() => setIsModalOpen(true)}>
          글쓰기
        </button>
      </div>

      <div className="duo-card-container">
        {cards.length === 0 && noData ? (
          <div className="no-data-message">저장된 데이터가 없습니다.</div>
        ) : (
          cards.map((card) => <DuoCard key={card.id} card={card} />)
        )}
      </div>

      {isModalOpen &&
        ReactDOM.createPortal(
          <WriteModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            positionImages={positionImages}
            onSubmit={handleModalSubmit}
          />,
          document.body
        )}
    </div>
  );
}

export default FindDuo;
