import { Link } from 'react-router'
import { EP } from '../api/tmdb'

const RankCard = ({ rank, id, type = 'movie', title, poster, genre }) => {
  return (
    <Link to={`/${type}/${id}`} className='w-58 flex-shrink-0 relative block'>
      {/* 순위 숫자 (overflow-hidden 밖으로 이동하여 잘리지 않게 함) */}
      <span className='absolute -left-6 bottom-14 text-8xl font-bold text-white/80 font-sans drop-shadow-lg z-10'>
        {rank}
      </span>
      
      <div className='relative aspect-[2/3] rounded-3xl overflow-hidden'>
        <img 
          src={EP.img(poster)} 
          alt={title} 
          className='size-full object-cover' 
        />
        <div className='absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent'></div>
      </div>
      <div className='mt-2'>
        <h3 className='text-xl font-medium truncate text-zinc-50'>{title}</h3>
        <p className='text-sm text-zinc-400 mt-1'>{genre}</p>
      </div>
    </Link>
  )
}

export default RankCard