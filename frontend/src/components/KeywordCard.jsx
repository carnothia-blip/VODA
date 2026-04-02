import { EP } from '../api/tmdb'

/**
 * KeywordCard 컴포넌트
 * @param {string} title - 키워드 제목
 * @param {string} desc - 키워드 설명 (선택 사항)
 * @param {string} img - 배경 이미지 경로
 */
const KeywordCard = ({ title, desc, img }) => {
  return (
    <div className='relative w-110 h-56 rounded-3xl overflow-hidden flex-shrink-0 cursor-pointer group'>
      {/* 배경 이미지: TMDB 배경 규격 사용 (w780 또는 bg) */}
      <img
        src={EP.bg(img)}
        alt={title}
        className='absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
      />

      {/* 그라데이션 오버레이: 하단 텍스트 가독성 확보 */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent' />

      {/* 텍스트 컨텐츠: 좌측 하단 배치 */}
      <div className='absolute bottom-6 left-6 right-6'>
        <h3 className='text-2xl font-bold text-white font-sans tracking-tight'>
          {title}
        </h3>
        {desc && (
          <p className='text-sm text-zinc-300 mt-1 font-serif line-clamp-1'>
            {desc}
          </p>
        )}
      </div>
    </div>
  )
}

export default KeywordCard