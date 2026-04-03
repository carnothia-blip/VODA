import { useState, useEffect } from 'react'
import { EP } from '../api/tmdb'
import GenreTab from '../components/GenreTab'
import PersonCard from '../components/PersonCard'
import SearchBar from '../components/SearchBar'
import SectionTitle from '../components/SectionTitle'
import DirectorCard from '../components/DirectorCard'
import FocusCard from '../components/FocusCard'
import ChatBtn from '../components/ChatBtn'
import Feed from '../components/Feed'

// 1. '인기 감독' -> '인기 크리에이터'로 명칭 변경 및 탭 구성 최적화
const TABS = [
  { id: 'popular', name: '인기 인물' },
  { id: 'actor', name: '인기 배우' },
  { id: 'creator', name: '인기 크리에이터' },
]

const PersonPage = () => {
  const [trending, setTrending] = useState([])
  const [popular, setPopular] = useState([])
  const [activeTab, setActiveTab] = useState('popular')
  const [loading, setLoading] = useState(true)
  const [actors, setActors] = useState([])
  const [directors, setDirectors] = useState([]) // 내부 로직용 데이터 유지
  const [weekTrending, setWeekTrending] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)

  useEffect(() => {
    // 배우/감독 필터링을 위해 인기 인물 1~2페이지(40명) 동시 fetch
    Promise.all([
      EP.personTrending('day'),
      EP.personPopular(),
      EP.personTrending('week'),
      EP.browsePerson('popular', 2),
    ])
      .then(([trendRes, popRes, weekRes, pop2Res]) => {
        const pop = popRes.data.results
        const popAll = [...pop, ...(pop2Res.data.results || [])]
        setTrending(trendRes.data.results)
        setPopular(pop)
        setActors(popAll.filter((p) => p.known_for_department === 'Acting'))
        setDirectors(popAll.filter((p) => p.known_for_department !== 'Acting')) // 배우 제외 전체 (크리에이터용)
        setWeekTrending(weekRes.data.results)
        setLoading(false)
      })
      .catch(console.error)
  }, [])

  // 2. 필터링 로직 수정: 'creator' 선택 시 배우(Acting)만 제외하고 모두 포함
  const getFilteredItems = (data) => {
    if (activeTab === 'popular') return data
    
    const filtered = data.filter((p) => {
      if (activeTab === 'actor') return p.known_for_department === 'Acting'
      if (activeTab === 'creator') {
        // 배우(Acting) 부서가 아닌 모든 인물을 포함 (감독, 작가, 편집, 제작 등)
        return p.known_for_department !== 'Acting'
      }
      return true
    })

    // 데이터가 너무 적을 경우 UI를 위해 원본 노출하는 가이드 유지
    return filtered.length > 0 ? filtered : data
  }

  const handleSearch = (q) => {
    const query = q?.trim() || ''
    setSearchQuery(query)
    if (!query) {
      setSearchResults([])
      setSearchLoading(false)
    }
  }

  // 실시간 검색 디바운스 처리
  useEffect(() => {
    const query = searchQuery?.trim()
    if (!query) return

    const timer = setTimeout(() => {
      setSearchLoading(true)
      EP.searchPerson(query)
        .then((res) => {
          setSearchResults(res.data.results || [])
          setSearchLoading(false)
        })
        .catch((err) => {
          console.error('Search Error:', err)
          setSearchLoading(false)
        })
    }, 400)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    setSearchLoading(false)
  }

  // 필터링된 인물 리스트 산출
  const persons = getFilteredItems(activeTab === 'popular' ? popular : trending)

  if (loading)
    return <div className='p-20 text-center text-zinc-500'>로딩 중...</div>

  const avatars = trending.slice(0, 3).map((p) => ({
    id: p.id,
    photo: p.profile_path,
    name: p.name,
  }))

  return (
    <div className='bg-zinc-950 min-h-screen pb-32'>
      {/* Hero 섹션 */}
      <section className='relative min-h-125 pt-32 pb-16 overflow-hidden'>
        <div className='absolute top-0 right-0 w-2/5 h-full pointer-events-none'>
          <div className='absolute top-1/4 right-0 w-96 h-96 bg-primary-600 opacity-20 rounded-full blur-3xl' />
          <div className='absolute top-1/3 right-24 w-64 h-64 bg-blue-600 opacity-15 rounded-full blur-3xl' />
        </div>

        <div className='relative z-10 max-w-screen-2xl mx-auto px-20 flex flex-col items-center text-center'>
          <p className='text-xs font-semibold tracking-widest text-primary-400 uppercase mb-4'>
            ETHEREAL PROFILES
          </p>
          <h1 className='text-8xl font-bold text-zinc-50 font-serif leading-tight mb-6'>
            사람을 보다
          </h1>
          <p className='text-base text-zinc-400 leading-relaxed mb-10 max-w-4xl mx-auto w-full'>
            VODA가 주목하는 스크린 뒤의 빛나는 주역들. 시대를 대표하는 배우와
            감독들을 만나보세요.
          </p>

          {/* 검색바 */}
          <div className='w-full max-w-4xl'>
            <SearchBar
              variant='normal'
              placeholder='배우, 감독 이름을 검색해보세요.'
              value={searchQuery}
              onChange={(e) => {
                const q = e.target.value
                setSearchQuery(q)
                if (!q) {
                  setSearchResults([])
                }
              }}
              onSubmit={handleSearch}
            />
          </div>
        </div>
      </section>

      {/* 검색 결과 섹션 */}
      {searchQuery && (
        <div className='px-12 mt-8'>
          <div className='flex items-center justify-between mb-8'>
            <div className='flex items-center gap-2.5'>
              <div className='w-3 h-12 bg-primary-400 rounded-full shrink-0' />
              <h2 className='font-serif font-bold text-3xl text-neutral-50'>
                '{searchQuery}' 검색 결과
              </h2>
            </div>
            <button
              onClick={clearSearch}
              className='flex items-center gap-2 text-neutral-400 hover:text-primary-400 transition-colors font-serif text-base'
            >
              <i className='fa-solid fa-xmark' />
              검색 초기화
            </button>
          </div>

          {searchLoading ? (
            <div className='text-center text-neutral-500 py-20'>검색 중...</div>
          ) : searchResults.length > 0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
              {searchResults.map((person) => (
                <PersonCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  img={person.profile_path}
                  role={person.known_for_department}
                />
              ))}
            </div>
          ) : (
            <div className='text-center py-20'>
              <i className='fa-solid fa-user-slash text-neutral-700 text-5xl mb-4 block' />
              <p className='text-neutral-500 font-serif text-lg'>'{searchQuery}'에 대한 검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      )}

      {/* 인물 탭 */}
      {!searchQuery && (
      <div className='mt-8'>
        <GenreTab tabs={TABS} active={activeTab} onChange={setActiveTab} />
      </div>
      )}

      {/* 인물 그리드 섹션 */}
      {!searchQuery && (
      <div className='px-12'>
        <Feed
          type='person'
          title='오늘의 트렌딩 인물'
          items={persons}
          mediaType='person'
          link={`/person/category?title=오늘의+트렌딩+인물&category=${activeTab}`}
        />
        <Feed
          type='person'
          title='이번 주 트렌딩 인물'
          items={getFilteredItems(weekTrending)}
          mediaType='person'
          link={`/person/category?title=이번+주+트렌딩+인물&category=${activeTab}_week`}
        />
      </div>
      )}

      {/* Focus 섹션 */}
      {!searchQuery && (
      <div className='px-12 mt-20'>
        <SectionTitle
          title='포커스 인물'
          subtitle='VODA가 주목하는 이번 주 인물 기획전'
          link='/person/category?title=포커스+인물&category=popular'
        />
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-2'>
            <DirectorCard
              label='Director Insight'
              title='박찬욱의 미장센'
              desc={
                '대칭의 미학, 폭력의 시적 표현.\n한국 영화를 세계로 알린 거장의 발자취를 따라가 봅니다.'
              }
              btnText='기획전 보기'
              to='/find?curator=parkwook'
            />
          </div>
          <div className='lg:col-span-1'>
            <FocusCard
              title='신인 발굴'
              desc='VODA가 예측하는 2026년 최고의 루키들을 소개합니다.'
              avatars={avatars}
              totalCount={24}
              to='/person/category'
            />
          </div>
        </div>
      </div>
      )}

      <ChatBtn />
    </div>
  )
}

export default PersonPage
