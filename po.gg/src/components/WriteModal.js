import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./../styles/WriteModal.css";

function WriteModal({ isOpen, onClose, positionImages = [] }) {
  const [activeTab, setActiveTab] = useState("member");
  const [selectedMode, setSelectedMode] = useState("솔로랭크");
  const [selectedPosition, setSelectedPosition] = useState(null);

  if (!isOpen) return null;

  const modalContent = (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>✖</button>

        {/* 탭 선택 */}
        <div className="modal-tabs">
          <button className={`tab-button ${activeTab === "member" ? "active" : ""}`} onClick={() => setActiveTab("member")}>
            멤버 찾기
          </button>
          <button className={`tab-button ${activeTab === "party" ? "active" : ""}`} onClick={() => setActiveTab("party")}>
            파티 찾기
          </button>
        </div>

        <div className="modal-body">
          {/* 왼쪽: 게임 모드 선택 */}
          <div className="modal-sidebar">
            {["솔로랭크", "자유랭크", "일반", "칼바람"].map((mode) => (
              <button
                key={mode}
                className={`sidebar-btn ${selectedMode === mode ? "active" : ""}`}
                onClick={() => setSelectedMode(mode)}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* 오른쪽: 입력 및 선택 필드 */}
          <div className="modal-main">
            <input type="text" className="input-field" placeholder="소환사명 입력" />

            {/* ✅ 포지션 선택 박스 */}
            <div className="position-selector">
              <p>{activeTab === "member" ? "찾고 있는 포지션" : "내가 가고 싶은 포지션"}</p>
              <div className="position-box">
                {positionImages.map((image, index) => (
                  <button 
                    key={index} 
                    className={`position-btn ${selectedPosition === index ? "selected" : ""}`}
                    onClick={() => setSelectedPosition(index)}
                  >
                    <img src={image} alt={`포지션 ${index}`} />
                  </button>
                ))}
              </div>
            </div>

            <textarea className="description-field" placeholder="내용 입력 (80자 이내)" maxLength={80}></textarea>
            <button className="submit-btn">등록하기</button>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}

export default WriteModal;
