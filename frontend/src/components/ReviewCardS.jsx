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
  return (
    <div className={twMerge(
      'bg-zinc-900 flex flex-col gap-6 p-9 rounded-4xl w-full',
      size === 'lg' && 'p-12'
    )}>
      {/* 상단: 유저 정보 + 별점 */}
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-4'>
          <div className='size-16 rounded-full overflow-hidden bg-zinc-700 flex items-center justify-center shrink-0'>
            {avatar ? (
              <img src={avatar} alt={author} className='size-full object-cover' />
            ) : (
              <FontAwesomeIcon icon={faUser} className='text-zinc-500 text-2xl' />
            )}
          </div>
          <div className='flex flex-col'>
            <span className='font-serif font-bold text-xl text-zinc-50 leading-8'>{author}</span>
            <span className='font-serif font-medium text-lg text-zinc-400 leading-6'>{date}</span>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <FontAwesomeIcon icon={faStar} className='text-primary-400 text-lg' />
          <span className='font-sans font-bold text-2xl text-primary-400'>{rating}</span>
        </div>
      </div>

      {/* 중단: 본문 */}
      <p className='font-serif font-medium text-2xl text-zinc-200 leading-10 w-full'>
        {content}
      </p>

      {/* 하단: 액션 버튼 */}
      <div className='flex items-center gap-6'>
        <button className='flex items-center gap-2 cursor-pointer group'>
          <FontAwesomeIcon icon={faThumbsUp} className='text-zinc-400 text-sm group-hover:text-primary-400 transition-colors' />
          <span className='font-serif text-lg text-zinc-400 group-hover:text-primary-400 transition-colors'>도움돼요 {likeCount}</span>
        </button>
        <button className='flex items-center gap-2 cursor-pointer group'>
          <FontAwesomeIcon icon={faComment} className='text-zinc-400 text-sm group-hover:text-primary-400 transition-colors' />
          <span className='font-serif text-lg text-zinc-400 group-hover:text-primary-400 transition-colors'>답글 {replyCount}</span>
        </button>
      </div>
    </div>
  )
}

export default ReviewCardS
