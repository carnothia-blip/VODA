import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { EP } from '../api/tmdb'
import PersonCard from '../components/PersonCard'

const PersonCategoryPage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const page = parseInt(searchParams.get('page') || '1', 10)
  const title = searchParams.get('title') || '인물 전체보기'
  const category = searchParams.get('category') || 'popular'

  const [items, setItems] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    EP.browsePerson(category, page)
      .then(res => {
        setItems(res.data.results || [])
        setTotalPages(Math.min(res.data.total_pages || 1, 500))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [category, page])

  const goToPage = (p) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      next.set('page', String(p))
      return next
    })
  }

  const getPageNumbers = () => {
    const pages = []
    const start = Math.max(1, page - 2)
    const end = Math.min(totalPages, page + 2)
    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  }

  const pageNums = getPageNumbers()

  return (
    <div className='bg-zinc-950 min-h-screen pb-32'>
      <div className='px-12 pt-20'>
        {/* 뒤로가기 + 제목 */}
        <div className='flex items-center gap-4 mb-10'>
          <button
            onClick={() => navigate(-1)}
            className='w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-neutral-400 hover:border-primary-400 hover:text-primary-400 transition-colors'
          >
            <i className='fa-solid fa-arrow-left text-sm' />
          </button>
          <div className='flex items-center gap-2.5'>
            <div className='w-3 h-12 bg-primary-400 rounded-full shrink-0' />
            <h1 className='font-serif font-bold text-4xl text-neutral-50'>{title}</h1>
          </div>
        </div>

        {loading ? (
          <div className='text-center text-neutral-500 py-40'>로딩 중...</div>
        ) : (
          <>
            {/* 인물 그리드 */}
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
              {items.map(person => (
                <PersonCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  role={person.known_for_department}
                  img={person.profile_path}
                />
              ))}
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className='flex items-center justify-center gap-2 mt-16'>
                <button
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1}
                  className='w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-neutral-400 hover:border-primary-400 hover:text-primary-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed'
                >
                  <i className='fa-solid fa-chevron-left text-sm' />
                </button>

                {pageNums[0] > 1 && (
                  <>
                    <button
                      onClick={() => goToPage(1)}
                      className='w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-neutral-400 hover:border-primary-400 hover:text-primary-400 transition-colors font-serif text-sm'
                    >
                      1
                    </button>
                    {pageNums[0] > 2 && <span className='text-neutral-600 px-1 font-serif'>...</span>}
                  </>
                )}

                {pageNums.map(p => (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full border font-serif text-sm transition-colors ${
                      p === page
                        ? 'bg-primary-500 border-primary-500 text-white'
                        : 'border-white/10 text-neutral-400 hover:border-primary-400 hover:text-primary-400'
                    }`}
                  >
                    {p}
                  </button>
                ))}

                {pageNums[pageNums.length - 1] < totalPages && (
                  <>
                    {pageNums[pageNums.length - 1] < totalPages - 1 && (
                      <span className='text-neutral-600 px-1 font-serif'>...</span>
                    )}
                    <button
                      onClick={() => goToPage(totalPages)}
                      className='w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-neutral-400 hover:border-primary-400 hover:text-primary-400 transition-colors font-serif text-sm'
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                <button
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages}
                  className='w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-neutral-400 hover:border-primary-400 hover:text-primary-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed'
                >
                  <i className='fa-solid fa-chevron-right text-sm' />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default PersonCategoryPage
