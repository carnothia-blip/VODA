CLAUDE.md와 md/ 폴더의 모든 파일을 읽어줘.
오늘 ReviewCard 컴포넌트 작업을 시작한다.

---

# Task: src/components/ReviewCard.jsx 구현

## 피그마 기준 (Review_s 노드 239:1860)
아래 디자인 명세를 정확히 구현해줘.

### 전체 카드
- 배경: bg-zinc-900 (#18181b)
- 패딩: p-9 (36px)
- 보더 반경: rounded-[36px]
- 너비: w-full (부모 컨테이너에 맞게)
- flex-col gap-6

### 상단 영역 — 유저 정보 + 별점
레이아웃: `flex items-start justify-between`

**좌측: 유저 정보**
- 아바타: size-[60px] rounded-full overflow-hidden
- 이름: Pretendard Bold / text-xl / text-zinc-50 / leading-[32px]
- 날짜: Pretendard Medium / text-lg / text-zinc-400 / leading-[24px]
- 아바타-텍스트 gap: gap-[18px]

**우측: 별점**
- ★ 아이콘 (FontAwesome faStar): size-[18px] text-primary-400
- 숫자: Manrope Bold / text-2xl / text-primary-400
- 아이콘-숫자 gap: gap-[5.985px]

### 중단 영역 — 리뷰 본문
- Pretendard Medium / text-2xl / text-zinc-200 (#e4e4e7)
- leading-[40px]
- w-full

### 하단 영역 — 액션 버튼
레이아웃: `flex items-center gap-6`

**도움돼요 버튼**
- 좋아요 아이콘 (FontAwesome faThumbsUp) + "도움돼요 {count}"
- 아이콘 size-[14px], 텍스트 text-lg text-zinc-400

**답글 버튼**
- 댓글 아이콘 (FontAwesome faComment) + "답글 {count}"
- 아이콘 size-[14px], 텍스트 text-lg text-zinc-400

---

## Props 설계
```jsx
<ReviewCard
  author='김지수'           // 작성자 이름
  avatar={null}            // 프로필 이미지 URL (없으면 placeholder)
  date='2일 전'             // 작성 날짜
  rating={10}              // 별점 (10점 만점, TMDB 기준)
  content='두 번 봤는데...' // 리뷰 본문
  likeCount={42}           // 도움돼요 수
  replyCount={3}           // 답글 수
  size='sm'                // 'sm'(1120px 기준) | 'lg'(1760px 기준)
/>
```

## 작성 형식 (CLAUDE.md 컨벤션)
```jsx
import { twMerge } from 'tailwind-merge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons'

const ReviewCard = ({
  author,
  avatar,
  date,
  rating = 0,
  content,
  likeCount = 0,
  replyCount = 0,
  size = 'sm',
}) => {
  return (
    <div className={twMerge(
      'bg-zinc-900 flex flex-col gap-6 p-9 rounded-[36px] w-full',
      size === 'lg' && 'p-12'
    )}>
      {/* 상단: 유저 정보 + 별점 */}
      {/* 중단: 리뷰 본문 */}
      {/* 하단: 도움돼요 + 답글 버튼 */}
    </div>
  )
}

export default ReviewCard
```

## 요구사항
1. avatar 없을 시 bg-zinc-700 원형 placeholder 표시
2. rating은 10점 만점 그대로 표시 (변환 없음)
3. likeCount / replyCount는 숫자 그대로 표시
4. size='lg'는 AboutPage, size='sm'은 ProfilePage에서 사용
5. FontAwesome 아이콘 사용 (faThumbsUp, faComment, faStar)
6. 인라인 스타일 style={{}} 절대 금지
7. Tailwind 임의값 [px값] 하드코딩 금지 — 표준 유틸리티 클래스 사용, 없으면 @theme 토큰 정의
8. 하드코딩 색상값 금지 — primary-400, zinc-900 등 @theme 토큰 사용

## 사용 예시
```jsx
// AboutPage.jsx / ProfilePage.jsx 에서
import ReviewCard from '../components/ReviewCard'

{reviews.map(r => (
  <ReviewCard
    key={r.id}
    author={r.author}
    avatar={r.author_details?.avatar_path
      ? EP.img(r.author_details.avatar_path, 'w185')
      : null}
    date={r.created_at}
    rating={r.author_details?.rating ?? 0}
    content={r.content}
    likeCount={0}
    replyCount={0}
    size='sm'
  />
))}
```

## TMDB 데이터 연결 포인트
```js
// EP.detail(type, id) 응답의 reviews.results 배열
{
  id: 'abc123',
  author: '김지수',
  author_details: {
    avatar_path: '/img.jpg',
    rating: 10
  },
  content: '두 번 봤는데 두 번 다 소름 돋았어요...',
  created_at: '2026-03-31T10:00:00Z'
}
```

## 공통 규칙 (매 작업마다 준수)
- 새 패키지 설치하지 마
- 기존 패키지 버전 변경하지 마
- 인라인 스타일 style={{}} 금지
- BrowserRouter / Routes / Route 절대 사용 금지
- loader / action 함수 작성 금지
- 데이터 로딩은 useFetch 훅으로만 처리
- 담당 파일 외 수정 시 팀원에게 먼저 공유
- 컴포넌트 파일 위치: src/components/
- 페이지 파일 위치: src/pages/
- 완결된 코드로 제공해줘