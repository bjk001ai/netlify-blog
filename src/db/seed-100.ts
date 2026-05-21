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
      content: `## 핵심 요약 및 개요: ${title}

이 가이드는 현대 개발 환경에서 요구되는 고성능 파이프라인 설계, 스타일링 최적화 및 안정적인 데이터베이스 연동 기술을 다룹니다.

### 🚀 핵심 체크포인트
1. **점진적 하이드레이션 전략**: 필요한 시점에만 자바스크립트를 로드하여 초기 화면 표시 속도를 극대화합니다.
2. **효율적인 데이터 쿼리**: Drizzle ORM의 관계(Relations) 매핑을 활용하여 다중 조인 및 N+1 쿼리 문제를 완벽히 회피합니다.
3. **최신 빌더 탑재**: Tailwind CSS v4 컴파일러를 통해 초고속 CSS 파싱 및 빌드 파이프라인을 구축합니다.

\`\`\`typescript
// 데이터베이스 성능 벤치마크 예시
const start = performance.now();
const result = await db.select().from(posts).limit(10);
console.log(\`쿼리 실행 소요시간: \${performance.now() - start}ms\`);
\`\`\`

### 💡 실무 적용 팁
사용자 경험을 극대화하려면 물리적으로 가까운 위치에 엣지 서버와 Postgres 복제본을 배치하는 것이 좋습니다. 이를 통해 응답 대기 시간을 50ms 미만으로 낮추어 매끄러운 스크롤 인터랙션을 완성할 수 있습니다.

글을 읽어주셔서 감사합니다. 앞으로 더 유용한 아키텍처 및 디자인 가이드로 찾아뵙겠습니다!`,
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
