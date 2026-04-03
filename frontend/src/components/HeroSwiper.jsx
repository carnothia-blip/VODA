import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import Hero from './Hero'

// Swiper 스타일
import 'swiper/css'
import 'swiper/css/pagination'

/**
 * HeroSwiper: 로컬 비디오 배너를 포함하여 영화 리스트를 스와이프 형식으로 보여줍니다.
 */
const HeroSwiper = ({ items = [], type = 'movie' }) => {
  if (!items || items.length === 0) return null

  // 1. public/videos/banner.mp4를 사용하는 커스텀 데이터 정의
  const customBanner = {
    id: 'voda-original-banner',
    title: 'VODA Original',
    overview: '예술성을 담은 UI/UX 디자인과 요리의 정성을 더해 완성한 VODA만의 특별한 콘텐츠를 감상해 보세요.',
    bgVideo: '/videos/banner.mp4', // public 폴더 기준 경로
    vote_average: 10.0
  }

  // 2. 커스텀 배너를 배열의 맨 앞에 추가
  const finalItems = [customBanner, ...items]

  return (
    <section className='w-full h-[92vh] relative group'>
      <Swiper
        modules={[Autoplay, Pagination]} 
        effect='slide' 
        speed={1000} 
        autoplay={{
          delay: 6000, 
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        loop={true}
        className='size-full'
      >
        {finalItems.map((item) => (
          <SwiperSlide key={item.id}>
            <Hero
              id={item.id}
              type={type}
              title={item.title || item.name}
              overview={item.overview}
              backdrop={item.backdrop_path}
              rating={item.vote_average}
              // 3. Hero 컴포넌트에서 비디오를 재생할 수 있도록 속성 전달
              bgVideo={item.bgVideo} 
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 커스텀 페이지네이션 스타일링 */}
      <style>{`
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: #8B5CF6 !important; 
          opacity: 1;
          width: 30px;
          border-radius: 5px;
        }
        .swiper-pagination {
          bottom: 40px !important;
          text-align: right !important;
          padding-right: 5rem;
        }
      `}</style>
    </section>
  )
}

export default HeroSwiper