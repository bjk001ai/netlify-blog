# Skill: Astro & Drizzle ORM Performance & Build Optimization

## 1. 목적
이 스킬은 Astro SSR 애플리케이션의 서버 렌더링 성능을 극대화하고, Drizzle ORM 쿼리 최적화 및 Netlify 배포 환경에서의 빌드/컴파일 안정성을 확보하기 위한 구체적인 실행 절차를 정의한다.

## 2. 발동 조건 (Trigger)
사용자가 "로딩 속도 개선", "체감 성능", "홈 버튼/내비게이션 수정", "Drizzle ORM 쿼리 최적화", "Astro SSR 설정 변경", "빌드 에러 해결", "TypeScript 타입 수정" 등과 관련된 작업을 요청할 때 이 스킬 프로토콜을 활성화한다.

## 3. 세부 실행 프로토콜

### 단계 1: Astro SSR & Drizzle ORM 쿼리 최적화
- 데이터베이스 쿼리가 직렬(Serial)로 처리되어 SSR 병목을 일으키는지 확인하고, 병렬(Parallel) `Promise.all` 구조로 전환하거나 Drizzle ORM 조인(Join)을 통해 불필요한 쿼리 횟수를 축소한다.
- Netlify Serverless Function 환경에서 Postgres 클라이언트 커넥션이 매 요청마다 중복 생성되어 오버헤드를 일으키지 않도록 DB 연결 인스턴스 싱글톤 패턴이 정상 적용되었는지 검토한다.
- Tailwind CSS v4(`@tailwindcss/vite`)의 빌드 성능 및 CSS 번들 크기를 최적화한다.

### 단계 2: Astro 내비게이션 및 반응형 UX 디버깅
- `.astro` 컴포넌트 내의 데스크톱/모바일 헤더 및 내비게이션 구조를 분석하여 홈 버튼(`a` 태그 및 `href="/"`) 등 핵심 링크의 정상 작동 여부를 브라우저 관점에서 철저히 확인한다.
- Astro의 클라이언트 사이드 스크립트나 필요한 경우 View Transitions API 적용 시 이벤트 핸들러가 유실되거나 중복 등록되지 않는지 점검한다.

### 단계 3: 엄격한 TypeScript 가드 및 예외 처리
- Drizzle ORM Select/Insert 타입을 명확히 정의하고, `any` 타입을 완전히 제거하여 DB 응답 데이터에 대한 타입 안정성을 보장한다.
- API 라우트나 서버 사이드 렌더링 시 외부 API 호출 혹은 DB 에러에 대비해 적절한 `try-catch` 및 예외 처리를 구현한다.

### 단계 4: 빌드 시뮬레이션 및 배포 검증
- 모든 수정이 끝나면 컴파일 상태 및 Netlify 서버리스 호환성을 확인하기 위해 `npm run build`를 트리거한다.
- 빌드가 성공적으로 끝나면 수정 내역과 함께 영향을 받은 파일 수 및 추가/삭제된 코드 라인 수(예: `5 files changed +32 -10`)와 함께 **성능 개선 지표(예: 예상 쿼리 수 감소, LCP 개선 포인트)**를 정확히 요약하여 사용자에게 보고한다.