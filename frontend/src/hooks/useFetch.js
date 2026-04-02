import { useState, useEffect } from 'react'

/**
 * API 호출을 위한 커스텀 훅
 * @param {Function|Promise} fn - API 호출 함수(Promise 반환) 또는 Promise 객체
 * @param {Array} deps - 의존성 배열
 * @returns {Object} { data, loading, err }
 */
export default function useFetch(fn, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)
  const [prevDeps, setPrevDeps] = useState(deps)

  // deps가 변경되었다면 렌더링 도중 로딩 상태로 전환 (React 19 권장 패턴)
  if (JSON.stringify(deps) !== JSON.stringify(prevDeps)) {
    setPrevDeps(deps)
    setLoading(true)
    setErr(null)
  }

  useEffect(() => {
    if (!fn) return

    let alive = true
    
    // fn이 함수면 호출하고, 아니면 그대로 사용 (Promise 대응)
    const promise = typeof fn === 'function' ? fn() : fn

    // Promise가 아닐 경우 처리
    if (!promise || typeof promise.then !== 'function') {
      // 비동기적으로 처리하여 cascading render 방지
      Promise.resolve().then(() => {
        if (alive) setLoading(false)
      })
      return
    }

    promise
      .then(res => {
        if (alive) setData(res.data || res) // res.data가 없으면 전체 res 사용
      })
      .catch(e => {
        if (alive) {
          setErr(e)
          console.error('Fetch error:', e)
        }
      })
      .finally(() => {
        if (alive) setLoading(false)
      })

    return () => {
      alive = false
    }
  }, [fn, ...deps])

  return { data, loading, err }
}
