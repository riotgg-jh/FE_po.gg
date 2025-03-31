import React from "react"
import "./../styles/duo_card.css"

function DuoCard({ card }) {
  const { createdAt, title, description, summonerName, tagLine } = card
  const timePostedText = getTimeAgoText(createdAt)
  const timeLeftText = getTimeLeftText(createdAt, 24)

  const handleCopy = () => {
    const fullName = `${summonerName}#${tagLine}`
    navigator.clipboard
      .writeText(fullName)
      .then(() => {
        alert("소환사명 복사 완료!")
      })
      .catch((err) => {
        console.error("복사 실패:", err)
      })
  }

  return (
    <div className="duo-card">
      <div className="duo-card-header">
        <span>{timePostedText} 전</span>
        <span>만료까지 {timeLeftText}</span>
      </div>
      <h3 className="duo-card-title">{title}</h3>
      <p className="duo-card-description">{description}</p>
      <div className="duo-card-footer">
        <div className="card-user-info">
          <span>
            {summonerName}#{tagLine}
          </span>
        </div>
        <button className="copy-btn" onClick={handleCopy}>
          복사하기
        </button>
      </div>
    </div>
  )
}

function getTimeAgoText(createdAt) {
  const created = new Date(createdAt).getTime()
  const now = Date.now()
  const diff = now - created
  const diffMinutes = Math.floor(diff / (1000 * 60))
  if (diffMinutes < 60) return `${diffMinutes}분`
  const diffHours = Math.floor(diffMinutes / 60)
  return `${diffHours}시간 ${diffMinutes % 60}분`
}

function getTimeLeftText(createdAt, expireHours) {
  const created = new Date(createdAt).getTime()
  const expire = created + expireHours * 60 * 60 * 1000
  const now = Date.now()
  const left = expire - now
  if (left <= 0) return "만료됨"
  const leftMinutes = Math.floor(left / (1000 * 60))
  const hours = Math.floor(leftMinutes / 60)
  const minutes = leftMinutes % 60
  return `${hours}시간 ${minutes}분`
}

export default DuoCard
