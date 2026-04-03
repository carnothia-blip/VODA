import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { EP } from '../api/tmdb'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faPlay, 
  faInfoCircle, 
  faStar, 
  faXmark, 
  faPlus, 
  faHeart, 
  faChevronLeft 
} from '@fortawesome/free-solid-svg-icons'
import DetailBtn from './DetailBtn'

const Hero = ({ 
  type = 'movie', 
  id,
  subtitle, 
  title, 
  overview, 
  backdrop, 
  poster,
  rating,
  videos = [],
  bgVideo // 직접 만든 영상 파일 URL
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isTrailerOpen, setIsTrailerOpen] = useState(false)
  const [trailerKey, setTrailerKey] = useState(null)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    const findBestTrailer = (vids) => {
      if (!vids || vids.length === 0) return null
      const officialTrailer = vids.find(v => v.type === 'Trailer' && v.site === 'YouTube' && v.official)
      if (officialTrailer) return officialTrailer.key
      const trailer = vids.find(v => v.type === 'Trailer' && v.site === 'YouTube')
      if (trailer) return trailer.key
      const anyYoutube = vids.find(v => v.site === 'YouTube')
      return anyYoutube ? anyYoutube.key : null
    }

    if (videos && videos.length > 0) {
      setTrailerKey(findBestTrailer(videos))
    } else if (id && !['person', 'home'].includes(type)) {
      const apiType = type === 'detail' ? location.pathname.split('/')[1] : type
      EP.detail(apiType, id).then(res => {
        const vids = res?.data?.videos?.results
        setTrailerKey(findBestTrailer(vids))
      }).catch(() => null)
    }
  }, [videos, id, type, location.pathname])

  const handleWatchNow = () => {
    if (trailerKey) setIsTrailerOpen(true)
    else alert('준비된 트레일러가 없습니다.')
  }

  const handleMoreInfo = () => {
    navigate(`/${type}/${id}`)
  }

  // 배경 렌더링 (비디오 우선)
  const renderBackground = () => (
    <div className='absolute inset-0'>
      {bgVideo ? (
        <video 
          src={bgVideo} 
          autoPlay 
          muted 
          loop 
          playsInline 
          className='size-full object-cover object-top'
        />
      ) : trailerKey ? (
        <div className='size-full scale-150 pointer-events-none'>
          <iframe 
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&playlist=${trailerKey}&controls=0&showinfo=0&rel=0&iv_load_policy=3&origin=${window.location.origin}`}
            className='size-full'
            allow='autoplay; encrypted-media'
          />
        </div>
      ) : (
        <img src={EP.bg(backdrop)} alt={title} className='size-full object-cover object-top' />
      )}
      <div className='absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/60 to-transparent' />
      <div className='absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent' />
    </div>
  )

  // 트레일러 모달 렌더링 함수
  const renderTrailerModal = () => (
    isTrailerOpen && trailerKey && (
      <div className='fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 md:p-20'>
        <button onClick={() => setIsTrailerOpen(false)} className='absolute top-10 right-10 text-white text-3xl hover:text-primary-400 cursor-pointer z-[70]'>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className='w-full max-w-6xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl'>
          <iframe 
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`} 
            className='w-full h-full' 
            allow='autoplay; fullscreen' 
            title="Trailer" 
          />
        </div>
      </div>
    )
  )
  
  // 1. 인물 페이지 레이아웃
  if (type === 'person') {
    return (
      <section className='relative w-full h-150 flex items-center overflow-hidden bg-zinc-950 text-white'>
        <div className='absolute inset-0'>
          <img src={EP.bg(backdrop)} alt='' className='size-full object-cover object-top blur-2xl opacity-50 scale-110' />
          <div className='absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/40 to-transparent' />
          <div className='absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent' />
        </div>
        <div className='relative z-10 w-full px-12 md:px-20 flex flex-row items-center gap-12 md:gap-20'>
          {poster && (
            <div className='hidden md:block shrink-0 w-80 aspect-3/4 rounded-2xl overflow-hidden shadow-2xl border border-white/10'>
              <img src={EP.img(poster, 'w500')} alt={title} className='size-full object-cover' />
            </div>
          )}
          <div className='flex flex-col items-start max-w-2xl text-left'>
            {subtitle && <p className='text-primary-400 text-lg font-bold tracking-widest uppercase mb-4 font-serif'>{subtitle}</p>}
            <h1 className='text-6xl md:text-7xl font-bold mb-6 font-serif leading-tight'>{title}</h1>
            {overview && <p className='text-lg md:text-xl text-zinc-300 leading-relaxed font-serif line-clamp-6 whitespace-pre-wrap'>{overview}</p>}
          </div>
        </div>
      </section>
    )
  }

  // 2. 상세 페이지 또는 기본/홈 히어로 레이아웃
  return (
    <section className='relative w-full h-[85vh] min-h-175 overflow-hidden text-white'>
      {renderBackground()}

      {type === 'detail' && (
        <button 
          onClick={() => navigate(-1)}
          className='absolute top-32 left-12 md:left-20 z-20 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-pointer group'
        >
          <FontAwesomeIcon icon={faChevronLeft} className='group-hover:-translate-x-1 transition-transform' />
          <span className='font-medium'>뒤로가기</span>
        </button>
      )}

      <div className='relative h-full flex flex-col justify-center px-12 md:px-20 max-w-5xl gap-6'>
        {rating && (
          <div className='flex items-center gap-2 text-secondary-400 font-bold text-lg'>
            <FontAwesomeIcon icon={faStar} />
            <span>{rating.toFixed(1)}</span>
          </div>
        )}
        <h1 className='text-6xl md:text-8xl font-bold tracking-tighter drop-shadow-2xl font-serif leading-none'>{title}</h1>
        <p className='text-lg md:text-xl text-zinc-300 leading-relaxed max-w-2xl line-clamp-3 font-serif font-medium'>{overview}</p>
        
        <div className='flex items-center gap-4 mt-4'>
          <DetailBtn label='지금 시청하기' icon={<FontAwesomeIcon icon={faPlay} />} variant='primary' onClick={handleWatchNow} />
          <button
            onClick={() => setIsWishlisted(prev => !prev)}
            className={`flex items-center justify-center gap-2 rounded-full font-semibold px-7 py-3.5 transition-all ${isWishlisted ? 'bg-primary-500 text-white border-primary-500' : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md'}`}
          >
            <FontAwesomeIcon icon={isWishlisted ? faHeart : faPlus} />
            <span className='font-serif'>{isWishlisted ? '찜!' : '찜하기'}</span>
          </button>
          {type !== 'detail' && (
            <DetailBtn label='상세 정보' icon={<FontAwesomeIcon icon={faInfoCircle} />} variant='secondary' onClick={handleMoreInfo} />
          )}
        </div>
      </div>
      {renderTrailerModal()}
    </section>
  )
}

export default Hero
