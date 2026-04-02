RankCard.jsx를 만들어줘. rank, id, type, title, poster, genre를 props로 받아. Link to={`/${type}/${id}`}로 감싸. w-58 flex-shrink-0. relative. 포스터는 EP.img(poster)로 aspect-[2/3] rounded-3xl overflow-hidden object-cover. 포스터 위에 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent 오버레이. rank 숫자는 absolute -left-6 bottom-14 text-8xl font-bold text-white/80 font-sans drop-shadow-lg. 하단에 제목 text-xl font-medium truncate와 장르 text-sm text-zinc-400


# VODA 프로젝트 Gemini CLI 생성 프롬프트

> 이 프롬프트는 VODA OTT 프로젝트의 React 컴포넌트 및 페이지를 Gemini CLI로 생성하기 위한 완전한 컨텍스트입니다.

---

## 프로젝트 개요

**프로젝트명**: VODA — 풀사이클 생성형 AI OTT 미디어 서비스  
**저장소**: https://github.com/bettypark19-bit/VODA  
**기간**: 2026.03.24 ~ 04.03 (9일)  
**해상도**: 데스크탑 1920px 고정 (반응형 없음)  
**팀 구성**: 디자인 80% / 코딩 20% 숙련도의 KDT 수강생 4인

---

## 기술 스택 (고정, 변경 절대 금지)

| 기술 | 버전 | 용도 |
|---|---|---|
| React | 19 | UI 프레임워크 |
| Vite | 8 | 빌드 도구 |
| Tailwind CSS | v4 | 스타일링 (@theme 블록 사용, tailwind.config.js 금지) |
| React Router | v7 | 라우팅 (Data Mode 전용: createBrowserRouter) |
| Axios | latest | HTTP 클라이언트 |
| FontAwesome | v7 | 아이콘 |
| tailwind-merge | latest | 조건부 클래스 병합 |
| FastAPI | latest | 백엔드 (Python) |
| TMDB API | v3 | 영화/TV 데이터 |

**⚠️ 허용 목록 외 패키지 설치 절대 금지**

---

## 프로젝트 구조

```
voda/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js          # Axios 인스턴스 (수정 금지)
│   │   │   └── tmdb.js           # EP 객체 (모든 API 호출은 여기서)
│   │   ├── components/           # 재사용 컴포넌트
│   │   ├── pages/                # 페이지 컴포넌트
│   │   ├── hooks/                # 커스텀 훅 (useFetch.js)
│   │   ├── router/
│   │   │   └── index.jsx         # 라우트 설정
│   │   ├── App.jsx               # Layout (GNB + Outlet + Footer)
│   │   ├── main.jsx              # 앱 진입점 (RouterProvider)
│   │   └── index.css             # @theme 토큰 정의
│   └── package.json
├── backend/
│   ├── main.py                   # FastAPI + /chat 엔드포인트
│   └── requirements.txt
└── CLAUDE.md
```

---

## 디자인 토큰 (@theme) — 이미 정의됨

`src/index.css`에 아래 토큰이 정의되어 있습니다. 반드시 이 토큰을 사용하세요.

```css
@import "tailwindcss";

@theme {
  --color-primary-50: #F5F3FF;
  --color-primary-400: #A78BFA;
  --color-primary-500: #8B5CF6;
  --color-primary-600: #7C3AED;
  --color-primary-950: #2E1065;
  --color-secondary-400: #F472B6;
  --color-secondary-500: #EC4899;
  --color-neutral-50: #FAFAFA;
  --color-neutral-400: #A1A1AA;
  --color-neutral-800: #27272A;
  --color-neutral-900: #18181B;
  --color-neutral-950: #0A0A0A;
  --font-sans: 'Gmarket Sans TTF', system-ui, sans-serif;
  --font-serif: 'Pretendard', system-ui, sans-serif;
  --shadow-glow-purple: 0px 0px 60px 0px rgba(189, 157, 255, 0.1);
}
```

**사용 예시**:
- 배경색: `bg-neutral-950`, `bg-primary-500`
- 텍스트색: `text-zinc-50`, `text-primary-400`
- 폰트: `font-sans`, `font-serif`

---

## API 레이어 규칙 (필수 준수)

### axios 인스턴스 (`src/api/axios.js`) — 수정 금지

```javascript
import axios from 'axios'

const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: 'ko-KR',
    region: 'KR',
  },
})

export default tmdb
```

### EP 객체 (`src/api/tmdb.js`) — 모든 API 호출은 여기서

```javascript
import ax from './axios'

const IMG = 'https://image.tmdb.org/t/p'

export const EP = {
  // 이미지 URL 헬퍼
  img: (path, w = 'w500') => path ? `${IMG}/${w}${path}` : null,
  bg: (path) => path ? `${IMG}/original${path}` : null,

  // 인기/트렌딩
  popular: (type) => ax.get(`/${type}/popular`),
  trending: (type, window = 'week') => ax.get(`/trending/${type}/${window}`),
  topRated: (type) => ax.get(`/${type}/top_rated`),

  // 상세
  detail: (type, id) => ax.get(`/${type}/${id}`, {
    params: { append_to_response: 'credits,reviews,videos,similar' }
  }),

  // 검색/필터
  search: (q) => ax.get('/search/multi', { params: { query: q } }),
  discover: (type, params) => ax.get(`/discover/${type}`, { params }),
  genres: (type) => ax.get(`/genre/${type}/list`),

  // 인물
  person: (id) => ax.get(`/person/${id}`, {
    params: { append_to_response: 'combined_credits' }
  }),
  personPopular: () => ax.get('/person/popular'),
  personTrending: (window = 'day') => ax.get(`/trending/person/${window}`),

  // TV 시즌
  season: (id, num) => ax.get(`/tv/${id}/season/${num}`),
}
```

### useFetch 훅 (`src/hooks/useFetch.js`)

```javascript
import { useState, useEffect } from 'react'

export default function useFetch(fn, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)

  useEffect(() => {
    let alive = true
    setLoading(true)
    setErr(null)
    fn()
      .then(res => { if (alive) setData(res.data) })
      .catch(e => { if (alive) { setErr(e); console.error(e) } })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, deps)

  return { data, loading, err }
}
```

**사용 예시**:
```jsx
const { data, loading } = useFetch(() => EP.popular('movie'), [])

if (loading) return <p className='text-zinc-400 p-12'>로딩 중...</p>

return <Feed type='normal' title='인기 영화' items={data.results} />
```

---

## React Router v7 Data Mode 강제 규칙 (예외 없음)

### ✅ 유일한 올바른 패턴 (3파일 구조)

#### 1. `src/router/index.jsx` — 라우트 목록만

```jsx
import { createBrowserRouter } from 'react-router'
import Layout from '../App'
import HomePage from '../pages/HomePage'
import MoviePage from '../pages/MoviePage'
import TvPage from '../pages/TvPage'
import PersonPage from '../pages/PersonPage'
import PersonProfilePage from '../pages/PersonProfilePage'
import PersonCategoryPage from '../pages/PersonCategoryPage'
import FindPage from '../pages/FindPage'
import AskPage from '../pages/AskPage'
import AboutPage from '../pages/AboutPage'
import ProfilePage from '../pages/ProfilePage'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/movie', element: <MoviePage /> },
      { path: '/tv', element: <TvPage /> },
      { path: '/person', element: <PersonPage /> },
      { path: '/person/:id', element: <PersonProfilePage /> },
      { path: '/person/category', element: <PersonCategoryPage /> },
      { path: '/find', element: <FindPage /> },
      { path: '/ask', element: <AskPage /> },
      { path: '/movie/:id', element: <AboutPage /> },
      { path: '/tv/:id', element: <AboutPage /> },
      { path: '/profile', element: <ProfilePage /> },
    ],
  },
])

export default router
```

#### 2. `src/App.jsx` — 공통 레이아웃만

```jsx
import { Outlet } from 'react-router'
import GNB from './components/GNB'
import Footer from './components/Footer'
import ChatBtn from './components/ChatBtn'

const Layout = () => (
  <div className='min-h-screen flex flex-col bg-neutral-950'>
    <GNB />
    <main className='flex-1'><Outlet /></main>
    <Footer />
    <ChatBtn />
  </div>
)

export default Layout
```

#### 3. `src/main.jsx` — 앱 진입점

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import router from './router'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
```

### ❌ 절대 금지

```jsx
// ❌ Declarative Mode — 이 import 자체가 금지
import { BrowserRouter, Routes, Route } from 'react-router'

// ❌ action/loader — 사용 금지
export async function loader() { ... }
export async function action() { ... }
```

**데이터 로딩은 반드시 useFetch 훅 + useEffect로 처리합니다.**

---

## Figma → React 컴포넌트 매핑

### 카드 계열

| Figma 컴포넌트 | React 파일 | Props |
|---|---|---|
| Card_mv360 (8v) / Card_mv410 (8v) | `Card.jsx` | `id, type, title, genre, poster, badge, size` |
| Card_rk (450×600) | `RankCard.jsx` | `rank, title, genre, poster, id, type` |
| Movie horizontal Card (440×380) | `HCard.jsx` | `title, poster, progress, id, type` |
| Card_p (3v) | `PersonCard.jsx` | `name, role, photo, id` |
| Actor (180×222) | `ActorThumb.jsx` | `name, photo, id` |
| Card_ep | `EpisodeCard.jsx` | `ep, title, duration, thumb, progress` |
| Card_key (4v) | `KeywordCard.jsx` | `type, title, desc, bg` |

### 피드(섹션) 계열

| Figma 컴포넌트 | React 파일 | Props |
|---|---|---|
| Feed_normal / Feed_play / Feed_Rank | `Feed.jsx` | `type, title, link, items, children` |

**Feed 안에 SectionTitle 기능이 포함됩니다. 별도 SectionTitle 컴포넌트 불필요.**

### 탭/바 계열

| Figma 컴포넌트 | React 파일 | Props |
|---|---|---|
| Bar_mv (20v) / Bar_tv (16v) / Bar_p | `GenreTab.jsx` | `tabs[], active, onChange` |
| Bar buttons (on/off) | `ChipBtn.jsx` | `label, active, onClick` |

### 상세 페이지 계열

| Figma 컴포넌트 | React 파일 | Props |
|---|---|---|
| Hero (3v) + Hero_p | `Hero.jsx` | `type, title, backdrop, poster, rating, year, runtime, overview` |
| Card Detail Button (6v) | `DetailBtn.jsx` | `label, icon, variant` |
| Container (시놉시스) | `Synopsis.jsx` | `text, genres, date, runtime, keywords` |
| Cast Section | `CastSection.jsx` | `cast[]` |
| Episodes Section | `EpisodeSection.jsx` | `episodes[], seasonNum` |
| Review_s + Review_f | `ReviewCard.jsx` | `author, content, rating, size` |
| Score Summary | `ScoreSummary.jsx` | `avg, count, dist[]` |

### 검색/AI 계열

| Figma 컴포넌트 | React 파일 | Props |
|---|---|---|
| Search Bar Short (2v: AI/normal) | `SearchBar.jsx` | `mode, value, onChange, onSubmit` |
| Filter Chips | `FilterChips.jsx` | `filters[], active, onChange` |
| Bubble + AI 답변 | `ChatBubble.jsx` | `type, text` |

### 공용 레이아웃

| React 파일 | 역할 |
|---|---|
| `Layout` (App.jsx) | `<GNB />` + `<Outlet />` + `<Footer />` + `<ChatBtn />` |
| `GNB.jsx` | 상단 네비 6탭 (홈/영화보다/TV보다/사람을보다/물어보다/찾아보다) |
| `Footer.jsx` | 하단 푸터 |
| `ChatBtn.jsx` | AI 챗봇 플로팅 버튼 → /ask로 이동 |

---

## 페이지 구성 패턴

모든 페이지는 **Feed 컴포넌트를 쌓아서** 만듭니다.

```
HomePage     = Hero + Feed(play) + Feed(rank) + Feed(normal)×3
MoviePage    = Hero + GenreTab + Feed(normal)×3
TvPage       = Hero + GenreTab + Feed(normal)×3
PersonPage   = Hero(person) + GenreTab(people) + PersonCard Grid
FindPage     = SearchBar + FilterChips + Feed(normal) + MoodGrid
AskPage      = KeywordTab + ChatBubble + AiReply + Feed(normal) + SearchBar
AboutPage    = Hero(detail) + Synopsis + CastSection + ReviewCard + Feed(similar)
AboutPage/TV = 위 + EpisodeSection 추가
ProfilePage  = Header + Feed(normal) + Feed(play) + ReviewSection
```

**Layout(GNB+Footer+ChatBtn)은 App.jsx에서 감싼다. 페이지에서 렌더하지 않는다.**

---

## 라우팅 구조

| 경로 | React 파일 | 설명 |
|---|---|---|
| `/` | HomePage.jsx | 메인 |
| `/movie` | MoviePage.jsx | 영화보다 |
| `/tv` | TvPage.jsx | TV보다 |
| `/person` | PersonPage.jsx | 사람을보다 |
| `/person/:id` | PersonProfilePage.jsx | 인물 상세 |
| `/person/category` | PersonCategoryPage.jsx | 인물 카테고리 |
| `/find` | FindPage.jsx | 찾아보다 (필터 1페이지) |
| `/ask` | AskPage.jsx | 물어보다 (AI 챗봇) |
| `/movie/:id` | AboutPage.jsx | 영화 상세 |
| `/tv/:id` | AboutPage.jsx | TV 상세 (같은 컴포넌트) |
| `/profile` | ProfilePage.jsx | 나를보다 |

---

## 코딩 컨벤션 (필수 준수)

### 스타일 가이드
- **들여쓰기**: 2 spaces
- **문자열**: 작은따옴표 `'`
- **세미콜론**: 생략
- **컴포넌트**: 화살표 함수 + default export
- **파일명**: PascalCase.jsx (컴포넌트), camelCase.js (훅/유틸)

### Tailwind CSS 규칙
- **Tailwind v4 유틸리티만 사용**
- **인라인 스타일 `style={{}}` 금지**
- **tailwind.config.js 생성 금지**
- **임의값(arbitrary value) `[px값]` 하드코딩 금지**
  - ❌ `max-w-[1920px]` 
  - ✅ `max-w-screen-2xl` 또는 `@theme` 토큰 정의
- **하드코딩 색상 금지**
  - ❌ `bg-[#a78bfa]`
  - ✅ `bg-primary-400`

### React Router 규칙
- **createBrowserRouter (Data Mode) 전용**
- **BrowserRouter / Routes / Route 금지**
- **loader / action 금지**

### 데이터 로딩 규칙
- **useFetch 훅 + useEffect로만 처리**
- **페이지에서 직접 axios.create 금지**
- **EP 객체 사용 필수**

### 주석
- **한국어**

---

## 절대 금지 목록

1. ❌ `npm install [새패키지]` — 허용 목록 외 설치 금지
2. ❌ 루트 디렉토리에서 `npm` 실행 — frontend/ 안에서만
3. ❌ 기존 패키지 버전 변경
4. ❌ `style={{}}` 인라인 스타일
5. ❌ `tailwind.config.js` 생성
6. ❌ 다른 팀원 담당 파일 직접 수정
7. ❌ 디버깅 중 AI가 제안하는 패키지 설치
8. ❌ `BrowserRouter` / `Routes` / `Route` import
9. ❌ `loader` / `action` 함수 작성
10. ❌ Tailwind 임의값(arbitrary value) `[px값]` 사용

---

## 컴포넌트 작성 규칙

### ✅ 올바른 패턴

```jsx
import { Link } from 'react-router'
import { EP } from '../api/tmdb'

const Card = ({ id, type = 'movie', title, poster, badge, size = 'sm' }) => {
  const w = size === 'sm' ? 'w-90' : 'w-102'
  
  return (
    <Link to={`/${type}/${id}`} className={`${w} flex-shrink-0`}>
      <div className='relative aspect-[2/3] rounded-2xl overflow-hidden'>
        <img 
          src={EP.img(poster)} 
          alt={title} 
          className='size-full object-cover' 
        />
        {badge && badge !== '기본' && (
          <span className='absolute top-4 left-4 bg-secondary-400 text-secondary-900 text-sm font-bold px-3 py-1 rounded-full'>
            {badge}
          </span>
        )}
      </div>
      <h3 className='text-zinc-50 text-xl font-medium mt-3 truncate'>{title}</h3>
    </Link>
  )
}

export default Card
```

### ❌ 금지 패턴

```jsx
// ❌ 인라인 스타일
<div style={{ width: '360px' }}>

// ❌ 하드코딩 색상
<div className='bg-[#a78bfa]'>  // ❌
<div className='bg-primary-400'>  // ✅

// ❌ 컴포넌트 안에서 다른 컴포넌트 인라인 정의
const Page = () => {
  const InnerCard = ({ name }) => <div>{name}</div>  // ❌ 분리해야 함
}

// ❌ 페이지에서 GNB/Footer 직접 렌더
import GNB from '../components/GNB'  // ❌ Layout이 처리함
```

---

## 에러 분류 프로토콜

에러가 발생하면 **먼저 분류**합니다. 분류하지 않고 바로 고치려 하면 안 됩니다.

### 1. 코드 에러
**증상**: `SyntaxError`, `ReferenceError`, `TypeError`, `Cannot find module`, `is not defined`

**원인**: 오타, import 경로 틀림, props 이름 틀림, 괄호 안 닫음

**해결**:
1. 에러 메시지에서 파일명과 줄 번호 확인
2. 해당 파일 열어서 해당 줄 확인
3. **해당 파일만 수정** — 다른 파일 건드리지 않음

### 2. 환경 에러
**증상**: `ENOENT`, `permission denied`, `command not found`, `.env` 관련, `node_modules` 관련

**원인**: 파일이 없음, 경로 틀림, 환경변수 미설정, node_modules 손상

**해결**:
1. `cd frontend` 확인 (루트가 아닌지)
2. `.env` 파일 존재 + `VITE_TMDB_API_KEY` 값 확인
3. node_modules 문제 → `rm -rf node_modules && npm install` (frontend/ 안에서)

### 3. API 에러
**증상**: `401`, `403`, `404`, `500`, `Network Error`, `CORS`, 응답이 예상과 다름

**원인**: API 키 틀림, 엔드포인트 경로 틀림, 파라미터 틀림, 네트워크 문제

**해결**:
1. **console.log로 응답 먼저 확인** — 에러 내용을 읽기 전에 고치려 하지 않음
2. API 키가 `.env`에 있는지 확인
3. 엔드포인트 URL이 TMDB 공식 문서와 일치하는지 확인

### 분류할 수 없는 에러
1. 에러 메시지 전체를 복사
2. AI에게 붙여넣기
3. "먼저 이 에러를 분류해줘"라고 요청
4. **AI가 "이 패키지를 설치하세요"라고 하면 무시**

---

## 바이브 코딩 프롬프트 템플릿

### 작업 시작

```
CLAUDE.md를 읽어줘.
오늘 [컴포넌트명/페이지명] 작업을 시작한다.

- 현재 파일 상태를 먼저 확인해줘
- 기존 코드가 있으면 어떤 상태인지 알려줘
- 새 패키지 설치하지 마
```

### 컴포넌트 생성

```
src/components/[컴포넌트명].jsx를 만들어줘.

- Figma 컴포넌트명: [Card_mv360, Feed_normal 등]
- props: { [props 나열] }
- Tailwind v4 + @theme 토큰 사용
- EP.img()로 TMDB 이미지 처리
- 완결된 코드로 제공해줘
- 새 패키지 설치하지 마
```

### 페이지 조립

```
src/pages/[페이지명].jsx를 만들어줘.

- 이 페이지의 구조: [Hero + Feed(rank) + Feed(normal)×2 등]
- TMDB API: [EP.popular('movie') 등]
- useFetch 훅 사용
- Layout이 GNB/Footer 처리하므로 페이지에서 렌더하지 마
- 로딩 중: "로딩 중..." 텍스트만
- 새 패키지 설치하지 마
```

### 에러 발생

```
이 에러를 해결해줘:
[에러 메시지 전체를 여기에 붙여넣기]

먼저 에러를 분류해줘:
1. 코드 에러 (오타, import, props)
2. 환경 에러 (node_modules, .env)
3. API 에러 (네트워크, 키, 응답)

분류 후에 해결해줘.
새 패키지 설치하지 마.
기존 패키지 버전 변경하지 마.
```

---

## 주요 컴포넌트 상세 스펙

### Card.jsx

```jsx
// props
{
  id: number,           // TMDB ID
  type: 'movie' | 'tv', // 상세 페이지 라우팅용
  title: string,        // 영화/TV 제목
  poster: string,       // TMDB poster_path
  genre: string,        // 장르 텍스트
  badge: string,        // free/new/live/찜/개봉예정/curator/voda_only
  size: 'sm' | 'md'     // sm=360px, md=410px
}
```

### Feed.jsx

```jsx
// props
{
  type: 'normal' | 'play' | 'rank', // 레이아웃 타입
  title: string,                     // 섹션 제목
  link: string,                      // "전체보기" 링크
  items: array,                      // TMDB results 배열
  mediaType: 'movie' | 'tv'          // Card에 전달할 type
}
```

### Hero.jsx

```jsx
// props
{
  type: 'home' | 'detail' | 'person', // 레이아웃 분기
  title: string,                       // 메인 타이틀
  backdrop: string,                    // TMDB backdrop_path
  poster: string,                      // TMDB poster_path
  rating: number,                      // 평점 (0~10)
  year: string,                        // 개봉년도
  runtime: number,                     // 상영시간(분)
  overview: string                     // 줄거리
}
```

---

## 페이지별 API 매핑

| 페이지 | API 호출 | 비고 |
|---|---|---|
| HomePage | `EP.popular('movie')`, `EP.trending('movie')`, `EP.topRated('movie')` | Promise.all |
| MoviePage | `EP.genres('movie')`, `EP.discover('movie', { with_genres })` | 장르탭 변경 시 재호출 |
| TvPage | `EP.genres('tv')`, `EP.discover('tv', { with_genres })` | MoviePage와 동일 구조 |
| FindPage | `EP.discover(type, { with_genres, year, with_origin_country })` | 쿼리파라미터 기반 |
| PersonPage | `EP.personTrending('day')`, `EP.personPopular()` | |
| PersonProfilePage | `EP.person(id)` | combined_credits 포함 |
| AboutPage | `EP.detail(type, id)` | credits, reviews, videos, similar 포함 |
| ProfilePage | localStorage | TMDB 호출 없음 |
| AskPage | 백엔드 `/chat` | TMDB 직접 호출 없음 |

---

## TMDB 응답 구조 (자주 쓰는 필드)

### movie / tv 목록

```javascript
{
  results: [
    {
      id: 123,
      title: '영화 제목',        // tv는 name
      poster_path: '/abc.jpg',
      backdrop_path: '/def.jpg',
      genre_ids: [28, 12],
      vote_average: 7.5,
      release_date: '2024-01-01', // tv는 first_air_date
      overview: '줄거리...',
    }
  ]
}
```

### detail (append_to_response 포함)

```javascript
{
  id: 123,
  title: '영화 제목',
  runtime: 148,                    // tv는 episode_run_time
  genres: [{ id: 28, name: '액션' }],
  credits: {
    cast: [{ id: 1, name: '배우', character: '역할', profile_path: '/img.jpg' }],
    crew: [{ id: 2, name: '감독', job: 'Director' }],
  },
  reviews: {
    results: [{ author: '작성자', content: '리뷰 내용', author_details: { rating: 8 } }]
  },
  videos: {
    results: [{ key: 'youtube_id', type: 'Trailer', site: 'YouTube' }]
  },
  similar: {
    results: [{ id: 456, title: '비슷한 영화', poster_path: '/ghi.jpg' }]
  },
}
```

### person (combined_credits 포함)

```javascript
{
  id: 1,
  name: '배우 이름',
  biography: '약력...',
  birthday: '1984-07-04',
  profile_path: '/img.jpg',
  known_for_department: 'Acting',
  combined_credits: {
    cast: [{ id: 123, title: '출연작', media_type: 'movie', poster_path: '/abc.jpg' }],
  },
}
```

---

## 이미지 URL 처리

```jsx
// 포스터 (세로)
<img src={EP.img(movie.poster_path)} alt={movie.title} />

// 포스터 크기 지정
<img src={EP.img(movie.poster_path, 'w342')} />

// 배경 (가로, 고화질)
<div style={{ backgroundImage: `url(${EP.bg(movie.backdrop_path)})` }} />

// 프로필 사진
<img src={EP.img(person.profile_path, 'w185')} />

// 이미지 없을 때 폴백
<img src={EP.img(movie.poster_path) || '/placeholder.png'} />
```

### 사용 가능한 크기

| 용도 | 추천 크기 |
|---|---|
| 포스터 (카드) | `w500` (기본값) |
| 포스터 (작은 카드) | `w342` |
| 배경 이미지 | `original` (EP.bg 사용) |
| 프로필 사진 | `w185` |
| 에피소드 썸네일 | `w300` |

---

## 멘탈 모델 (비유)

팀원에게 설명할 때 이 비유를 사용합니다:

| 개념 | 비유 |
|---|---|
| npm install | 앱스토어에서 앱 설치. 이미 설치된 앱으로만 작업한다 |
| API 호출 | 식당 주문. 메뉴(endpoint)에 있는 것만 주문 가능 |
| 모노레포 | 같은 건물 다른 층. frontend는 2층, backend는 3층. 1층(루트)에서 npm 치면 엉뚱한 층에 설치됨 |
| 컴포넌트 | 레고 블록. Card는 작은 블록, Feed는 큰 블록, 페이지는 블록을 쌓은 결과 |
| props | 주문서. 같은 레고 블록이어도 주문서(props)에 따라 색이 다르다 |

---

## 핵심 원칙 3개

1. **이해보다 습관 먼저** — 왜 이렇게 하는지 길게 설명하지 않는다. "이렇게 해라"를 먼저 주고, 이유는 한 줄 코멘트로 붙인다.
2. **변수만 바꾸면 누구나 사용** — 프롬프트 템플릿의 `[변수]`만 실제 값으로 바꾸면 동작한다.
3. **AI가 에러를 분류한 뒤에 고친다** — 새 패키지 설치는 어떤 에러의 해결책도 아니다.

---

## 작업 흐름

### 1. 컴포넌트 생성

1. Figma 컴포넌트명 확인
2. React 컴포넌트 매핑 표에서 대응 찾기
3. props 정의 → JSX 작성 → Tailwind 클래스 적용
4. `@theme` 토큰(primary-400, secondary-400 등) 사용 확인
5. 파일을 `src/components/`에 저장

### 2. TMDB API 연동

1. `src/api/tmdb.js`의 EP 객체에서 필요한 함수 확인
2. `useFetch` 훅으로 데이터 로딩
3. `EP.img(path)` 헬퍼로 이미지 URL 생성
4. 로딩/에러 상태 처리

### 3. 페이지 조립

1. 해당 페이지의 Figma 구조 확인 (Hero + Feed 스태킹)
2. 필요한 컴포넌트 import
3. useFetch로 TMDB 데이터 연결
4. Layout(GNB+Footer+ChatBtn)은 App.jsx에서 감싸므로 페이지에서 렌더하지 않음

### 4. 에러 수정

**반드시 먼저 분류한다:**

- 코드 에러 (오타, import, props) → 해당 파일만 수정
- 환경 에러 (node_modules, .env, 경로) → 터미널 명령으로 해결
- API 에러 (네트워크, 키, 응답) → console.log로 응답 먼저 확인

**절대 하지 않는 것:**

- 새 패키지 설치
- 기존 패키지 버전 변경
- 다른 라이브러리로 교체

---

## 우선순위 커팅

프로젝트 기간이 짧으므로 아래 기능은 후순위로 미룹니다:

- Find 필터 10개 → 3개 (장르/연도/국가)
- Banner → 후순위
- 반응형 → 제거 (1920px 고정)
- 시즌 드롭다운 → 시즌1 고정
- react-player → 후순위 (YouTube 링크 대체)
- Awards + Collaborators → 후순위

---

## 현재 코드 문제점 (작업 전 필수 확인)

1. **GNB 6탭 누락**: NAV_LINKS에 '찾아보다'(/find) 탭 없음. 5개→6개 필요
2. **라우터 미완성**: /person, /person/:id, /find, /movie/:id, /tv/:id, /profile 경로 미등록
3. **HomePage 오류**: 존재하지 않는 MovieCard 컴포넌트에 의존. Card.jsx로 교체 필요
4. **useFetch 훅 없음**: hooks/useFetch.js 미구현
5. **대부분 페이지 TODO**: MoviePage, TVPage, AskPage, ProfilePage 전부 껍데기
6. **누락 파일**: AboutPage, FindPage, PersonProfilePage, PersonCategoryPage 파일 없음
7. **SectionTitle 껍데기**: div만 있고 props 처리 없음

---

## Figma 주소

| 페이지 | Figma URL |
|---|---|
| 컴포넌트 | https://www.figma.com/design/1njHE0wh4wagalawjHyLSo/VODA?node-id=228-2188 |
| Home | https://www.figma.com/design/1njHE0wh4wagalawjHyLSo/VODA?node-id=77-2075 |
| Movie | https://www.figma.com/design/1njHE0wh4wagalawjHyLSo/VODA?node-id=117-1740 |
| Tv | https://www.figma.com/design/1njHE0wh4wagalawjHyLSo/VODA?node-id=355-7435 |
| Person | https://www.figma.com/design/1njHE0wh4wagalawjHyLSo/VODA?node-id=78-2118 |
| Person/profile | https://www.figma.com/design/1njHE0wh4wagalawjHyLSo/VODA?node-id=107-1555 |
| Person/category | https://www.figma.com/design/1njHE0wh4wagalawjHyLSo/VODA?node-id=403-9066 |
| Find | https://www.figma.com/design/1njHE0wh4wagalawjHyLSo/VODA?node-id=73-599 |
| Ask | https://www.figma.com/design/1njHE0wh4wagalawjHyLSo/VODA?node-id=78-2332 |
| About/Movie | https://www.figma.com/design/1njHE0wh4wagalawjHyLSo/VODA?node-id=82-676 |
| About/Tv | https://www.figma.com/design/1njHE0wh4wagalawjHyLSo/VODA?node-id=358-7139 |
| Profile | https://www.figma.com/design/1njHE0wh4wagalawjHyLSo/VODA?node-id=368-8135 |

---

## 환경 설정

### .env 파일 (frontend/)

```
VITE_TMDB_API_KEY=발급받은_API_키
VITE_API_URL=http://localhost:8000
```

### 명령어

```bash
# 프론트엔드 작업
cd frontend
npm run dev
npm run build

# 백엔드 작업
cd backend
uvicorn main:app --reload

# Git 작업 (루트에서)
cd VODA
git add .
git commit -m "feat: 홈페이지 구현"
git push origin dev
```

---

## 사용 예시

### Gemini CLI에 프롬프트 입력

```
이 문서를 읽고 VODA 프로젝트를 이해해줘.

이제 src/components/Card.jsx를 만들어줘.
- Figma 컴포넌트명: Card_mv360 (8 variants)
- props: id, type, title, genre, poster, badge, size
- Tailwind v4 + @theme 토큰 사용
- EP.img()로 TMDB 이미지 처리
- 완결된 코드로 제공해줘
- 새 패키지 설치하지 마
```

### 또는 페이지 생성

```
이 문서를 읽고 VODA 프로젝트를 이해해줘.

이제 src/pages/MoviePage.jsx를 만들어줘.
- 구조: Hero + GenreTab + Feed(normal)×3
- TMDB API: EP.genres('movie'), EP.discover('movie', {with_genres})
- useFetch 훅 사용
- Layout이 GNB/Footer 처리하므로 페이지에서 렌더하지 마
- 로딩 중: "로딩 중..." 텍스트만
- 새 패키지 설치하지 마
```

---

## 마지막 체크리스트

생성된 코드가 아래 조건을 모두 만족하는지 확인하세요:

- [ ] React Router v7 Data Mode 사용 (createBrowserRouter)
- [ ] BrowserRouter / Routes / Route 사용하지 않음
- [ ] loader / action 함수 사용하지 않음
- [ ] EP 객체로 API 호출
- [ ] useFetch 훅으로 데이터 로딩
- [ ] @theme 토큰 사용 (하드코딩 색상 없음)
- [ ] 인라인 스타일 없음
- [ ] 임의값 [px값] 하드코딩 없음
- [ ] 새 패키지 설치 없음
- [ ] 들여쓰기 2칸, 세미콜론 생략, 작은따옴표
- [ ] 한국어 주석

---

이 프롬프트를 Gemini CLI 또는 다른 AI 코딩 도구에 복사하여 붙여넣으면, VODA 프로젝트의 컴포넌트와 페이지를 즉시 생성할 수 있습니다.
