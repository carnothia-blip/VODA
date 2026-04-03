import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faThumbsUp, faComment, faUser } from '@fortawesome/free-solid-svg-icons'

/**
 * 상세형 리뷰 카드 (ReviewCardS)
 * - 피그마 Review_s 노드 기반 (239:1860)
 * - 용도: ProfilePage, 상세 페이지의 메인 리뷰 영역
 * @param {string} author, avatar, date, rating, content, likeCount, replyCount, size
 */
const ReviewCardS = ({
  author,
  avatar,
  date,
  rating = 0,
  content,
  likeCount = 0,
  replyCount = 0,
  size = 'sm',
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  // 리뷰 내용이 100자 이상이거나 줄바꿈이 3번 이상인 경우 '더보기' 버튼 활성화 대상
  const isLong = content && (content.length > 100 || content.split('\n').length > 3)

  return (
    <div className={twMerge(
      'bg-zinc-900 flex flex-col gap-4 p-6 rounded-4xl w-full',
      size === 'lg' && 'p-8'
    )}>
      {/* 상단: 유저 정보 + 별점 */}
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-3'>
          <div className='size-12 rounded-full overflow-hidden bg-zinc-700 flex items-center justify-center shrink-0'>
            {avatar ? (
              <img src={avatar} alt={author} className='size-full object-cover' />
            ) : (
              <FontAwesomeIcon icon={faUser} className='text-zinc-500 text-lg' />
            )}
          </div>
          <div className='flex flex-col'>
            <span className='font-serif font-bold text-base text-zinc-50 leading-6'>{author}</span>
            <span className='font-serif font-medium text-sm text-zinc-400 leading-4'>{date}</span>
          </div>
        </div>

        <div className='flex items-center gap-1'>
          <FontAwesomeIcon icon={faStar} className='text-primary-400 text-sm' />
          <span className='font-sans font-bold text-lg text-primary-400'>{rating}</span>
        </div>
      </div>

      {/* 중단: 본문 */}
      <div className='flex flex-col items-start gap-1 w-full'>
        <p className={twMerge(
          'font-serif font-medium text-lg text-zinc-200 leading-7 w-full whitespace-pre-line',
          !isExpanded && 'line-clamp-3'
        )}>
          {content}
        </p>
        {isLong && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className='text-primary-400 font-serif font-bold text-sm hover:underline cursor-pointer mt-1'
          >
            {isExpanded ? '접기' : '더보기'}
          </button>
        )}
      </div>

      {/* 하단: 액션 버튼 */}
      <div className='flex items-center gap-5'>
        <button className='flex items-center gap-1.5 cursor-pointer group'>
          <FontAwesomeIcon icon={faThumbsUp} className='text-zinc-500 text-xs group-hover:text-primary-400 transition-colors' />
          <span className='font-serif text-sm text-zinc-500 group-hover:text-primary-400 transition-colors'>도움돼요 {likeCount}</span>
        </button>
        <button className='flex items-center gap-1.5 cursor-pointer group'>
          <FontAwesomeIcon icon={faComment} className='text-zinc-500 text-xs group-hover:text-primary-400 transition-colors' />
          <span className='font-serif text-sm text-zinc-500 group-hover:text-primary-400 transition-colors'>답글 {replyCount}</span>
        </button>
      </div>
    </div>
  )
}

export default ReviewCardS
