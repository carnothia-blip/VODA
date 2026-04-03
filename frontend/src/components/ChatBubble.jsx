import React, { useState, useEffect } from 'react'

/**
 * VODA AI 챗봇 대화 말풍선 컴포넌트
 * @param {string} msg - 메시지 내용
 * @param {boolean} isAi - AI 메시지 여부 (true: AI, false: 사용자)
 * @param {boolean} animate - 타이핑 효과 사용 여부
 */
const ChatBubble = ({ msg, isAi, animate = false }) => {
  const [displayText, setDisplayText] = useState(animate ? '' : msg)

  useEffect(() => {
    if (!animate || !isAi || msg === '...') {
      setDisplayText(msg)
      return
    }

    let index = 0
    setDisplayText('') // 초기화
    
    const interval = setInterval(() => {
      if (index < msg.length) {
        setDisplayText((prev) => prev + msg.charAt(index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 20) // 타이핑 속도 (낮을수록 빠름)

    return () => clearInterval(interval)
  }, [msg, isAi, animate])

  if (isAi) {
    return (
      <div className='flex items-start gap-3 w-full'>
        <div className='bg-zinc-800 rounded-2xl rounded-tl-sm px-5 py-3 text-zinc-200 max-w-2xl font-serif leading-relaxed whitespace-pre-wrap break-words border border-white/5'>
          {displayText}
        </div>
      </div>
    )
  }

  return (
    <div className='flex justify-end w-full'>
      <div className='bg-primary-500 rounded-2xl rounded-tr-sm px-5 py-3 text-white max-w-2xl font-serif leading-relaxed whitespace-pre-wrap break-words shadow-lg shadow-primary-500/20'>
        {msg}
      </div>
    </div>
  )
}

export default ChatBubble
