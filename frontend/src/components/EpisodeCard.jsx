import React from 'react'
import { EP } from '../api/tmdb'

/**
 * EpisodeCard 컴포넌트 (Figma: Card_ep, node-id: 362:7948)
 * * @param {number} ep - 에피소드 번호
 * @param {string} title - 에피소드 제목
 * @param {string} thumb - 썸네일 경로 (TMDB still_path)
 * @param {string} duration - 재생 시간 (예: 45분)
 * @param {string} overview - 에피소드 줄거리
 * @param {boolean} showStatus - 상태바 표시 여부 (기본값: false)
 * @param {number} progress - 시청 진행률 (0~100)
 */
const EpisodeCard = ({ 
  ep, 
  title, 
  thumb, 
  duration, 
  overview, 
  showStatus = false, 
  progress = 0 
}) => {
  return (
    <div className='flex gap-5 items-start w-full group cursor-pointer'>
      {/* 왼쪽: 썸네일 영역 (Lego 블록 A) */}
      <div className='relative w-64 aspect-video rounded-xl overflow-hidden flex-shrink-0 bg-zinc-800'>
        <img
          src={EP.img(thumb, 'w300')}
          alt={title}
          className='size-full object-cover transition-transform duration-300 group-hover:scale-105'
        />
        
        {/* 상태바 (Progress Bar) - showStatus가 true일 때만 노출 */}
        {showStatus && progress > 0 && (
          <div className='absolute bottom-0 left-0 w-full h-1 bg-zinc-900/80'>
            <div 
              className='h-full bg-primary-400 transition-all duration-500' 
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* 오른쪽: 콘텐츠 영역 (Lego 블록 B) */}
      <div className='flex-1 py-1'>
        {/* 에피소드 번호 (text-zinc-500, font-semibold) */}
        <span className='text-sm text-zinc-500 font-semibold'>
          EP {ep}
        </span>
        
        {/* 제목 (text-zinc-50, line-clamp-1) */}
        <h3 className='text-lg font-medium text-zinc-50 mt-0.5 line-clamp-1'>
          {title}
        </h3>
        
        {/* 설명 (text-zinc-400, line-clamp-2) */}
        <p className='text-sm text-zinc-400 line-clamp-2 mt-1 leading-relaxed'>
          {overview}
        </p>
        
        {/* 재생시간 (text-zinc-500, text-xs) */}
        <p className='text-xs text-zinc-500 mt-2 font-medium'>
          {duration}
        </p>
      </div>
    </div>
  )
}

export default EpisodeCard