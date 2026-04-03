import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const ReviewCard = ({ title, content, rating, date, image }) => {
  const stars = Math.max(0, Math.min(5, Math.round(rating / 2)))
  
  return (
    <div className='bg-zinc-900/50 border border-white/5 rounded-2xl p-6 md:px-8 flex flex-row items-center gap-6 w-full hover:bg-zinc-900 transition-colors group cursor-pointer'>
      
      {/* 왼쪽: 영화 포스터 (2:3 비율로 변경하여 잘림 방지) */}
      <div className='w-14 aspect-[2/3] rounded-lg bg-neutral-800 shrink-0 border border-white/5 overflow-hidden shadow-lg'>
        {image ? (
          <img src={image} alt={title} className='size-full object-cover group-hover:scale-110 transition-transform duration-500' />
        ) : (
          <div className='size-full flex items-center justify-center opacity-30'>
            <FontAwesomeIcon icon={faUser} className='text-xl' />
          </div>
        )}
      </div>
      
      {/* 오른쪽: 정보 그룹 (정식 폰트 적용) */}
      <div className='flex flex-col gap-1 flex-1 min-w-0 py-1'>
        <div className='flex justify-between items-center'>
          {/* 제목: 프리텐다드(font-serif), 가독성을 위한 크기 및 굵기 조정 */}
          <h4 className='font-serif font-bold text-zinc-50 text-lg leading-snug truncate'>{title}</h4>
          
        </div>

        {/* 별점 - 크기 키움 */}
        <div className='flex items-center gap-0.5'>
          <span className='text-primary-400 text-sm tracking-widest'>
            {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
          </span>
        </div>
        
        {/* 본문: 프리텐다드(font-serif) - 크기 키움 */}
        <p className='text-zinc-400 text-base font-serif truncate mt-0.5 leading-relaxed'>
          {content}
        </p>
        {/* 날짜: 프리텐다드(font-serif) */}
          <span className='text-[12px] text-zinc-500 font-serif shrink-0'>{date}</span>
      </div>

    </div>
  )
}

export default ReviewCard