import { twMerge } from 'tailwind-merge'
import SectionTitle from './SectionTitle'
import MovieCard from './MovieCard'
import RankCard from './RankCard'
import HCard from './HCard'
import { EP } from '../api/tmdb'

/**
 * Feed 컴포넌트: 섹션 타이틀과 카드 리스트를 포함하는 공통 섹션
 * @param {string} type - 'normal' | 'rank' | 'play'
 * @param {string} title - 섹션 제목
 * @param {string} subtitle - 부제목 (subtitle로 명칭 통일)
 * @param {Array} items - 표시할 아이템 배열
 * @param {string} mediaType - 'movie' | 'tv'
 * @param {string} link - 이동할 경로 (기본값 #)
 */
const Feed = ({ type = 'normal', title, subtitle, items = [], mediaType = 'movie', link = '#' }) => {
  if (!items || items.length === 0) return null

  return (
    <section className='w-full'>
      {/* [수정] SectionTitle 규격에 맞게 props 전달 */}
      <SectionTitle 
        title={title} 
        subtitle={subtitle} 
        link={link} 
      />

      {/* 카드 리스트 (가로 스크롤) */}
      <div className={twMerge(
        'flex gap-6 overflow-x-auto pb-8 no-scrollbar pt-4',
        type === 'rank' && 'gap-10' 
      )}>
        {items.map((item, idx) => {
          // 공통 변수 추출
          const commonProps = {
            id: item.id,
            type: mediaType,
            title: item.title || item.name,
          }

          if (type === 'rank') {
            return (
              <RankCard
                key={`rank-${item.id}`}
                {...commonProps}
                rank={idx + 1}
                poster={EP.img(item.poster_path)}
                genre={item.genre_ids?.[0] ? '영화' : ''}
              />
            )
          }

          if (type === 'play') {
            return (
              <HCard
                key={`h-${item.id}`}
                {...commonProps}
                poster={EP.img(item.backdrop_path || item.poster_path, 'w500')}
                progress={item.progress || 30} // 이어보기 예시 데이터
                vote_average={item.vote_average}
              />
            )
          }

          // Default: normal
          return (
            <div key={`card-${item.id}`} className='min-w-72 md:min-w-80'>
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