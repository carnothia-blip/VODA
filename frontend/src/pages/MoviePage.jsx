import { useState, useEffect } from 'react'
import ChipBtn from '../components/ChipBtn'
import RankCard from '../components/RankCard'
import SectionTitle from '../components/SectionTitle'
import { EP } from '../api/tmdb'

const MoviePage = () => {
  const [activeTab, setActiveTab] = useState('전체')
  const [rankMovies, setRankMovies] = useState([])
  const genres = ['전체', '액션', '로맨스', '스릴러', 'SF', '코미디']

  useEffect(() => {
    EP.popular('movie').then((res) => {
      // 1위부터 10위까지만 사용
      setRankMovies(res.data.results.slice(0, 10))
    }).catch(console.error)
  }, [])

  return (
    <div className='bg-neutral-950 min-h-screen pb-24 text-white px-12 py-16'>
      <h1 className='text-3xl font-bold mb-8'>영화보다</h1>
      
      <div className='flex flex-wrap gap-3 mb-16'>
        {genres.map((genre) => (
          <ChipBtn
            key={genre}
            label={genre}
            active={activeTab === genre}
            onClick={() => setActiveTab(genre)}
          />
        ))}
      </div>

      <section>
        <SectionTitle title='지금 가장 뜨거운 영화' subtitle='Top 10 영화 순위' />
        <div className='flex gap-10 overflow-x-auto pb-12 pt-4 px-6 no-scrollbar'>
          {rankMovies.map((movie, idx) => (
            <RankCard
              key={movie.id}
              rank={idx + 1}
              id={movie.id}
              type='movie'
              title={movie.title}
              poster={movie.poster_path}
              genre={movie.genre_ids?.[0] ? '영화' : ''} // 실제 프로젝트에서는 장르 매핑 필요
            />
          ))}
        </div>
      </section>
      
    </div>
  )
}

export default MoviePage
