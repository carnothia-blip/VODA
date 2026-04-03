import { twMerge } from 'tailwind-merge'
import SectionTitle from './SectionTitle'
import MovieCard from './MovieCard'
import RankCard from './RankCard'
import HCard from './HCard'
import PersonCard from './PersonCard'
import { EP } from '../api/tmdb'

/**
 * Feed 컴포넌트: 섹션 타이틀과 카드 리스트를 포함하는 공통 섹션
 * @param {string} type - 'normal' | 'rank' | 'play' | 'person'
 * @param {string} title - 섹션 제목
 * @param {string} subtitle - 부제목
 * @param {Array} items - 표시할 아이템 배열
 * @param {string} mediaType - 'movie' | 'tv' | 'person'
 * @param {string} link - 전체보기 이동 경로
 */
const Feed = ({
  type = 'normal',
  title,
  subtitle,
  items = [],
  mediaType = 'movie',
  link = '#',
}) => {
  if (!items || items.length === 0) return null

  return (
    <section className='w-full'>
      <SectionTitle title={title} subtitle={subtitle} link={link} />

      {/* 카드 리스트 (가로 스크롤) */}
      <div
        className={twMerge(
          'flex gap-6 overflow-x-auto pb-8 no-scrollbar pt-4',
          type === 'rank' && 'gap-10',
          type === 'person' && 'gap-8 px-2',
        )}
      >
        {items.map((item, idx) => {
          const commonProps = {
            id: item.id,
            type: mediaType,
            title: item.title || item.name,
          }

          if (type === 'person') {
            return (
              <div key={`person-${item.id}`} className='w-80 shrink-0'>
                <PersonCard
                  id={item.id}
                  name={item.name}
                  img={item.profile_path}
                  role={item.known_for_department}
                />
              </div>
            )
          }

          if (type === 'rank') {
            return (
              <RankCard
                key={`rank-${item.id}`}
                {...commonProps}
                rank={idx + 1}
                poster={EP.img(item.poster_path)}
                genre={item.genre_ids?.[0] ? (mediaType === 'tv' ? 'TV 시리즈' : '영화') : ''}
              />
            )
          }

          if (type === 'play') {
            return (
              <HCard
                key={`h-${item.id}`}
                {...commonProps}
                poster={EP.img(item.backdrop_path || item.poster_path, 'w500')}
                progress={item.progress || 30}
                vote_average={item.vote_average}
              />
            )
          }

          // normal
          return (
            <div key={`card-${item.id}`} className='min-w-80 w-80 shrink-0'>
              <MovieCard
                {...commonProps}
                genre={item.genre_ids?.[0]}
                year={(item.release_date || item.first_air_date)?.slice(0, 4)}
                posterUrl={EP.img(item.poster_path)}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Feed
