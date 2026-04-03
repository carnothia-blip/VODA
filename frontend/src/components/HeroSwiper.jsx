import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules' // EffectFade 제거
import Hero from './Hero'

// Swiper 스타일
import 'swiper/css'
import 'swiper/css/pagination'
// import 'swiper/css/effect-fade' // 제거: 밀기 효과에는 필요 없음

/**
 * HeroSwiper: 여러 개의 Hero 컴포넌트를 오른쪽에서 왼쪽으로 밀며 전환
 */
const HeroSwiper = ({ items = [], type = 'movie' }) => {
  if (!items || items.length === 0) return null

  return (
    <section className='w-full h-[85vh] relative group'>
      <Swiper
        // modules에서 EffectFade를 제거하여 기본 'slide' 효과가 작동하게 합니다.
        modules={[Autoplay, Pagination]} 
        
        // effect='swipe' 대신 기본값인 'slide'를 사용합니다 (생략 가능).
        effect='slide' 
        
        speed={1000} // 1초 동안 부드럽게 옆으로 밀림
        autoplay={{
          delay: 6000, // 6초마다 전환
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        loop={true}
        className='size-full'
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <Hero
              id={item.id}
              type={type}
              title={item.title || item.name}
              overview={item.overview}
              backdrop={item.backdrop_path}
              rating={item.vote_average}
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
          transition: all 0.3s ease; /* 전환 시 부드러운 애니메이션 추가 */
        }
        .swiper-pagination-bullet-active {
          background: #8B5CF6 !important; /* VODA 포인트 컬러 */
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