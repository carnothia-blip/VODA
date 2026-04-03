import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPen } from '@fortawesome/free-solid-svg-icons'

const ReviewCard = ({ title, content, rating, date, image }) => {
  const stars = Math.max(0, Math.min(5, Math.round(rating / 2)))
  
  return (
    <div className='bg-zinc-900/50 border border-white/5 rounded-2xl p-6 md:px-8 flex flex-row items-center gap-6 w-full hover:bg-zinc-900 transition-colors group cursor-pointer'>
      
      {/* 왼쪽: 영화 포스터 자리 - 회색 배경에 사람 아이콘 (고정 디자인) */}
      <div className='w-14 aspect-[2/3] rounded-lg bg-neutral-800 shrink-0 border border-white/5 overflow-hidden shadow-lg flex items-center justify-center'>
        {image ? (
          <img src={image} alt={title} className='size-full object-cover group-hover:scale-110 transition-transform duration-500' />
        ) : (
          <div className='size-full flex items-center justify-center opacity-40 bg-neutral-800'>
            <FontAwesomeIcon icon={faUser} className='text-xl text-neutral-400' />
          </div>
        )}
      </div>
      
      {/* 중앙: 정보 그룹 */}
      <div className='flex flex-col gap-1 flex-1 min-w-0 py-1'>
        <div className='flex justify-between items-center'>
          <h4 className='font-serif font-bold text-zinc-50 text-xl leading-snug truncate'>{title}</h4>
        </div>

        <div className='flex items-center gap-0.5'>
          <span className='text-primary-400 text-sm tracking-widest'>
            {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
          </span>
        </div>
        
        <p className='text-zinc-400 text-base font-serif truncate mt-0.5 leading-relaxed'>
          {content}
        </p>
        <span className='text-[12px] text-zinc-500 font-serif shrink-0'>{date}</span>
      </div>

      {/* 오른쪽: 수정하기 버튼 */}
      <div className='shrink-0 ml-4 flex items-center justify-center pl-6 border-l border-white/10'>
        <button 
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          className='flex flex-col items-center gap-1.5 text-zinc-500 hover:text-primary-400 transition-colors font-serif font-medium cursor-pointer p-2'
        >
          <FontAwesomeIcon icon={faPen} className='text-sm' />
          <span className='text-xs'>수정하기</span>
        </button>
      </div>

    </div>
  )
}

export default ReviewCard
