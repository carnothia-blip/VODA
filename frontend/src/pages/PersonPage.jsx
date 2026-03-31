import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPaperPlane,
  faChevronRight,
  faRobot,
  faClapperboard,
} from '@fortawesome/free-solid-svg-icons'

// 임시 배우 더미 데이터 (TMDB 연동 전)
const DUMMY_ACTORS = [
  { id: 1, name: '류준열', role: 'Actor', movies: ['극한직업', '돈'] },
  { id: 2, name: '전도연', role: 'Actress', movies: ['밀양', '도희야'] },
  { id: 3, name: '마동석', role: 'Actor', movies: ['범죄도시', '부산행'] },
  { id: 4, name: '김고은', role: 'Actress', movies: ['도깨비', '유열의 음악앨범'] },
]

const TABS = ['전체', '오늘 트렌딩', '이번주 트렌딩', '인기 인물 전체', '인기 배우', '인기 감독']

// 배우 프로필 카드
const ActorCard = ({ actor }) => {
  return (
    <Link to={`/people/${actor.id}`} className='w-[324px] flex-shrink-0 flex flex-col group'>
      {/* 포트레이트 */}
      <div className='relative w-full h-[486px] rounded-lg overflow-hidden bg-[#25252d]'>
        {/* 이미지 자리 (TMDB 연동 시 실제 이미지로 교체) */}
        <div className='w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300'>
          <FontAwesomeIcon icon={faClapperboard} className='text-[#71717a] text-5xl' />
        </div>
        {/* 그라데이션 오버레이 */}
        <div className='absolute inset-0 bg-gradient-to-t from-[#25252d] via-transparent to-transparent' />
        {/* 순위 배지 */}
        <div className='absolute top-4 left-4 bg-[#a78bfa]/20 border border-[#a78bfa]/40 rounded px-2 py-1'>
          <span className='text-[#a78bfa] text-xs font-semibold'>#{actor.id}</span>
        </div>
      </div>

      {/* 정보 */}
      <div className='pt-4 flex flex-col gap-2'>
        <h3 className='text-[#fafafa] text-xl font-bold group-hover:text-[#a78bfa] transition-colors'>{actor.name}</h3>
        <span className='text-[#a78bfa] text-sm font-medium'>{actor.role}</span>
        <div className='flex gap-2 flex-wrap'>
          {actor.movies.map((movie) => (
            <span
              key={movie}
              className='text-[#a1a1aa] text-xs border border-[#3f3f46] rounded px-2 py-1'
            >
              {movie}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

const PersonPage = () => {
  const [activeTab, setActiveTab] = useState('전체')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className='min-h-screen bg-[#0e0e13] relative overflow-hidden'>
      {/* 배경 앰비언트 글로우 */}
      <div className='absolute top-[200px] left-[200px] w-[750px] h-[750px] rounded-full bg-[#a78bfa]/10 blur-[180px] pointer-events-none' />

      {/* Hero Section */}
      <section className='relative w-full pt-20 pb-16 px-12'>
        <div className='max-w-[1664px] mx-auto flex flex-col gap-6'>
          {/* 서브 레이블 */}
          <span className='text-[#a78bfa] text-sm font-semibold tracking-widest uppercase'>
            Ethereal Profiles
          </span>

          {/* 메인 타이틀 */}
          <h1 className='text-[#fafafa] text-[80px] font-bold leading-tight tracking-tight'>
            사람을 보다
          </h1>

          {/* 설명 */}
          <p className='text-[#a1a1aa] text-base max-w-[1077px]'>
            VODA가 주목하는 스크린 뒤의 빛나는 주역들. 시대를 대표하는 배우와 감독들을 만나보세요.
          </p>

          {/* 검색바 */}
          <div className='mt-4 w-[1152px] bg-[#18181b] border border-white/10 rounded-xl px-8 py-5 flex items-center gap-4 shadow-lg shadow-black/40'>
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='궁금한 영화나 TV 프로그램을 물어보세요.'
              className='flex-1 bg-transparent text-[#fafafa] text-sm outline-none placeholder:text-[#ddd6fe]'
            />
            <button className='w-[72px] h-[72px] -my-5 bg-[#c4b5fd] rounded-lg flex items-center justify-center hover:bg-[#a78bfa] transition-colors flex-shrink-0'>
              <FontAwesomeIcon icon={faPaperPlane} className='text-[#27272a] text-lg' />
            </button>
          </div>
        </div>
      </section>

      {/* People Tabs */}
      <div className='w-full bg-[#18181b] border-y border-white/5'>
        <div className='max-w-[1664px] mx-auto px-12'>
          <div className='flex items-center gap-2 h-[64px]'>
            {TABS.map((tab) => {
              const active = activeTab === tab
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-[#a78bfa] text-[#2e1065]'
                      : 'bg-[#27272a] text-[#a1a1aa] hover:text-[#fafafa]'
                  }`}
                >
                  {tab}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Trend People Section */}
      <section className='w-full py-12 px-12'>
        <div className='max-w-[1664px] mx-auto'>
          {/* 섹션 헤더 */}
          <div className='flex items-center justify-between mb-10'>
            <div className='flex items-center gap-3'>
              <div className='w-[12px] h-[48px] bg-[#a78bfa] rounded-sm' />
              <div>
                <h2 className='text-[#fafafa] text-2xl font-bold'>오늘 트렌딩 인물</h2>
                <p className='text-[#a1a1aa] text-sm mt-1'>매주 찾아오는 큐레이터의 무료 영화 선물</p>
              </div>
            </div>
            <Link to='/people/category' className='flex items-center gap-1 text-[#a78bfa] text-sm hover:text-[#c4b5fd] transition-colors'>
              전체보기
              <FontAwesomeIcon icon={faChevronRight} className='text-xs' />
            </Link>
          </div>

          {/* 배우 카드 그리드 */}
          <div className='flex gap-6'>
            {DUMMY_ACTORS.map((actor) => (
              <ActorCard key={actor.id} actor={actor} />
            ))}
          </div>
        </div>
      </section>

      {/* Focus Section */}
      <section className='w-full py-12 px-12'>
        <div className='max-w-[1664px] mx-auto'>
          {/* 섹션 헤더 */}
          <div className='flex items-center justify-between mb-8'>
            <div className='flex items-center gap-3'>
              <div className='w-[12px] h-[48px] bg-[#a78bfa] rounded-sm' />
              <h2 className='text-[#fafafa] text-2xl font-bold'>이달의 포커스</h2>
            </div>
            <Link to='/people/category' className='flex items-center gap-1 text-[#a78bfa] text-sm hover:text-[#c4b5fd] transition-colors'>
              전체보기
              <FontAwesomeIcon icon={faChevronRight} className='text-xs' />
            </Link>
          </div>

          {/* 포커스 카드 행 */}
          <div className='flex gap-6 h-[411px]'>
            {/* 신인 발굴 카드 */}
            <div className='w-[563px] flex-shrink-0 bg-[#2e1065] rounded-xl p-10 flex flex-col justify-between'>
              <div className='flex flex-col gap-5'>
                <h3 className='text-white text-3xl font-bold'>신인 발굴</h3>
                <p className='text-[#acabb1] text-sm leading-relaxed'>
                  VODA가 예측하는 2026년 최고의<br />루키들을 소개합니다.
                </p>
              </div>
              {/* 아바타 그룹 */}
              <div className='flex items-center'>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className='w-[54px] h-[54px] rounded-full border-2 border-[#2e1065] bg-[#3f3f46] -ml-3 first:ml-0 flex items-center justify-center'
                  >
                    <span className='text-xs text-[#a1a1aa]'>?</span>
                  </div>
                ))}
                <div className='w-[54px] h-[54px] rounded-full border-2 border-[#2e1065] bg-[#25252d] -ml-3 flex items-center justify-center'>
                  <span className='text-white text-xs font-bold'>+12</span>
                </div>
              </div>
            </div>

            {/* 감독 포커스 카드 */}
            <div className='flex-1 bg-[#19191f] border border-white/8 rounded-xl overflow-hidden flex'>
              {/* 이미지 영역 */}
              <div className='w-[408px] flex-shrink-0 bg-[#25252d] flex items-center justify-center relative'>
                <FontAwesomeIcon icon={faClapperboard} className='text-[#71717a] text-6xl' />
                {/* 영화 카메라 오버레이 */}
                <div className='absolute inset-0 bg-gradient-to-r from-transparent to-[#19191f]/80' />
              </div>

              {/* 텍스트 영역 */}
              <div className='flex-1 p-10 flex flex-col justify-center gap-5'>
                <span className='text-[#ff67ad] text-sm font-semibold tracking-wide'>Director Insight</span>
                <h3 className='text-white text-4xl font-bold leading-tight'>박찬욱의 미장센</h3>
                <p className='text-[#acabb1] text-sm leading-relaxed max-w-[672px]'>
                  대칭의 미학, 폭력의 시적 표현. 한국 영화를 세계로 알린 거장의<br />
                  발자취를 따라가 봅니다.
                </p>
                <button className='mt-2 bg-white text-black text-sm font-semibold px-6 py-3 rounded-lg w-fit hover:bg-[#fafafa]/90 transition-colors'>
                  기획전 보기
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI 챗봇 플로팅 버튼 */}
      <button className='fixed bottom-8 right-8 w-[64px] h-[64px] bg-[#8b5cf6] rounded-full flex items-center justify-center shadow-lg shadow-[#8b5cf6]/30 hover:bg-[#7c3aed] transition-colors z-50'>
        <FontAwesomeIcon icon={faRobot} className='text-[#0a0a0a] text-xl' />
      </button>
    </div>
  )
}

export default PersonPage
