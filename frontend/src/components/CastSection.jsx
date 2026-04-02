import { Link } from 'react-router'
import { EP } from '../api/tmdb'

const CastSection = ({ cast = [] }) => {
  return (
    <section className='flex flex-col gap-12 w-full'>
      <div className='px-20'>
        <h2 className='text-neutral-50 text-5xl font-bold font-serif leading-tight'>
          주요 출연진
        </h2>
      </div>

      {/* 가로 스크롤 출연진 목록 */}
      <div className='flex gap-16 items-start overflow-x-auto px-20 pb-2 scrollbar-hide'>
        {cast.map((actor) => (
          <Link
            key={actor.id}
            to={`/person/${actor.id}`}
            className='flex flex-col items-center min-w-48 shrink-0'
          >
            {/* 프로필 이미지 — primary-400/30 테두리 + 원형 */}
            <div className='mb-6 border-4 border-primary-400/30 rounded-full p-2.5 size-40'>
              {actor.profile_path ? (
                <img
                  src={EP.img(actor.profile_path)}
                  alt={actor.name}
                  className='size-full rounded-full object-cover'
                />
              ) : (
                <div className='size-full rounded-full bg-neutral-800' />
              )}
            </div>

            {/* 배우 이름 */}
            <p className='text-white text-xl font-serif font-medium text-center leading-7 whitespace-nowrap'>
              {actor.name}
            </p>

            {/* 배역명 */}
            <p className='text-neutral-500 text-lg font-serif font-medium text-center leading-6 whitespace-nowrap'>
              {actor.character}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CastSection
