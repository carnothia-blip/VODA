import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

// TMDB reviews 배열에서 1~5점 별점 분포를 계산한다
const calcDist = (reviews) => {
  const ratings = reviews
    .map(r => r.author_details?.rating)
    .filter(r => r != null && r > 0)

  return [5, 4, 3, 2, 1].map(star => {
    const cnt = ratings.filter(
      r => Math.min(5, Math.max(1, Math.round(r / 2))) === star
    ).length
    const pct = ratings.length > 0 ? (cnt / ratings.length) * 100 : 0
    return { star, pct }
  })
}

// 별점 단계별 bar 채우기 색상 (5점 → 1점)
const BAR_COLORS = [
  'bg-primary-300',
  'bg-primary-400/60',
  'bg-primary-400/40',
  'bg-primary-400/20',
  'bg-primary-400/10',
]

const ScoreSummary = ({ avg = 0, count = 0, reviews = [] }) => {
  // TMDB 10점 만점 → 5점 만점 변환
  const score = (avg / 2).toFixed(1)
  const starFilled = Math.round(avg / 2)
  const dist = calcDist(reviews)

  return (
    <div className='flex flex-col gap-12 w-full'>

      {/* 평균 점수 + 별 + 평가 수 */}
      <div className='flex gap-6 items-end'>
        <span className='text-neutral-50 font-serif font-bold text-9xl leading-none'>
          {score}
        </span>

        <div className='flex flex-col pb-3'>
          {/* 별 5개 — 채운 별: primary-300 / 빈 별: neutral-700 */}
          <div className='flex gap-1'>
            {Array.from({ length: 5 }).map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                className={`text-2xl ${i < starFilled ? 'text-primary-300' : 'text-neutral-700'}`}
              />
            ))}
          </div>

          {/* 평가 수 */}
          <p className='text-neutral-400 text-lg font-serif font-bold uppercase mt-1.5'>
            {count.toLocaleString()} Ratings
          </p>
        </div>
      </div>

      {/* 별점 분포 차트 */}
      <div className='flex flex-col gap-4 w-full'>
        {dist.map(({ star, pct }, idx) => (
          <div key={star} className='flex gap-6 items-center'>
            {/* 별점 라벨 */}
            <span className='text-neutral-400 text-lg font-serif font-bold w-6 shrink-0 text-right'>
              {star}
            </span>

            {/* 트랙 + 채우기 바 */}
            <div className='flex-1 h-3 bg-neutral-900 rounded-full overflow-hidden'>
              <div
                className={`h-full rounded-full ${BAR_COLORS[idx]}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default ScoreSummary
