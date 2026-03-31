import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

// 네비게이션 메뉴 목록
const NAV_LINKS = [
  { label: '홈', path: '/' },
  { label: '영화보다', path: '/movie' },
  { label: 'TV보다', path: '/tv' },
  { label: '사람을 보다', path: '/people' },
  { label: '물어보다', path: '/ask' },
]

const GNB = () => {
  const location = useLocation()
  const currentPath = location.pathname

  // 찾아보다 페이지인지 확인 (검색바 숨김 처리)
  const isSearchPage = currentPath === '/search'

  return (
    <header className='fixed top-0 left-0 right-0 z-50 backdrop-blur-[18px] bg-[rgba(14,14,19,0.4)] border-t border-white/10 shadow-[0px_0px_60px_0px_rgba(189,157,255,0.1)]'>
      <div className='max-w-[1920px] mx-auto px-12 py-6 flex items-center justify-between'>

        {/* 로고 + 메뉴 */}
        <div className='flex items-center gap-[72px]'>

          {/* 로고 */}
          <Link to='/'>
            <span className='text-[30px] font-bold text-neutral-50 tracking-[-1.8px]'>
              VODA
            </span>
          </Link>

          {/* 메뉴 */}
          <nav className='flex items-center gap-[48px]'>
            {NAV_LINKS.map((link) => {
              const isActive = currentPath === link.path
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex flex-col items-start h-[39px] justify-start pb-[6px] ${
                    isActive ? 'border-b-4 border-violet-400' : ''
                  }`}
                >
                  <span
                    className={`text-[20px] uppercase tracking-[-0.525px] leading-[30px] ${
                      isActive
                        ? 'text-violet-400 font-extrabold'
                        : 'text-zinc-400 font-semibold'
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* 우측 영역: 검색바 + 알림 + 아바타 */}
        <div className='flex items-center gap-[30px]'>

          {/* 검색바 — 찾아보다 페이지에선 숨김 */}
          {!isSearchPage && (
            <Link
              to='/search'
              className='flex items-center gap-3 backdrop-blur-[12px] bg-white/5 border border-white/10 rounded-full px-[25.5px] py-[7.5px]'
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className='text-zinc-400 text-base'
              />
              <span className='text-zinc-400 text-base font-normal w-48'>
                찾아보다
              </span>
            </Link>
          )}

          {/* 알림 아이콘 */}
          <button className='text-zinc-400 hover:text-neutral-50 transition-colors'>
            <FontAwesomeIcon icon={faBell} className='text-xl' />
          </button>

          {/* 유저 아바타 */}
          <Link to='/profile'>
            <div className='size-[54px] rounded-full ring-2 ring-violet-400 overflow-hidden bg-zinc-700'>
              <img
                src='https://www.figma.com/api/mcp/asset/b10ff32e-bd95-4457-8209-7a07f25e358e'
                alt='프로필'
                className='size-full object-cover'
              />
            </div>
          </Link>
        </div>

      </div>
    </header>
  )
}

export default GNB
