import { twMerge } from 'tailwind-merge'

// 기본 포스터 이미지 (TMDB 연동 전까지 사용)
const DEFAULT_POSTER = 'https://via.placeholder.com/360x540'

const MovieCard = ({ title, genre, year, badgeText, posterUrl, className }) => {
  return (
    <div className={twMerge('flex flex-col gap-4 items-start relative w-full', className)} data-name='MovieCard'>
      {/* 포스터 이미지 + 배지 영역 */}
      <div className='group relative aspect-[2/3] w-full overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer'>
        {/* 포스터 이미지: object-cover를 사용하여 비율 유지 */}
        <img 
          src={posterUrl || DEFAULT_POSTER} 
          alt={title || '영화 포스터'} 
          className='absolute inset-0 h-full w-full object-cover'
        />

        {/* 그라데이션 오버레이 (가독성용) */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

        {/* 배지 */}
        <div className='absolute left-4 top-4 bg-secondary-400 px-3 py-1 rounded-full z-10 shadow-sm'>
          <p className='font-serif font-semibold text-zinc-950 text-sm tracking-tight whitespace-nowrap'>
            {badgeText || 'VODA 추천'}
          </p>
        </div>
      </div>

      {/* 영화 정보 영역 */}
      <div className='flex flex-col gap-1 w-full mt-1'>
        {/* 영화 제목: 너비를 100%로 변경하여 짤림 방지 */}
        <h3 className='font-serif font-medium text-zinc-50 text-xl leading-snug truncate'>
          {title || '제목 없음'}
        </h3>

        {/* 장르 및 연도 */}
        <div className='flex items-center gap-2 font-serif font-normal text-zinc-400 text-base'>
          <p>{genre || '장르 미정'}</p>
          <span className='text-zinc-600'>•</span>
          <p>{year || '2024'}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard