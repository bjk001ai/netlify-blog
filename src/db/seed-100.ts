import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL environment variable is missing in .env file.");
  process.exit(1);
}

const subjects = [
  { title: "Astro 5.0 아일랜드 하이드레이션 마스터하기", category: "tech", desc: "Astro 5.0에서 제공하는 고급 하이드레이션 기술과 아일랜드 아키텍처의 심층 분석." },
  { title: "Tailwind CSS v4로 반응형 인터페이스 구축하기", category: "design", desc: "Tailwind CSS v4의 새로운 컨테이너 쿼리 및 환경 설정 유틸리티 활용 방법." },
  { title: "세련된 글래스모피즘 대시보드 디자인", category: "design", desc: "블러 효과, 테두리 글로우, 깊이 계층 구조를 조화롭게 구현하는 디자인 가이드." },
  { title: "Drizzle ORM을 활용한 타입 안전한 데이터베이스 인터랙션", category: "tech", desc: "타입 안정성을 극대화하여 런타임 에러를 방지하는 데이터베이스 스키마 정의 기법." },
  { title: "서버리스 에지 함수 성능 최적화 가이드", category: "tech", desc: "에지 인프라를 활용하여 서버리스 콜드 스타트 및 대기 시간을 최소화하는 노하우." },
  { title: "2026년 개발자 번아웃 방지를 위한 실천 지침", category: "life", desc: "업무 생산성을 유지하면서도 정신적/체력적 건강을 돌보는 실천적 루틴 제안." },
  { title: "실무에서 유용한 Postgres 인덱스 패턴 가이드", category: "tech", desc: "올바른 인덱스 설계 방식을 통해 데이터 쿼리 속도를 비약적으로 향상시키는 방법." },
  { title: "콘텐츠 중심 웹사이트에 Astro가 최고의 선택인 이유", category: "tech", desc: "기본 zero-JS 풋프린트로 구글 Lighthouse 스코어 만점을 달성하는 아키텍처." },
  { title: "다크 모드 UI 디자인을 위한 색채 이론 기초", category: "design", desc: "눈이 편안하면서도 심미적으로 뛰어난 HSL 팔레트 매칭 규칙 가이드." },
  { title: "원격 소프트웨어 아키텍트의 하루 일과", category: "life", desc: "비동기 협업, 풀 리퀘스트 감사, 복잡한 시스템 레이아웃 설계를 원격으로 수행하기." }
];

const verbs = ["최적화 기법", "속도 향상 전략", "안전한 설계 가이드", "리팩토링 패턴", "대규모 확장 기술", "아키텍처 설계법", "디버깅 실무", "성능 분석 가이드"];
const techTopics = ["Astro 아일랜드 자원", "Postgres 테이블 관계", "TypeScript 엄격 모드 설정", "Drizzle Kit 마이그레이션", "Vite 컴파일러 파이프라인", "차세대 CSS 변수", "API 캐시 라우팅", "서버 사이드 렌더링"];

function generatePostContent(i: number, title: string, baseIndex: number): string {
  const index = baseIndex % 10;
  
  if (index === 0) {
    return `## 🏝️ Astro 5.0 아일랜드 하이드레이션 전략
Astro 5.0의 핵심 아키텍처는 정적 HTML 배포를 유지하면서도, 필요한 컴포넌트에만 동적 스크립트를 주입하는 **아일랜드 하이드레이션**입니다. 본 가이드(Vol. ${Math.ceil(i/10)})에서는 클라이언트 렌더링 성능을 최상으로 유지하기 위한 구체적인 방법론을 다룹니다.

### 🚀 아일랜드 하이드레이션 명령어 비교
Astro는 개발자가 컴포넌트 단위로 로딩 우선순위를 제어할 수 있도록 여러 하이드레이션 지시어(Directives)를 제공합니다:

1. \`client:load\`: 페이지 로드 시 즉시 해당 컴포넌트의 JS를 로드하고 활성화합니다. 내비게이션이나 검색 창과 같은 즉각적인 반응이 필요한 UI에 적합합니다.
2. \`client:idle\`: 브라우저가 첫 렌더링을 마치고 대기(Idle) 상태에 들어가면 JS를 로드합니다. 당장 급하지 않은 인터랙션에 권장됩니다.
3. \`client:visible\`: 컴포넌트가 사용자의 뷰포트에 도달했을 때 비로소 로드합니다. 무한 스크롤 피드나 페이지 하단의 댓글창에 탁월합니다.
4. \`client:only="react"\`: 서버 렌더링을 완전히 건너뛰고 클라이언트에서만 SPA처럼 렌더링되게 만듭니다.

\`\`\`astro
<!-- 실제 활용 코드 패턴 -->
<Navbar client:load />
<InteractiveChart client:visible />
<Footer />
\`\`\`

### 💡 하이드레이션 아키텍처 설계의 꿀팁
불필요한 클라이언트 사이드 JS 주입을 최소화하세요. 정적으로 표현될 수 있는 레이아웃이나 타이포그래피 요소는 순수 Astro 컴포넌트로 구성하고, 상태값 관리가 수반되는 복잡한 인터랙티브 그래픽 요소만 React, Vue, 혹은 Svelte의 아일랜드로 격리하여 배치해야 브라우저 메인 스레드 점유율을 대폭 낮출 수 있습니다.`;
  }
  
  if (index === 1) {
    return `## 🎨 Tailwind CSS v4 반응형 레이아웃 설계 가이드
Tailwind CSS v4가 마침내 릴리즈되며, 새로운 빌더 엔진 탑재와 파격적인 CSS 변수 네이티브 최적화 기능이 포함되었습니다. 이번 튜토리얼에서는 보다 강력해진 **컨테이너 쿼리(Container Queries)**와 리액티브 그리드를 활용한 반응형 UI 레이아웃 설계 방식을 소개합니다.

### 🌟 Tailwind CSS v4 주요 개선 사항
*   **Rust 기반 초고속 컴파일러**: 빌드 타임이 이전 버전 대비 최대 10배 이상 비약적으로 빨라졌습니다.
*   **CSS-First 환경 설정**: 복잡했던 \`tailwind.config.js\` 대신 표준 CSS 커스텀 속성(Variables)을 활용하여 스타일 테마를 재정의합니다.
*   **컨테이너 쿼리 기본 지원**: 브라우저 뷰포트 크기가 아닌, 해당 컴포넌트 부모 박스의 너비에 반응하는 마이크로 레이아웃 배치가 가능해졌습니다.

\`\`\`css
/* Tailwind v4 스타일 커스터마이징 예제 */
@theme {
  --color-brand-neon: #39ff14;
  --font-display: 'Outfit', sans-serif;
}
\`\`\`

### 🛠️ 실제 반응형 컴포넌트 작성 팁
이제 미디어 쿼리(\`sm:\`, \`md:\`, \`lg:\`)의 한계를 극복하고 \`@container\` 속성을 적용하여 카드가 속한 슬롯 크기에 맞춤형 레이아웃 분기가 가능합니다. 사이드바가 접히고 열리는 대시보드 구조에서 컴포넌트 스타일 깨짐 현상을 근본적으로 차단할 수 있습니다.`;
  }
  
  if (index === 2) {
    return `## ✨ 실무용 프리미엄 글래스모피즘(Glassmorphic) 디자인 시스템
글래스모피즘은 유리처럼 반투명하게 비치는 재질감과 입체적인 보더 글로우 효과를 통해 미래지향적이고 고급스러운 테크 대시보드를 구축하는 2026년 핵심 UI 트렌드입니다. 이 아티클에서는 피그마 명도를 완벽히 구현하는 다크 모드 글래스 패널 설계 공식을 파헤쳐 봅니다.

### 📐 Glassmorphism 물리적 레이어 구조
가장 고급스러운 효과를 이끌어내기 위해 아래의 세 가지 핵심 스타일 규칙을 준수해야 합니다:

1.  **배경 흐림 효과 (Backdrop Blur)**: 흐림도를 나타내는 \`backdrop-filter: blur(12px)\`를 활용해 밑단의 화려한 배경 형상을 은은하게 뭉개주어 콘텐츠의 가독성을 높입니다.
2.  **미세 투명도 대비 (Translucent Fills)**: 불투명도 5% ~ 10% 사이의 미세한 백색 채움(\`background: rgba(255, 255, 255, 0.05)\`)을 가미해 세련된 재질감을 부여합니다.
3.  **네온 보더 글로우 (Subtle Borders)**: 선명도를 위해 얇은 테두리(\`border: 1px solid rgba(255, 255, 255, 0.1)\`)를 형성하고 그림자에 부드러운 발광 효과를 추가합니다.

\`\`\`html
<!-- 프리미엄 유리막 패널 예시 코드 -->
<div class="backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg shadow-purple-500/10 p-6 rounded-2xl">
  <p class="text-white">이것은 고급스러운 유리 글래스 패널입니다.</p>
</div>
\`\`\`

### 🎨 색채 매칭 노하우
단조로운 무채색 배경 대신, 보이지 않는 백그라운드 깊숙이 퍼플 및 시안 계열의 네온 그라디언트 구체를 배치한 뒤 글래스 윈도우를 그 위에 레이어링하세요. 웹사이트가 생동감 있게 살아 움직이는 심미적 감동을 연출하게 됩니다.`;
  }
  
  if (index === 3) {
    return `## ⚡ Drizzle ORM과 TypeScript: 완벽한 타입 안전 데이터베이스 설계
런타임에 뜻하지 않게 발생하는 데이터 모델 필드 오류는 대규모 백엔드 인프라의 숨은 폭탄입니다. **Drizzle ORM**은 타사 ORM과 다르게 런타임 캐싱 오버헤드 없이 완전한 고성능 SQL 매핑과 100%에 수렴하는 타입 세이프티를 보장합니다.

### 📝 Drizzle Kit 데이터 모델 정의
타입 선언과 컬럼 맵을 일원화하여 유지보수가 매우 간단합니다:

\`\`\`typescript
import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
\`\`\`

### ⚙️ 관계 매핑 및 쿼리 파워
Drizzle의 \`relations\` API를 사용하면 복잡한 Join SQL문을 명시적으로 작성하지 않고도 연관 데이터를 한 번에 가져올 수 있는 편리함이 극대화됩니다.

*   자동 타입 추론 제공: 데이터 타입 정의가 쿼리 결과에 실시간 투영됩니다.
*   가벼운 경량 드라이버: 불필요한 추상화 계층을 걷어내어 순수 드라이버 실행 속도와 차이가 거의 나지 않는 극한의 속도를 냅니다.
*   쉬운 마이그레이션 도구: \`drizzle-kit push\` 명령을 통하면 복잡한 마이그레이션 스크립트 작성 단계 없이 로컬 및 리모트 스키마 싱크를 신속하게 완료할 수 있습니다.`;
  }
  
  if (index === 4) {
    return `## ⚡ 서버리스 에지 함수(Edge Functions) 대기 시간 및 콜드 스타트 극복
최신 클라우드 서버리스 패러다임은 중앙 인프라에서 벗어나 유저와 가장 밀접한 물리적 위치에서 코드를 실행하는 에지 라우팅으로 나아가고 있습니다. 본 고안에서는 V8 엔진 경량 함수를 통해 콜드 스타트 현상을 극복하고 초고속 웹을 설계하는 요령을 안내합니다.

### 🚀 콜드 스타트 현상의 핵심 원인
전형적인 서버리스(Serverless Lambda) 인프라는 일정 시간 요청이 인입되지 않으면 컨테이너 리소스를 회수합니다. 이후 첫 요청 발생 시 컨테이너 부팅 및 런타임 구동 시간으로 인해 짧게는 1초, 길게는 수 초의 딜레이(콜드 스타트)가 수반됩니다.

### 🛠️ 대기 시간 개선을 위한 세 가지 룰
1.  **에지 함수(Edge Web Workers) 도입**: 경량 V8 엔진 기반의 서버리스 서비스(Netlify Edge Functions, Cloudflare Workers)는 별도의 컨테이너 기동 없이 수 밀리초 만에 코드를 실행하므로 지연을 사실상 완전히 없애줍니다.
2.  **데이터베이스 커넥션 풀링**: 에지 함수에서 무겁게 세팅되는 DB 드라이버 설정을 탈피하여 단일 단축 커넥션 설정을 적극 권장합니다.
3.  **글로벌 캐싱 정책 최적화**: API 라우트 응답 시 \`Cache-Control: public, max-age=60, s-maxage=3600\` 지정을 통해 전 세계 CDN 노드에 다이렉트 캐싱되도록 만듭니다.

\`\`\`javascript
// Netlify 엣지 환경 대응을 위한 단축 클라이언트 생성 예제
const client = postgres(connectionString, { max: 1 });
\`\`\`

에지 인프라와 고효율 코드가 만나면 클라우드 환경에서도 지연이 전혀 느껴지지 않는 매끄러운 고성능 어플리케이션을 완성할 수 있습니다.`;
  }
  
  if (index === 5) {
    return `## 🧘 2026년 개발자의 번아웃 예방 및 지속 가능한 코딩 생태계 구축
IT 업계의 치열한 기술 사이클 속에서 많은 엔지니어들은 숨 가쁜 학습 및 릴리즈 일정에 지쳐 번아웃(Burnout)의 위기에 자주 직면하곤 합니다. 일과 건강의 균형 잡힌 라이프스타일을 지속하여 훌륭한 생산성을 장기적으로 보존하는 현대인의 자기관리 가이드입니다.

### 📊 번아웃 자가 진단 리스트
*   매일 아침 컴퓨터 모니터 앞에 앉는 것이 극도로 무력하거나 흥미가 떨어진다.
*   간단한 버그 해결에도 평소보다 심하게 예민해지고 짜증이 난다.
*   휴식 시간에도 온전히 집중하지 못하고 남은 일정과 백로그에 대한 압박감을 느낀다.

### 🚴 생산성 유지를 위한 지속 가능한 실천 루틴
1.  **뽀모도로(Pomodoro) 시간제 활용**: 50분 집중 코딩 후에는 강제적으로 10분간 의자에서 일어나 가벼운 스트레칭과 수분 섭취를 수행하세요.
2.  **비동기 소통 체계의 일상화**: 실시간 슬랙/디스코드 메시지에 즉각 반응해야 하는 피로도를 걷어내기 위해 집중 모드 시간을 별도로 지정하여 활용합니다.
3.  **코드 너머의 생활 취미 탐색**: 퇴근 후 컴퓨터 화면을 끈 뒤에는 자연 친화적인 운동, 독서, 요리 등의 요소를 취미화하여 뇌에 온전한 오프라인 상태의 회복 기회를 주어야 합니다.

장기적으로 성공하는 뛰어난 아키텍트는 코딩 속도가 빠른 사람이 아니라, 자신의 에너지 관리를 장기적인 주기로 밸런스 있게 유지하여 오랜 세월 묵묵히 성장하는 사람입니다.`;
  }
  
  if (index === 6) {
    return `## 🗂️ 실무 개발자를 위한 Postgres 인덱스(Indexing) 설계 패턴 총정리
수천만 건이 넘는 대규모 데이터셋을 활용할 때 올바르지 않은 인덱스는 데이터베이스 쿼리를 수 초 이상 지연시키는 최악의 병목입니다. **Postgres**의 다양한 인덱스 구조와 실무에서 꼭 지켜야 하는 동작 규칙을 완벽 정리합니다.

### 🔍 주요 인덱스 종류의 적재적소 선택 가이드
*   **B-Tree 인덱스**: 대부분의 기본 인덱스로 쓰이며 크다(\`>\`), 작다(\`<\`), 같다(\`=\`) 등의 비교 연산과 범위 검색에 매우 유용합니다.
*   **GIN (Generalized Inverted Index)**: 배열 데이터나 JSONB 타입 내부 필드의 요소를 복합적으로 색인하는 데 최고의 선택입니다.
*   **Hash 인덱스**: 단순 동등 비교(\`=\`) 조건에만 동작하며, 고유 키 스캔 속도를 최대치로 빠르게 올려줍니다.

\`\`\`sql
-- 복합 인덱스 생성 실무 SQL문 예시
CREATE INDEX idx_posts_category_created 
ON posts (category_id, created_at DESC);
\`\`\`

### ⚠️ 인덱스 적용 시의 주요 주의 사항
인덱스는 만능이 아닙니다! 모든 테이블 컬럼에 무분별하게 추가하면, \`INSERT\`, \`UPDATE\` 및 \`DELETE\`를 수행할 때마다 매번 인덱스 트리 구조를 새롭게 연산하여 갱신해야 하므로 쓰기 성능이 급격히 손실됩니다. 정밀한 실행 계획 분석(\`EXPLAIN ANALYZE\`)을 동반하여 탐색 주기를 꼭 파악하시기 바랍니다.`;
  }
  
  if (index === 7) {
    return `## 🚀 Astro 아키텍처: 왜 대형 테크 포털은 static 기반 Astro를 선택할까?
대규모 개발자 문서 포털이나 콘텐츠 중심의 미디어 플랫폼들이 무거운 React Next.js SPA 중심 프레임워크를 탈피하고 **Astro**로 신속하게 전환하는 까닭은 무엇일까요? 해답은 구글 검색 랭킹 노출(SEO)과 극한의 로딩 속도를 달성해 주는 아키텍처적 차이에 있습니다.

### 💎 Next.js VS Astro 핵심 메커니즘 차이
*   **Next.js (App Router)**: 서버에서 첫 페이지를 생성하여 내려준 뒤에도 클라이언트 단에서 거대한 React 런타임 코드를 로드해 하이드레이션을 진행하며 SPA 엔진을 활성화합니다.
*   **Astro (Zero-JS by Default)**: 기본적으로 브라우저에 단 1바이트의 자바스크립트도 전달하지 않는 완전 정적 HTML 빌드를 실현합니다. 동적 기능이 꼭 필요한 영역에만 컴포넌트 단위의 아일랜드를 적용하여 매우 가볍습니다.

\`\`\`astro
---
// Astro 파일의 이 영역은 서버 빌드 타임에만 실행되어 브라우저 리소스를 쓰지 않습니다!
const response = await fetch('https://api.example.com/posts');
const data = await response.json();
---
<ul>
  {data.map(item => <li>{item.title}</li>)}
</ul>
\`\`\`

### 🏆 완벽한 라이트하우스(Lighthouse) 스코어 실현
클라이언트 측 메인 스레드를 블로킹하는 리소스를 완전히 지워버리기 때문에 웹 접근성, 검색 엔진 검색 최적화, 그리고 무엇보다 모바일 초저대역폭 환경에서의 사용자 로딩 속도가 비약적으로 향상됩니다. 포털 운영에 강력한 힘이 됩니다.`;
  }
  
  if (index === 8) {
    return `## 🎨 완벽한 다크 모드(Dark Mode) 설계를 위한 고급 색채 디자인 이론
개발자 포털에 적용할 세련되고 신비로운 분위기를 연출하기 위해서는 단순히 흰색 배경을 완전한 검은색(\`#000000\`)으로 반전시키는 방식은 절대 금물입니다. 이는 강한 눈의 피로도와 글래스 투명도 반사의 부자연스러움을 야기합니다. 조화롭고 눈이 편안한 색채 규칙을 알아봅니다.

### 🎨 다크 모드 주요 명도 규칙
1.  **순수 블랙 지양**: 은은하고 부드러운 다크 그레이 및 네이비 색조(\`#090d16\` 또는 \`#0b0f19\`)를 기본 백그라운드로 지정하면 눈의 대비 압박을 덜어주며 깊이감 구현이 용이합니다.
2.  **HSL 색상 모델 적극 사용**: 명도 제어가 편리한 HSL(Hue, Saturation, Lightness) 모델을 스타일 변수로 선언하고 컴포넌트 레이어 깊이마다 Lightness 값을 5% ~ 10% 단위로 미세 조정하여 가독성을 높입니다.
3.  **네온 글로우 포인트 활용**: 다크 그레이 베이스 위에는 시안(\`#06b6d4\`), 퍼플(\`#a855f7\`) 계열의 채도가 높은 파스텔 네온 색상을 강조 컬러로 지정하여 밋밋함을 탈피하고 세련된 포인트를 완성합니다.

\`\`\`css
/* 가독성 높은 다크 모드 계층 변수 구조 예시 */
:root {
  --bg-base: hsl(220, 30%, 6%);
  --bg-card: hsl(220, 25%, 11%);
  --text-primary: hsl(220, 10%, 95%);
}
\`\`\`

사용자의 시력을 보존하고 오랜 시간 오랫동안 글에 몰입하게 돕는 배려 넘치는 다크 모드 설계 노하우는 디자인의 품격을 한 단계 끌어올리는 중요한 마법입니다.`;
  }
  
  return `## 💻 원격 소프트웨어 아키텍트의 하루와 고부가가치 시스템 설계
비동기 업무 시스템이 고도화된 글로벌 소프트웨어 조직에서 시니어 소프트웨어 아키텍트(Software Architect)는 어떤 방식으로 소통하고 팀의 복잡한 설계 장벽을 허물고 있을까요? 물리적 장벽을 초월하여 시스템 무결성을 유지하는 아키텍트의 일상 일기입니다.

### 📅 하루 일과의 흐름
*   **09:00 - 아키텍처 문서 및 RFC 검토**: 개발 조직이 작성해 둔 변경 요구 제안서(Request for Comments)를 분석하며 데이터 병목이나 인프라 과부하 가능성을 검증합니다.
*   **11:00 - 핵심 기술 연구 및 프로토타입 검증**: 새롭게 도입할 기술 스택(예: Astro 5 + Drizzle 등)의 PoC(Proof of Concept) 빌드를 직접 테스트하며 로드맵과의 일치성을 조사합니다.
*   **14:00 - 복잡한 인프라 시각화 작업**: 복잡하게 분산된 마이크로서비스들의 엣지 라우팅 구조를 다이어그램 등으로 직관적으로 묘사하여 전체 개발팀이 나침반으로 삼게 합니다.

### 🛠️ 시니어가 지키는 가장 큰 소통 철학
"기록되지 않은 아키텍처 설계는 존재하지 않는 디자인이다." 비동기 원격 조직의 지리적 단점을 뛰어넘기 위해 모든 아키텍처 검토 내용과 트레이드 오프 선택 기록(ADR, Architecture Decision Record)은 위키와 마크다운으로 상세히 문서화하여 투명하게 공유되어야 지적 파편화를 막을 수 있습니다.`;
}

async function main() {
  console.log('한국어 고품질 포스트 100개 시딩 시작...');
  const client = postgres(connectionString, { max: 1 });
  const db = drizzle(client, { schema });

  // Reset database safely
  await db.delete(schema.guestbook);
  await db.delete(schema.posts);
  await db.delete(schema.categories);

  // Re-seed categories
  const categoriesList = await db.insert(schema.categories).values([
    { name: '기술 & 아키텍처', slug: 'tech' },
    { name: '디자인 & UX', slug: 'design' },
    { name: '개발자의 삶', slug: 'life' },
  ]).returning();

  const categoryMap = {
    tech: categoriesList.find(c => c.slug === 'tech')?.id,
    design: categoriesList.find(c => c.slug === 'design')?.id,
    life: categoriesList.find(c => c.slug === 'life')?.id,
  };

  const newPosts = [];
  const existingSlugs = new Set();

  for (let i = 1; i <= 100; i++) {
    // Select base template or construct dynamically
    const base = subjects[i % subjects.length];
    
    // Construct rich unique names to avoid slug collisons
    let title = `${base.title} (제 ${Math.ceil(i / 10)}권)`;
    if (i > 30) {
      const verb = verbs[i % verbs.length];
      const topic = techTopics[i % techTopics.length];
      title = `실무 관점의 ${topic} ${verb} (#${i})`;
    }

    // Slug generation: Fallback to English categories/numbers for URL compatibility
    let slug = `${base.category}-post-${i}`;
    existingSlugs.add(slug);

    const categoryId = categoryMap[base.category as keyof typeof categoryMap] || categoryMap.tech;

    newPosts.push({
      title,
      slug,
      description: `${base.desc} 본 아티클은 2026년 최신 기술 아젠다에 따라 작성된 실무 지침서 시리즈 중 ${i}번째 글입니다.`,
      content: generatePostContent(i, title, i),
      categoryId,
      createdAt: new Date(Date.now() - i * 3600 * 1000 * 12) // staggered dates
    });
  }

  // Bulk Insert
  const inserted = await db.insert(schema.posts).values(newPosts).returning();
  console.log(`성공적으로 ${inserted.length}개의 포스트를 데이터베이스에 등록했습니다!`);

  // Feed initial guestbook entries
  await db.insert(schema.guestbook).values([
    { name: '김민수', message: '성능 최적화 가이드가 너무 유용하네요! Astro 5 적용 고려 중인데 도움 많이 받았습니다.' },
    { name: '이지은', message: '프리미엄 다크 테마 디자인이 너무 세련되고 깔끔해서 보기 편해요.' }
  ]);

  await client.end();
  console.log('시딩 완료!');
  process.exit(0);
}

main().catch(async (err) => {
  console.error('시딩 실패:', err);
  process.exit(1);
});
