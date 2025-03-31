import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./../styles/WriteModal.css";

/**
 * 단일 선택: myPosition / lookingForPosition 모두 하나의 인덱스를 문자열 enum으로 변환
 * "positionid"는 고정값("ACTIVE")으로 전송하므로, 여기서는 별도 입력 X
 */
function WriteModal({ isOpen, onClose, positionImages = [], onSubmit }) {
  const [activeTab, setActiveTab] = useState("member");  // "member" or "party"
  const [selectedMode, setSelectedMode] = useState("솔로랭크");
  const [myPosition, setMyPosition] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);

  const [tagLine, setTagLine] = useState("");
  const [summonerName, setSummonerName] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!summonerName || !tagLine) {
      alert("소환사명과 태그를 입력해주세요.");
      return;
    }
    // 단일 문자열 + positionid:"ACTIVE"는 find_duo.js에서 처리
    const payload = {
      summonerName,
      tagLine,
      mode: selectedMode,        // "솔로랭크" 등
      tabType: activeTab,        // "member" or "party"
      myPosition: activeTab === "member" ? myPosition : null, 
      lookingForPosition: selectedPosition,
      description,
    };
    onSubmit(payload);
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>✖</button>
        <div className="modal-tabs">
          <button
            className={`tab-button ${activeTab === "member" ? "active" : ""}`}
            onClick={() => setActiveTab("member")}
          >
            멤버 찾기
          </button>
          <button
            className={`tab-button ${activeTab === "party" ? "active" : ""}`}
            onClick={() => setActiveTab("party")}
          >
            파티 찾기
          </button>
        </div>
        <div className="modal-body">
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
          <div className="modal-main">
            <div className="summoner-tag-wrapper">
              <input
                type="text"
                className="input-field"
                placeholder="소환사명 입력"
                value={summonerName}
                onChange={(e) => setSummonerName(e.target.value)}
              />
              <input
                type="text"
                className="tag-field"
                placeholder="#TAG"
                maxLength={5}
                value={tagLine}
                onChange={(e) => setTagLine(e.target.value)}
              />
            </div>

            {activeTab === "member" && (
              <div className="position-selector">
                <p className="position-title">나의 포지션</p>
                <div className="position-box">
                  {positionImages.map((image, index) => (
                    <button
                      key={index}
                      className={`position-btn ${myPosition === index ? "selected" : ""}`}
                      onClick={() => setMyPosition(index)}
                    >
                      <img src={image} alt={`포지션 ${index}`} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="position-selector">
              <p className="position-title">
                {activeTab === "member" ? "찾고 있는 포지션" : "내가 가고 싶은 포지션"}
              </p>
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

            <textarea
              className="description-field"
              placeholder="내용 입력 (80자 이내)"
              maxLength={80}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <button className="submit-btn" onClick={handleSubmit}>
              등록하기
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default WriteModal;
