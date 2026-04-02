import { useState, useEffect } from 'react'
import Feed from "../components/Feed"; 
import { EP } from '../api/tmdb'

const ProfilePage = () => {
  const [popularMovies, setPopularMovies] = useState([])
  
  useEffect(() => {
    // 필요한 데이터만 페칭하도록 정리
    EP.popular('movie')
      .then((res) => {
        setPopularMovies(res.data.results)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <div className="text-white px-12 py-16 bg-neutral-950 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">프로필</h1>
      
      {popularMovies.length > 0 && (
        <Feed
          type="play" 
          title="시청 중인 콘텐츠"
          sub="이어보기"
          items={popularMovies.slice(0, 5)}
          mediaType="movie"
        />
      )}
    </div>
  );
};

export default ProfilePage;