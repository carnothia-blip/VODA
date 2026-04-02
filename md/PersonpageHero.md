# PersonPage Hero 디자인 수정 프롬프트
> Gemini CLI에 아래 내용을 순서대로 붙여넣어 실행한다.

---

## 컨텍스트 로드 (작업 시작 전 필수)

```
CLAUDE.md를 읽어줘. .claude/skills/voda-vibe 안에 있는 md 파일들도 읽어줘.
오늘 작업: PersonPage.jsx의 Hero 섹션 디자인을 Figma 시안에 맞게 수정한다.
새 패키지 설치하지 마.
```

---

## STEP 1 — 현재 파일 상태 확인

```
src/pages/PersonPage.jsx 파일을 열어서
Hero 섹션 관련 JSX 구조와 Tailwind 클래스를 알려줘.
코드 수정하지 말고 현재 상태만 보고해줘.
```

---

## STEP 2 — Hero 섹션 디자인 수정

```
src/pages/PersonPage.jsx의 Hero 섹션을 아래 Figma 시안 기준으로 수정해줘.

[Figma 시안 분석]
- 배경: 거의 검정(zinc-950). 우측 상단에 보라+파랑 빛번짐(glow) 효과
- 레이아웃: 좌측 정렬. 상단 여백 충분히 확보 (pt-24 이상)
- 전체 너비: max-w-screen-2xl mx-auto px-20

[텍스트 레이어 — 위에서 아래 순서]

1. 영문 소제목
   - 텍스트: 'ETHEREAL PROFILES'
   - 클래스: text-xs font-semibold tracking-widest text-primary-400 uppercase mb-4

2. 메인 타이틀
   - 텍스트: '사람을 보다'
   - 클래스: text-8xl font-bold text-zinc-50 font-sans leading-tight mb-6
   - (font-sans는 index.css @theme의 Gmarket Sans TTF 토큰)

3. 부제 텍스트
   - 텍스트: 'VODA가 주목하는 스크린 뒤의 빛나는 주역들. 시대를 대표하는 배우와 감독들을 만나보세요.'
   - 클래스: text-base text-zinc-400 leading-relaxed mb-10 max-w-xl

4. 검색바 컴포넌트
   - SearchBar가 있으면 variant='normal' placeholder='궁금한 영화나 TV 프로그램을 물어보세요.'
   - SearchBar가 없으면 아래 인라인 JSX로 대체:

     <div className='flex items-center bg-transparent border border-zinc-600 rounded-full px-6 py-4 max-w-xl'>
       <input
         className='flex-1 bg-transparent outline-none text-zinc-300 text-sm placeholder-zinc-500'
         placeholder='궁금한 영화나 TV 프로그램을 물어보세요.'
       />
       <button className='size-9 rounded-full bg-primary-500 hover:bg-primary-400 transition-colors flex items-center justify-center flex-shrink-0'>
         <FontAwesomeIcon icon={faChevronRight} className='text-white text-xs' />
       </button>
     </div>

[배경 빛번짐(glow) 효과]
Hero 섹션 최상위 div를 relative로 설정하고
아래 div를 자식으로 추가 (절대 위치):

<div className='absolute top-0 right-0 w-2/5 h-full pointer-events-none'>
  <div className='absolute top-1/4 right-0 w-96 h-96 bg-primary-600 opacity-20 rounded-full blur-3xl' />
  <div className='absolute top-1/3 right-24 w-64 h-64 bg-blue-600 opacity-15 rounded-full blur-3xl' />
</div>

[전체 Hero 섹션 완성 구조]
<section className='relative min-h-80 pt-24 pb-16 overflow-hidden'>
  {/* 빛번짐 배경 */}
  <div className='absolute top-0 right-0 w-2/5 h-full pointer-events-none'>
    <div className='absolute top-1/4 right-0 w-96 h-96 bg-primary-600 opacity-20 rounded-full blur-3xl' />
    <div className='absolute top-1/3 right-24 w-64 h-64 bg-blue-600 opacity-15 rounded-full blur-3xl' />
  </div>
  {/* 텍스트 콘텐츠 */}
  <div className='relative z-10 max-w-screen-2xl mx-auto px-20'>
    <p className='text-xs font-semibold tracking-widest text-primary-400 uppercase mb-4'>
      ETHEREAL PROFILES
    </p>
    <h1 className='text-8xl font-bold text-zinc-50 font-sans leading-tight mb-6'>
      사람을 보다
    </h1>
    <p className='text-base text-zinc-400 leading-relaxed mb-10 max-w-xl'>
      VODA가 주목하는 스크린 뒤의 빛나는 주역들. 시대를 대표하는 배우와 감독들을 만나보세요.
    </p>
    {/* 검색바 */}
    [검색바 JSX — 위 4번 참고]
  </div>
</section>

[import 추가 — 없으면 상단에 추가]
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

[규칙]
- 인라인 style={{}} 금지
- 임의값 [px값] 금지 — blur-3xl, opacity-20 등 표준 클래스 사용
- 하드코딩 색상 금지 — primary-600, blue-600 등 토큰/표준 클래스 사용
- 세미콜론 생략, 작은따옴표, 2칸 들여쓰기
- GNB/Footer 렌더 금지 (App.jsx Layout이 처리)
- 새 패키지 설치하지 마
```

---

## STEP 3 — 저장 전 셀프 검토

```
방금 수정한 PersonPage.jsx Hero 섹션을 검토해줘.

확인 항목:
1. 'ETHEREAL PROFILES' 소제목이 primary-400 색상인지
2. '사람을 보다' 타이틀이 text-8xl font-sans 인지
3. 빛번짐 div가 absolute + blur-3xl + opacity 클래스로만 구성됐는지
   (style={{}} 없는지)
4. 검색바 input에 placeholder 텍스트가 들어갔는지
5. 전송 버튼이 bg-primary-500 원형인지
6. 임의값 [px값] 사용됐는지 — 있으면 표준 클래스로 교체
7. 세미콜론 없는지, 작은따옴표인지

문제 있으면 해당 부분만 수정해줘. 새 패키지 설치하지 마.
```

---

## STEP 4 — 브라우저 확인 후 미세 조정 (선택)

실제 브라우저에서 확인 후 아래 중 필요한 것만 골라서 붙여넣는다.

### 타이틀 크기 조정이 필요할 때
```
PersonPage.jsx에서 '사람을 보다' 타이틀 크기를 text-8xl → text-7xl로 줄여줘.
세미콜론 생략, 작은따옴표 유지. 새 패키지 설치하지 마.
```

### 빛번짐이 너무 강할 때
```
PersonPage.jsx에서 빛번짐 div의 opacity를 낮춰줘.
opacity-20 → opacity-10, opacity-15 → opacity-10 으로 변경.
새 패키지 설치하지 마.
```

### 빛번짐이 너무 약할 때
```
PersonPage.jsx에서 빛번짐 div의 opacity를 높여줘.
opacity-20 → opacity-30, opacity-15 → opacity-20 으로 변경.
새 패키지 설치하지 마.
```

### 검색바 너비 조정이 필요할 때
```
PersonPage.jsx에서 검색바 최대 너비를 max-w-xl → max-w-2xl로 늘려줘.
새 패키지 설치하지 마.
```

### 상단 여백 조정이 필요할 때
```
PersonPage.jsx에서 Hero 섹션 상단 여백을 pt-24 → pt-32로 늘려줘.
새 패키지 설치하지 마.
```

---

## 에러 발생 시 즉시 사용 프롬프트

```
이 에러를 해결해줘:
[에러 메시지 전체 붙여넣기]

먼저 아래 3가지 중 어디에 해당하는지 분류해줘:
1. 코드 에러 (오타, import 경로, props 불일치)
2. 환경 에러 (.env 누락, node_modules, 경로 착각)
3. API 에러 (TMDB 키, 엔드포인트, 응답 구조)

분류 후에만 수정해줘.
새 패키지 설치하지 마. 기존 패키지 버전 변경하지 마.
```