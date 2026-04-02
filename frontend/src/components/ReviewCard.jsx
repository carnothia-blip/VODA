/**
 * 기본형 리뷰 카드 (ReviewCard)
 * - 용도: AboutPage 등에서 간단한 리뷰 리스트용
 * @param {string} author - 작성자
 * @param {string} content - 리뷰 본문
 * @param {number} rating - 평점 (0~10)
 * @param {string} date - 작성일
 */
const ReviewCard = ({ author, content, rating, date }) => {
  const stars = Math.max(0, Math.min(5, Math.round(rating / 2)))
  
  return (
    <div className='bg-zinc-900/50 border border-white/5 rounded-2xl p-6'>
      <div className='flex justify-between items-center'>
        <h4 className='font-semibold text-zinc-50'>{author}</h4>
        <span className='text-sm text-zinc-500'>{date}</span>
      </div>
      <div className='mt-3 flex items-center gap-1'>
        <span className='text-primary-400 text-sm tracking-widest'>
          {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
        </span>
      </div>
      <p className='mt-3 text-zinc-300 text-sm line-clamp-3 leading-relaxed'>
        {content}
      </p>
    </div>
  )
}

export default ReviewCard
