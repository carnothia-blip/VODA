import { Link } from 'react-router'
import { EP } from '../api/tmdb'
import { twMerge } from 'tailwind-merge'

const FocusCard = ({ title, desc, avatars = [], totalCount = 0, to = '/person' }) => {
  // 표시할 아바타: 최대 3개
  const shown = avatars.slice(0, 3)
  // "+N" 카운터: 전체 인원 - 표시 아바타 수
  const extra = Math.max(totalCount - shown.length, 0)

  return (
    <Link
      to={to}
      className={twMerge(
        'bg-primary-950 border border-primary-400/20 rounded-4xl p-12 flex flex-col items-start justify-between w-full h-full min-h-[360px] group transition-transform duration-300 hover:-translate-y-2'
      )}
    >
      {/* 상단: 제목 + 설명 */}
      <div className='flex flex-col gap-3 w-full'>
        <h3 className='font-serif font-medium text-4xl text-neutral-50 leading-tight group-hover:text-primary-400 transition-colors'>
          {title}
        </h3>
        <p className='font-serif font-medium text-2xl text-neutral-400 leading-9 line-clamp-2'>
          {desc}
        </p>
      </div>

      {/* 하단: 아바타 스택 */}
      <div className='flex items-center mt-12'>
        {shown.map((person, idx) => (
          <div
            key={person.id ?? idx}
            className='size-[60px] rounded-full border-[3px] border-neutral-950 overflow-hidden shrink-0 -mr-[18px] relative z-10'
            style={{ zIndex: 10 - idx }} // 앞에 있는 이미지가 위로 오도록
          >
            <img
              src={person.photo ? EP.img(person.photo, 'w185') : ''}
              alt={person.name || '인물'}
              className={`size-full object-cover ${!person.photo && 'bg-neutral-800'}`}
            />
          </div>
        ))}

        {/* "+N" 카운터 */}
        {extra > 0 && (
          <div 
            className='size-[60px] rounded-full bg-neutral-800 border-[3px] border-neutral-950 flex items-center justify-center shrink-0 relative'
            style={{ zIndex: 0 }}
          >
            <span className='font-sans font-bold text-[15px] text-neutral-50 text-center'>
              +{extra}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}

export default FocusCard
