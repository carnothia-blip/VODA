import { Link } from 'react-router'
import { EP } from '../api/tmdb'

// badge 8종 스타일·라벨 매핑
const BADGE = {
  free:      { label: 'FREE',         cls: 'bg-zinc-50 text-zinc-950' },
  new:       { label: 'NEW',          cls: 'bg-green-500 text-white' },
  live:      { label: 'LIVE',         cls: 'bg-red-500 text-white' },
  찜:        { label: '♥ 찜',         cls: 'bg-primary-400 text-white' },
  개봉예정:  { label: '개봉예정',      cls: 'bg-zinc-800 text-zinc-50 border border-zinc-600' },
  curator:   { label: 'Curator Pick', cls: 'bg-amber-400 text-zinc-950' },
  voda_only: { label: 'VODA Only',    cls: 'bg-primary-400 text-white' },
}

// size sm = Card_mv360 (360px), md = Card_mv410 (410px)
const Card = ({ id, type = 'movie', title, poster, genre = '', badge = '기본', size = 'sm' }) => {
  const w = size === 'sm' ? 'w-card-sm' : 'w-card-md'
  const badgeInfo = BADGE[badge]

  return (
    <Link to={`/${type}/${id}`} className={`${w} flex-shrink-0 block`}>
      {/* 포스터 이미지 */}
      <div className='relative aspect-[2/3] rounded-3xl overflow-hidden'>
        {EP.img(poster) ? (
          <img
            src={EP.img(poster)}
            alt={title}
            className='size-full object-cover'
          />
        ) : (
          <div className='size-full bg-zinc-800 flex items-center justify-center'>
            <span className='text-zinc-400 text-sm'>No Image</span>
          </div>
        )}

        {/* badge — '기본'이거나 없으면 렌더 안 함 */}
        {badgeInfo && (
          <span className={`absolute top-4 right-4 text-sm font-semibold px-3 py-1.5 rounded-xl ${badgeInfo.cls}`}>
            {badgeInfo.label}
          </span>
        )}
      </div>

      {/* 제목 + 장르 */}
      <div className='mt-4 space-y-1'>
        <h3 className='text-zinc-50 text-2xl font-medium truncate'>{title}</h3>
        {genre && (
          <p className='text-zinc-400 text-xl'>{genre}</p>
        )}
      </div>
    </Link>
  )
}

export default Card
