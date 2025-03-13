import React, { useState } from "react";
import "./../styles/find_duo.css";
import WriteModal from "./../components/WriteModal.js"; // ✅ 오타 수정

import anything_icon from "./../assets/position/anything.png";
import top_icon from "./../assets/position/Top_icon.png";
import mid_icon from "./../assets/position/Middle_icon.png";
import jungle_icon from "./../assets/position/Jungle_icon.png";
import bottom_icon from "./../assets/position/Bottom_icon.png";
import support_icon from "./../assets/position/Support_icon.png";

import reloadIcon from "./../assets/icons/reload.png";

function FindDuo() {
  const [visibleCards, setVisibleCards] = useState(12);
  const [totalCards, setTotalCards] = useState(18);
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ 팝업 상태 추가

  const handleSeeMore = () => {
    setVisibleCards((prev) => prev + 12);
    setTotalCards((prev) => prev + 12);
  };

  return (
    <div className="findduo-container">
      {/* 제목 */}
      <div className="findduo-title">
        <h1>듀오찾기</h1>
      </div>

      {/* 네비게이션 바 */}
      <div className="findduo-navbar">
        <div className="left-section">
          <button className="update-btn">
            <img src={reloadIcon} alt="업데이트" className="icon-img" />
            업데이트
          </button>

          <div className="filters">
            <select className="filter-dropdown">
              <option>모든 큐</option>
              <option>일반게임</option>
              <option>솔로랭크</option>
              <option>자유랭크</option>
              <option>무작위총력전</option>
            </select>
            <select className="filter-dropdown">
              <option>모든 티어</option>
              <option>아이언</option>
              <option>브론즈</option>
              <option>실버</option>
              <option>골드</option>
              <option>플래티넘</option>
              <option>에메랄드</option>
              <option>다이아몬드</option>
              <option>마스터</option>
              <option>그랜드마스터</option>
              <option>챌린저</option>
            </select>

            <div className="filter-icons">
              <button className="icon-btn">
                <img src={anything_icon} alt="상관없음" />
              </button>
              <button className="icon-btn">
                <img src={top_icon} alt="탑" />
              </button>
              <button className="icon-btn">
                <img src={mid_icon} alt="미드" />
              </button>
              <button className="icon-btn">
                <img src={jungle_icon} alt="정글" />
              </button>
              <button className="icon-btn">
                <img src={bottom_icon} alt="바텀" />
              </button>
              <button className="icon-btn">
                <img src={support_icon} alt="서폿" />
              </button>
            </div>
          </div>
        </div>

        {/* 오른쪽: 글쓰기 버튼 (onClick 추가) */}
        <button className="write-btn" onClick={() => setIsModalOpen(true)}>
          글쓰기
        </button>
      </div>

      {/* 듀오 카드 리스트 */}
      <div className="duo-card-container">
        {[...Array(totalCards)].map(
          (_, index) =>
            index < visibleCards && <div key={index} className="duo-card"></div>
        )}
      </div>

      {/* "더보기" 버튼 */}
      <div className="see-more-container" onClick={handleSeeMore}>
        <p className="see-more-text">더보기</p>
      </div>

      {/* 팝업 컴포넌트 */}
      <WriteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default FindDuo;
