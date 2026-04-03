import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { EP } from '../api/tmdb'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faInfoCircle, faStar, faXmark, faPlus, faHeart } from '@fortawesome/free-solid-svg-icons'
import DetailBtn from './DetailBtn'

/**
 * Hero 컴포넌트
 * @param {string} type - 'movie' | 'tv' | 'person' | 'home'
 * @param {number} id - 콘텐츠 ID
 * @param {string} subtitle - 상단 소제목
 * @param {string} title - 메인 제목
 * @param {string} overview - 설명 텍스트
 * @param {string} backdrop - 배경 이미지 경로
 * @param {string} poster - 포스터 이미지 경로 (인물용)
 * @param {number} rating - 평점
 * @param {Array} videos - TMDB videos 배열
 */
const Hero = ({ 
  type = 'movie', 
  id,
  subtitle, 
  title, 
  overview, 
  backdrop, 
  poster,
  rating,
  videos = []
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isTrailerOpen, setIsTrailerOpen] = useState(false)
  const [trailerKey, setTrailerKey] = useState(null)
  const [isWishlisted, setIsWishlisted] = useState(false)

  // 트레일러 및 예고편 찾기 (우선순위: Trailer > Teaser > Clip > YouTube 영상 전체)
  useEffect(() => {
    const findBestTrailer = (vids) => {
      if (!vids || vids.length === 0) return null
      
      // 1. 공식 트레일러 (YouTube)
      const officialTrailer = vids.find(v => v.type === 'Trailer' && v.site === 'YouTube' && v.official)
      if (officialTrailer) return officialTrailer.key

      // 2. 일반 트레일러 (YouTube)
      const trailer = vids.find(v => v.type === 'Trailer' && v.site === 'YouTube')
      if (trailer) return trailer.key

      // 3. 티저 (Teaser)
      const teaser = vids.find(v => v.type === 'Teaser' && v.site === 'YouTube')
      if (teaser) return teaser.key

      // 4. 하이라이트 또는 클립 (Clip/Featurette)
      const clip = vids.find(v => (v.type === 'Clip' || v.type === 'Featurette') && v.site === 'YouTube')
      if (clip) return clip.key

      // 5. 아무 유튜브 영상이나 첫 번째 거
      const anyYoutube = vids.find(v => v.site === 'YouTube')
      return anyYoutube ? anyYoutube.key : null
    }

    if (videos && videos.length > 0) {
      setTrailerKey(findBestTrailer(videos))
    } else if (id && type !== 'person' && type !== 'home') {
      EP.detail(type, id).then(res => {
        const vids = res.data.videos?.results
        setTrailerKey(findBestTrailer(vids))
      })
    }
  }, [videos, id, type])

  // "지금 시청하기" 핸들러
  const handleWatchNow = () => {
    if (trailerKey) {
      setIsTrailerOpen(true)
    } else {
      alert('준비된 트레일러가 없습니다.')
    }
  }

  // "상세 정보" 핸들러
  const handleMoreInfo = () => {
    const isAboutPage = location.pathname.includes(`/${type}/${id}`)
    
    if (isAboutPage) {
      // 이미 상세 페이지라면 시놉시스로 스크롤
      const synopsisEl = document.getElementById('synopsis')
      if (synopsisEl) {
        synopsisEl.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // 상세 페이지로 이동
      navigate(`/${type}/${id}`)
    }
  }
  
  // 1. 인물 페이지 전용 히어로 (블러 배경 + 좌측 사진)
  if (type === 'person') {
    return (
      <section className='relative w-full h-[600px] flex items-center overflow-hidden bg-[#0e0e13]'>
        {/* 배경: 인물 타입만 블러 처리 */}
        <div className='absolute inset-0'>
          <img 
            src={EP.bg(backdrop)} 
            alt='' 
            className='size-full object-cover object-top blur-[40px] opacity-50 scale-110' 
          />
          <div className='absolute inset-0 bg-linear-to-r from-[#0e0e13] via-[#0e0e13]/40 to-transparent' />
          <div className='absolute inset-0 bg-linear-to-t from-[#0e0e13] via-transparent to-transparent' />
        </div>

        <div className='relative z-10 w-full px-12 md:px-20 flex flex-row items-center gap-12 md:gap-20'>
          {/* 좌측: 3:4 인물 사진 */}
          {poster && (
            <div className='hidden md:block shrink-0 w-[320px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10'>
              <img 
                src={EP.img(poster, 'w500')} 
                alt={title} 
                className='size-full object-cover'
              />
            </div>
          )}

          {/* 우측: 텍스트 정보 */}
          <div className='flex flex-col items-start max-w-2xl'>
            {subtitle && (
              <p className='text-primary-400 text-lg font-bold tracking-[0.25em] uppercase mb-4 font-serif'>
                {subtitle}
              </p>
            )}
            <h1 className='text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight font-serif'>
              {title}
            </h1>
            {overview && (
              <p className='text-lg md:text-xl text-neutral-300 leading-relaxed font-serif font-medium line-clamp-6 whitespace-pre-wrap'>
                {overview}
              </p>
            )}
          </div>
        </div>
      </section>
    )
  }

  // 2. 기본/상세/홈 히어로 (블러 없음, 기존 스타일 유지)
  return (
    <section className='relative w-full h-[85vh] min-h-[700px] overflow-hidden'>
      <div className='absolute inset-0'>
        <img 
          src={EP.bg(backdrop)} 
          alt={title} 
          className='size-full object-cover object-top'
        />
        <div className='absolute inset-0 bg-linear-to-r from-[#0e0e13] via-[#0e0e13]/60 to-transparent' />
        <div className='absolute inset-0 bg-linear-to-t from-[#0e0e13] via-transparent to-transparent' />
      </div>

      <div className='relative h-full flex flex-col justify-center px-12 md:px-20 max-w-5xl gap-6'>
        {rating && (
          <div className='flex items-center gap-2 text-secondary-400 font-bold text-lg'>
            <FontAwesomeIcon icon={faStar} />
            <span>{rating.toFixed(1)}</span>
            <span className='text-neutral-500 text-sm font-normal ml-1'>/ 10</span>
          </div>
        )}

        <h1 className='text-6xl md:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl'>
          {title}
        </h1>

        <p className='text-lg md:text-xl text-neutral-300 leading-relaxed max-w-2xl line-clamp-3 drop-shadow-md font-serif font-medium'>
          {overview}
        </p>

        <div className='flex items-center gap-4 mt-4'>
          <DetailBtn
            label='지금 시청하기'
            icon={<FontAwesomeIcon icon={faPlay} />}
            variant='primary'
            onClick={handleWatchNow}
          />
          {/* 찜하기 버튼: 클릭 시 보라색으로 변경 */}
          <button
            onClick={() => setIsWishlisted(prev => !prev)}
            className={`flex items-center justify-center gap-2 rounded-full font-semibold px-7 py-3.5 transition-all duration-200 cursor-pointer active:scale-95 ${
              isWishlisted
                ? 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-lg shadow-primary-500/20'
                : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md'
            }`}
          >
            <span className='text-xl flex items-center'>
              <FontAwesomeIcon icon={isWishlisted ? faHeart : faPlus} />
            </span>
            <span className='font-serif tracking-tight'>
              {isWishlisted ? '찜!' : '찜하기'}
            </span>
          </button>
          <DetailBtn
            label='상세 정보'
            icon={<FontAwesomeIcon icon={faInfoCircle} />}
            variant='secondary'
            onClick={handleMoreInfo}
          />
        </div>
      </div>

      {/* 트레일러 모달 */}
      {isTrailerOpen && trailerKey && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-20'>
          <button 
            onClick={() => setIsTrailerOpen(false)}
            className='absolute top-10 right-10 text-white text-3xl hover:text-primary-400 transition-colors'
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <div className='w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10'>
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className='w-full h-full'
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default Hero
