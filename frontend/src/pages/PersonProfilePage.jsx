import { useParams } from "react-router";
import { EP } from "../api/tmdb";
import useFetch from "../hooks/useFetch";
import Hero from "../components/Hero";
import Feed from "../components/Feed";
import ChatBtn from "../components/ChatBtn";

/**
 * PersonProfilePage - 인물 상세 프로필 페이지
 * 특정 인물의 바이오그래피와 출연 영화/TV 목록을 표시합니다.
 */
const PersonProfilePage = () => {
  // 1. URL 파라미터에서 인물 ID 추출
  const { id } = useParams();

  // 2. 인물 상세 정보 데이터 호출 (combined_credits 포함)
  const { data: person, loading, error } = useFetch(EP.person(id));

  // 로딩 및 에러 처리
  if (loading)
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-zinc-400">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-red-500">
        인물 정보를 불러오는 데 실패했습니다.
      </div>
    );
  if (!person) return null;

  // 출연작 목록 추출 (combined_credits.cast)
  const castCredits = person.combined_credits?.cast || [];

  return (
    <div className="bg-neutral-950 min-h-screen pb-20">
      {/* 3. 인물 전용 히어로 섹션 */}
      <Hero
        type="person"
        title={person.name}
        subtitle="CAST" // (선택사항) 이름 위에 표시될 소제목
        description={person.biography} // (선택사항) 인물 소개글
        backdrop={person.profile_path} // 배경에 깔릴 흐릿한 이미지
        poster={person.profile_path} // 우측에 3:4 비율로 들어갈 선명한 이미지
      />

      {/* 4. 바이오그래피(Biography) 섹션 */}
      <section className="px-12 md:px-24 py-20 font-['Pretendard']">
        {" "}
        <div className="flex items-center gap-2 mb-12">
          <div className="w-3 h-12 bg-primary-400 rounded-full shrink-0" />
          <h2 className="text-4xl font-bold text-zinc-50 leading-none">소개</h2>
        </div>
        {/* 요약 정보 그리드: 간격(gap-x-20)과 글씨 크기(text-base/text-lg) 상향 */}
        {person.known_for_department ||
        person.birthday ||
        person.place_of_birth ||
        person.homepage ? (
          <div className="flex flex-wrap gap-x-20 gap-y-10 mb-16 pb-12 border-b border-white/10">
            {person.known_for_department && (
              <div>
                <h4 className="text-zinc-500 text-base mb-2 font-medium">
                  분야
                </h4>
                <p className="text-zinc-100 text-xl font-semibold">
                  {person.known_for_department}
                </p>
              </div>
            )}
            {person.birthday && (
              <div>
                <h4 className="text-zinc-500 text-base mb-2 font-medium">
                  생년월일
                </h4>
                <p className="text-zinc-100 text-xl font-semibold">
                  {person.birthday}
                </p>
              </div>
            )}
            {person.place_of_birth && (
              <div>
                <h4 className="text-zinc-500 text-base mb-2 font-medium">
                  출생지
                </h4>
                <p className="text-zinc-100 text-xl font-semibold">
                  {person.place_of_birth}
                </p>
              </div>
            )}
            {person.popularity && (
              <div>
                <h4 className="text-zinc-500 text-base mb-2 font-medium">
                  인기도
                </h4>
                <p className="text-zinc-100 text-xl font-semibold">
                  {person.popularity.toFixed(1)} P
                </p>
              </div>
            )}
            {person.homepage && (
              <div>
                <h4 className="text-zinc-500 text-base mb-2 font-medium">
                  공식 홈페이지
                </h4>
                <a
                  href={person.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary-400 hover:text-primary-300 text-xl font-semibold transition-colors underline underline-offset-4"
                >
                  방문하기
                </a>
              </div>
            )}
          </div>
        ) : (
          !person.biography && (
            <div className="mb-16 py-12 text-zinc-500 text-lg italic border-b border-white/10">
              {person.name}님에 대한 상세 정보가 준비 중입니다.
            </div>
          )
        )}
        {/* 상세 바이오그래피: 본문 가독성을 위해 text-xl로 상향 */}
        {person.biography && (
          <div className="max-w-6xl text-xl text-zinc-300 leading-relaxed whitespace-pre-wrap">
            {person.biography}
          </div>
        )}
      </section>

      {/* 5. 출연작 피드 (Feed type='normal') */}
      <div className="px-24">
        {castCredits.length > 0 && (
          <Feed
            type="normal"
            title="출연작"
            items={castCredits.map((item) => ({
              ...item,
              type: item.media_type, // 영화/TV 구분 데이터 주입
            }))}
          />
        )}
      </div>

      {/* 6. AI 챗봇 버튼 추가 */}
      <ChatBtn />
    </div>
  );
};

export default PersonProfilePage;
