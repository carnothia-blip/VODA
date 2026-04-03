import { useState } from 'react'
import { useParams } from 'react-router'
import { EP } from '../api/tmdb'
import useFetch from '../hooks/useFetch'
import Hero from '../components/Hero'
import Synopsis from '../components/Synopsis-ls'
import CastSection from '../components/CastSection'
import ScoreSummary from '../components/ScoreSummary'
import ReviewCardS from '../components/ReviewCardS'
import Feed from '../components/Feed'
import EpisodeSection from '../components/EpisodeSection'

/**
 * AboutPage - 콘텐츠 상세 정보 페이지 (영화/TV 공용)
 */
const AboutPage = () => {
  // 1. URL 파라미터 추출 (type: movie 또는 tv, id: 콘텐츠 ID)
  const { type, id } = useParams()
  const [showAll, setShowAll] = useState(false)

  // 2. 상세 데이터 호출 (credits, reviews, videos, similar 포함)
  const { data, loading, err } = useFetch(() => EP.detail(type, id), [type, id])

  // 2.5. 한국어 리뷰가 없는 경우가 많아 영어 리뷰 추가 호출
  const { data: enReviewsData } = useFetch(() => EP.reviews(type, id, 'en-US'), [type, id])

  // 3. TV 시리즈일 경우 시즌 1 에피소드 데이터 추가 호출
  const isTv = type === 'tv'
  const { data: seasonData } = useFetch(isTv ? () => EP.season(id, 1) : null, [isTv, id])

  // 로딩 및 에러 처리
  if (loading) return <div className='min-h-screen bg-neutral-950 flex items-center justify-center text-zinc-400'>Loading...</div>
  if (err || !data) return <div className='min-h-screen bg-neutral-950 flex items-center justify-center text-red-500'>데이터를 불러오는 중 오류가 발생했습니다.</div>

  // 리뷰 병합 (한국어 + 영어)
  const combinedReviews = [
    ...(data.reviews?.results || []),
    ...(enReviewsData?.results || [])
  ]
  // 중복 제거 (id 기준)
  const uniqueReviews = combinedReviews.filter((r, idx, self) => 
    idx === self.findIndex((t) => t.id === r.id)
  )

  return (
    <main className='bg-neutral-950 min-h-screen pb-20'>
      {/* 히어로 섹션: 배경 이미지 및 타이틀 표시 */}
      <Hero 
        type={type} 
        id={id}
        title={data.title || data.name}
        backdrop={data.backdrop_path}
        overview={data.overview}
        rating={data.vote_average}
        videos={data.videos?.results}
      />

      <div className='px-20 space-y-16 mt-12'>
        {/* 시놉시스 및 상세 정보 (장르, 출시일, 러닝타임) */}
        <div id='synopsis'>
          <Synopsis 
            overview={data.overview}
            genres={data.genres}
            country={data.production_countries?.[0]?.name}
            year={(data.release_date || data.first_air_date)?.slice(0, 4)}
            runtime={data.runtime || (data.episode_run_time && data.episode_run_time[0])}
            director={data.credits?.crew?.find(c => c.job === 'Director')}
            company={data.production_companies?.[0]?.name}
            cast={data.credits?.cast?.slice(0, 5).map(c => c.name)}
          />
        </div>

        {/* 출연진 섹션 (최대 10명 표시) */}
        <CastSection cast={data.credits?.cast?.slice(0, 10)} />

        {/* TV 시리즈 전용 에피소드 목록 섹션 */}
        {isTv && seasonData && (
          <EpisodeSection 
            episodes={seasonData.episodes} 
            showTitle={data.name} 
          />
        )}

        {/* 평점 및 리뷰 통합 섹션 */}
        <section className='grid grid-cols-1 lg:grid-cols-3 gap-12 items-start pt-6'>
          {/* 좌측: 평점 요약 (1/3 너비) - 배경 제거 */}
          <div className='lg:col-span-1 flex flex-col justify-start'>
            <ScoreSummary 
              avg={data.vote_average} 
              count={data.vote_count} 
              reviews={uniqueReviews}
            />
          </div>

          {/* 우측: 주요 리뷰 (2/3 너비) */}
          <div className='lg:col-span-2 flex flex-col gap-5'>
            {(showAll ? uniqueReviews : uniqueReviews.slice(0, 2)).map(review => (
              <ReviewCardS 
                key={review.id}
                author={review.author}
                avatar={EP.img(review.author_details?.avatar_path, 'w200')}
                date={new Date(review.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                rating={review.author_details?.rating}
                content={review.content}
              />
            ))}

            {/* 리뷰 더보기/접기 버튼 */}
            {uniqueReviews.length > 2 && (
              <button 
                onClick={() => setShowAll(!showAll)}
                className='w-full py-5 rounded-4xl border border-white/5 bg-zinc-900/50 text-zinc-400 font-serif text-lg hover:bg-zinc-900 hover:text-primary-400 transition-all cursor-pointer'
              >
                {showAll ? '리뷰 접기' : `리뷰 더보기 (${uniqueReviews.length - 2}개 더 있음)`}
              </button>
            )}

            {uniqueReviews.length === 0 && (
              <div className='bg-zinc-900/30 rounded-4xl p-20 text-center border border-white/5 h-full flex items-center justify-center'>
                <p className='text-zinc-500 text-xl font-serif'>작성된 리뷰가 아직 없습니다.</p>
              </div>
            )}
          </div>
        </section>

        {/* 하단 비슷한 작품 피드 */}
        <Feed 
          type='normal' 
          title='비슷한 작품' 
          items={data.similar?.results?.map(item => ({ ...item, type }))} 
        />
      </div>

    </main>
  )
}

export default AboutPage