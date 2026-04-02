import { useState, useEffect } from 'react'
import ChipBtn from '../components/ChipBtn'
import RankCard from '../components/RankCard'
import SectionTitle from '../components/SectionTitle'
import { EP } from '../api/tmdb'

const TVPage = () => {
  const [activeTab, setActiveTab] = useState('인기순')
  const [rankTvShows, setRankTvShows] = useState([])
  const categories = ['인기순', '방영 중', '오늘의 화제작', '높은 평점', '드라마', '애니메이션']

  useEffect(() => {
    EP.popular('tv').then((res) => {
      // 1위부터 10위까지만 사용
      setRankTvShows(res.data.results.slice(0, 10))
    }).catch(console.error)
  }, [])

  return (
    <div className='bg-neutral-950 min-h-screen pb-24 text-white px-12 py-16'>
      <h1 className='text-3xl font-bold mb-8'>TV 시리즈</h1>
      
      <div className='flex flex-wrap gap-3 mb-16'>
        {categories.map((cat) => (
          <ChipBtn
            key={cat}
            label={cat}
            active={activeTab === cat}
            onClick={() => setActiveTab(cat)}
          />
        ))}
      </div>

      <section>
        <SectionTitle title='지금 가장 뜨거운 TV 시리즈' subtitle='Top 10 시리즈 순위' />
        <div className='flex gap-10 overflow-x-auto pb-12 pt-4 px-6 no-scrollbar'>
          {rankTvShows.map((tv, idx) => (
            <RankCard
              key={tv.id}
              rank={idx + 1}
              id={tv.id}
              type='tv'
              title={tv.name} // TV 시리즈는 title 대신 name 사용
              poster={tv.poster_path}
              genre={tv.genre_ids?.[0] ? 'TV 시리즈' : ''} // 실제 프로젝트에서는 장르 매핑 필요
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default TVPage
