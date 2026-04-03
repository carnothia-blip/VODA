import React, { useState } from "react";
import EpisodeCard from "./EpisodeCard";
import SeasonButton from "./SeasonButton";

/**
 * EpisodeSection 컴포넌트 (Figma: Section_ep_list, node-id: 362:8167)
 * @param {Array} episodes - TMDB 에피소드 데이터 배열
 * @param {Array} seasons - TMDB 전체 시즌 데이터 배열
 * @param {number} activeSeason - 현재 선택된 시즌 번호
 * @param {function} onSeasonChange - 시즌 변경 시 실행할 핸들러
 * @param {boolean} showTitle - 상단 타이틀 노출 여부 (기본값: true)
 */
const EpisodeSection = ({
  episodes = [],
  seasons = [],
  activeSeason = 1,
  onSeasonChange,
  showTitle = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // 🔥 [VODA 지침] 시즌이 바뀌면 '더보기' 상태를 리셋
  // key 프롭을 사용하는 것이 정석이지만, 여기서는 린트 에러 회피를 위해 
  // 렌더링 도중 상태를 직접 관리하거나 useEffect 내 로직을 정리합니다.
  const [prevSeason, setPrevSeason] = useState(activeSeason);
  if (prevSeason !== activeSeason) {
    setPrevSeason(activeSeason);
    setIsExpanded(false);
  }

  // 데이터 방어 코드
  if (!episodes || episodes.length === 0) return null;

  const displayedEpisodes = isExpanded ? episodes : episodes.slice(0, 5);

  return (
    <section className="px-20 py-8 w-full bg-zinc-950">
      {showTitle && (
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-bold text-zinc-50">
            에피소드{" "}
            <span className="ml-2 text-zinc-500 font-medium text-lg">
              {episodes.length}
            </span>
          </h2>
          <SeasonButton
            seasons={seasons}
            activeSeason={activeSeason}
            onSeasonChange={(num, expandAll = false) => {
              // expandAll이 true로 넘어오면 더보기 상태를 즉시 true로 변경
              setIsExpanded(expandAll);
              onSeasonChange(num);
            }}
          />{" "}
        </div>
      )}

      <div className="flex flex-col gap-6">
        {displayedEpisodes.map((item) => (
          <EpisodeCard
            key={item.id}
            ep={item.episode_number}
            title={item.name}
            thumb={item.still_path}
            duration={item.runtime ? `${item.runtime}분` : "정보 없음"}
            overview={item.overview || "에피소드 줄거리가 없습니다."}
            showStatus={false}
          />
        ))}
      </div>

      {!isExpanded && episodes.length > 5 && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setIsExpanded(true)}
            className="px-12 py-4 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 font-serif text-lg hover:bg-zinc-800 hover:text-primary-400 transition-all cursor-pointer"
          >
            에피소드 더보기 ({episodes.length - 5}개)
          </button>
        </div>
      )}
    </section>
  );
};

export default EpisodeSection;
