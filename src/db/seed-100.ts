import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL environment variable is missing in .env file.");
  process.exit(1);
}

const subjects = [
  { title: "Mastering Astro 5.0 Island Hydration", category: "tech", desc: "A deep dive into advanced hydration techniques in Astro 5.0." },
  { title: "Building Responsive Interfaces with Tailwind CSS v4", category: "design", desc: "How to utilize new container queries and configuration settings in Tailwind CSS v4." },
  { title: "Designing Sleek Glassmorphic Dashboards", category: "design", desc: "Best practices for implementing blur, border glow, and depth hierarchies." },
  { title: "Type-Safe Database Interactivity with Drizzle ORM", category: "tech", desc: "Eliminating run-time errors through type-safe schema declarations." },
  { title: "Serverless Edge Functions Speed Optimization", category: "tech", desc: "Tips to minimize cold starts and latency using serverless edge infrastructures." },
  { title: "Developer Burnout Prevention Guidelines in 2026", category: "life", desc: "Actionable routines to sustain coding productivity without compromising well-being." },
  { title: "The Pragmatic Guide to Postgres Indexing Patterns", category: "tech", desc: "Boost your query performance by choosing the correct index styles." },
  { title: "Why Astro is the Ultimate Framework for Content-Heavy Sites", category: "tech", desc: "Zero-JS footprint by default achieves near-perfect Lighthouse scores." },
  { title: "Color Theory for Dark Mode UI Designs", category: "design", desc: "Curating harmonious HSL palette rules for accessible dark themes." },
  { title: "A Day in the Life of a Remote Software Architect", category: "life", desc: "How to manage communications, pull-request audits, and system layouts remotely." }
];

const verbs = ["Optimizing", "Accelerating", "Securing", "Refactoring", "Scaling", "Architecting", "Debugging", "Analyzing"];
const techTopics = ["Astro Island Assets", "Postgres Relations", "TypeScript Strict Configs", "Drizzle Kit Migrations", "Vite Compiler Pipelines", "Next-gen CSS Variables", "API Cache Routing", "Server-Side Rendering"];

async function main() {
  console.log('Seeding 100 high-quality blog posts...');
  const client = postgres(connectionString, { max: 1 });
  const db = drizzle(client, { schema });

  // Reset database safely
  await db.delete(schema.guestbook);
  await db.delete(schema.posts);
  await db.delete(schema.categories);

  // Re-seed categories
  const categoriesList = await db.insert(schema.categories).values([
    { name: 'Tech & Architecture', slug: 'tech' },
    { name: 'Design & UX', slug: 'design' },
    { name: 'Development Life', slug: 'life' },
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
    let title = `${base.title} (Vol. ${Math.ceil(i / 10)})`;
    if (i > 30) {
      const verb = verbs[i % verbs.length];
      const topic = techTopics[i % techTopics.length];
      title = `${verb} ${topic} in Production (#${i})`;
    }

    let slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Ensure absolutely unique slugs
    if (existingSlugs.has(slug)) {
      slug = `${slug}-${i}`;
    }
    existingSlugs.add(slug);

    const categoryId = categoryMap[base.category as keyof typeof categoryMap] || categoryMap.tech;

    newPosts.push({
      title,
      slug,
      description: `${base.desc} This is article number ${i} in our comprehensive 2026 technical learning curriculum.`,
      content: `## Executive Overview for: ${title}

This is a premium technical publication curated for the 2026 engineer dashboard. It provides direct insight into maximizing utility pipelines, resolving configuration friction, and building modern web components.

### 🚀 Performance Checkpoints
1. **Initial Hydration Strategy**: Ensure that javascript components only hydrate when visible in the viewport.
2. **Database Query Bundling**: Avoid N+1 query patterns using Drizzle relations batch-fetching.
3. **Tailwind Class Compilations**: Leverage Tailwind CSS v4's high-speed CSS parsing.

\`\`\`typescript
// Benchmark execution profile
const start = performance.now();
const result = await db.select().from(posts).limit(10);
console.log(\`Execution benchmark: \${performance.now() - start}ms\`);
\`\`\`

### 💡 Core Takeaways
Always audit execution paths geographically close to users. By placing serverless Postgres endpoints and edge handlers near your visitor clusters, you drop average payload response times to under 50ms.

Thank you for reading article #${i} in this technical deep-dive collection! Stay tuned for more architectural design pattern updates.`,
      categoryId,
      createdAt: new Date(Date.now() - i * 3600 * 1000 * 12) // staggered dates
    });
  }

  // Bulk Insert
  const inserted = await db.insert(schema.posts).values(newPosts).returning();
  console.log(`Successfully seeded ${inserted.length} premium posts into Netlify Database!`);

  // Feed initial guestbook entries
  await db.insert(schema.guestbook).values([
    { name: 'Alice Lee', message: 'The bulk database integration works brilliantly! Insane loading speeds.' },
    { name: 'Charlie', message: 'Astro 5 and Drizzle combination is perfect for developer portals.' }
  ]);

  await client.end();
  console.log('Bulk seeding complete!');
  process.exit(0);
}

main().catch(async (err) => {
  console.error('Bulk seeding failed:', err);
  process.exit(1);
});
