import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faClapperboard } from '@fortawesome/free-solid-svg-icons'

// 더미 데이터 12명 (TMDB 연동 전)
const DUMMY_PEOPLE = [
  { id: 1, name: '류준열', role: 'Actor', movies: ['극한직업', '돈'] },
  { id: 2, name: '전도연', role: 'Actress', movies: ['밀양', '도희야'] },
  { id: 3, name: '마동석', role: 'Actor', movies: ['범죄도시', '부산행'] },
  { id: 4, name: '김고은', role: 'Actress', movies: ['도깨비', '유열의 음악앨범'] },
  { id: 5, name: '송강호', role: 'Actor', movies: ['기생충', '변호인'] },
  { id: 6, name: '이병헌', role: 'Actor', movies: ['아저씨', '내부자들'] },
  { id: 7, name: '박찬욱', role: 'Director', movies: ['올드보이', '헤어질 결심'] },
  { id: 8, name: '봉준호', role: 'Director', movies: ['기생충', '옥자'] },
  { id: 9, name: '김혜수', role: 'Actress', movies: ['타짜', '도둑들'] },
  { id: 10, name: '하정우', role: 'Actor', movies: ['황해', '암수살인'] },
  { id: 11, name: '손예진', role: 'Actress', movies: ['클래식', '협상'] },
  { id: 12, name: '이정재', role: 'Actor', movies: ['오징어게임', '관상'] },
]

const ActorCard = ({ person }) => {
  return (
    <Link to={`/people/${person.id}`} className='w-full flex flex-col cursor-pointer group'>
      {/* 포트레이트 영역 */}
      <div className='relative w-full aspect-[324/486] rounded-lg overflow-hidden bg-[#25252d]'>
        {/* 이미지 플레이스홀더 */}
        <div className='w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300'>
          <FontAwesomeIcon icon={faClapperboard} className='text-[#71717a] text-4xl' />
        </div>
        {/* 하단 그라데이션 */}
        <div className='absolute inset-0 bg-gradient-to-t from-[#25252d] via-[#25252d]/20 to-transparent' />
        {/* 순위 배지 */}
        <div className='absolute top-3 left-3 bg-[#a78bfa]/20 border border-[#a78bfa]/40 backdrop-blur-sm rounded px-2 py-0.5'>
          <span className='text-[#a78bfa] text-xs font-semibold'>#{person.id}</span>
        </div>
      </div>

      {/* 텍스트 정보 */}
      <div className='pt-4 flex flex-col gap-2'>
        <h3 className='text-[#fafafa] text-lg font-bold group-hover:text-[#a78bfa] transition-colors'>
          {person.name}
        </h3>
        <span className='text-[#a78bfa] text-sm font-medium'>{person.role}</span>
        <div className='flex gap-2 flex-wrap'>
          {person.movies.map((movie) => (
            <span
              key={movie}
              className='text-[#a1a1aa] text-xs border border-[#3f3f46] rounded px-2 py-1 hover:border-[#a78bfa]/40 transition-colors'
            >
              {movie}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

const PersonCategoryPage = () => {
  return (
    <div className='min-h-screen bg-[#0e0e13] relative overflow-hidden'>
      {/* 배경 앰비언트 글로우 */}
      <div className='absolute top-0 right-[200px] w-[960px] h-[768px] rounded-full bg-[#bda1ff]/8 blur-[200px] pointer-events-none' />
      <div className='absolute top-[300px] left-0 w-[768px] h-[614px] rounded-full bg-[#ff67ad]/6 blur-[200px] pointer-events-none' />

      <div className='max-w-[1664px] mx-auto px-12 py-10'>
        {/* 헤더 */}
        <div className='flex items-center gap-3 mb-10 h-[64px]'>
          <FontAwesomeIcon icon={faUser} className='text-[#a78bfa] text-2xl' />
          <h1 className='text-[#fafafa] text-3xl font-bold'>감독/출연</h1>
        </div>

        {/* 카드 그리드 — 4열 */}
        <div className='grid grid-cols-4 gap-x-6 gap-y-12'>
          {DUMMY_PEOPLE.map((person) => (
            <ActorCard key={person.id} person={person} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PersonCategoryPage
