import React, { useState } from "react"
import ReactDOM from "react-dom"
import "./../styles/find_duo.css"
import WriteModal from "./../components/WriteModal.js"

import anything_icon from "./../assets/position/anything.png"
import top_icon from "./../assets/position/Top_icon.png"
import mid_icon from "./../assets/position/Middle_icon.png"
import jungle_icon from "./../assets/position/Jungle_icon.png"
import bottom_icon from "./../assets/position/Bottom_icon.png"
import support_icon from "./../assets/position/Support_icon.png"

import reloadIcon from "./../assets/icons/reload.png"

function FindDuo() {
  const [visibleCards, setVisibleCards] = useState(12)
  const [totalCards, setTotalCards] = useState(18)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSeeMore = () => {
    setVisibleCards((prev) => prev + 12)
    setTotalCards((prev) => prev + 12)
  }

  const positionImages = [
    anything_icon,
    top_icon,
    mid_icon,
    jungle_icon,
    bottom_icon,
    support_icon,
  ]

  return (
    <div className="findduo-container">
      {/* 제목 */}
      <div className="findduo-title">
        <h1>듀오찾기</h1>
      </div>

      {/* 네비게이션 바 (필터 + 포지션 아이콘 선택 복구) */}
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
          </div>

          {/* 포지션 아이콘 선택 복구 */}
          <div className="filter-icons">
            {positionImages.map((image, index) => (
              <button key={index} className="icon-btn">
                <img src={image} alt={`포지션 ${index}`} />
              </button>
            ))}
          </div>
        </div>

        {/* 글쓰기 버튼 (모달 열기) */}
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

      {isModalOpen &&
        ReactDOM.createPortal(
          <WriteModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            positionImages={positionImages}
          />,
          document.body
        )}
    </div>
  )
}

export default FindDuo
