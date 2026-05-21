import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/netlify_blog';

async function main() {
  console.log('Seeding database...');
  const client = postgres(connectionString, { max: 1 });
  const db = drizzle(client, { schema });

  // Clean existing entries in reverse order of foreign keys
  await db.delete(schema.guestbook);
  await db.delete(schema.posts);
  await db.delete(schema.categories);

  // Insert categories
  const categoriesList = await db.insert(schema.categories).values([
    { name: 'Tech & Architecture', slug: 'tech' },
    { name: 'Design & UX', slug: 'design' },
    { name: 'Development Life', slug: 'life' },
  ]).returning();

  console.log(`Inserted ${categoriesList.length} categories.`);

  const techCategory = categoriesList.find(c => c.slug === 'tech');
  const designCategory = categoriesList.find(c => c.slug === 'design');
  const lifeCategory = categoriesList.find(c => c.slug === 'life');

  // Insert initial posts
  const postsList = await db.insert(schema.posts).values([
    {
      title: 'Astro 5.0 and the Future of SSR Development',
      slug: 'astro-5-future-of-ssr',
      description: 'A comprehensive deep-dive into Astro 5.0 server-side rendering, Netlify serverless deployment, and extreme zero-JS performance.',
      content: `## Astro 5.0: The SSR Paradigm Shift
Astro is no longer just a static site generator. With Astro 5.0, hybrid rendering and fully-fledged Server-Side Rendering (SSR) have become first-class citizens. By combining the legendary 'Islands Architecture' with modern serverless edges (like Netlify's Edge Functions), you can build dynamic platforms that load in milliseconds.

### Why zero-JS?
By default, Astro renders pages on the server and strips out all JavaScript from the client bundle. JS is only shipped when interactive elements ('islands') explicitly request it. This results in incredibly fast initial page load times and perfect SEO scores.

### Combining with Drizzle ORM
In this architecture, database connections are established on-demand during request routing. Drizzle ORM acts as the ultimate lightweight layer, allowing us to perform type-safe SQL queries directly inside our Astro components:

\`\`\`typescript
// src/pages/index.astro
---
import { db } from '../db';
const posts = await db.query.posts.findMany();
---
\`\`\`

With serverless edge deployments, your database queries execute geographically near your visitors, resulting in lightning-fast response times.`,
      categoryId: techCategory?.id,
    },
    {
      title: 'The Art of Glassmorphism and Glowing Glows in Web Design',
      slug: 'art-of-glassmorphism',
      description: 'Learn how to apply harmony, gradients, backdrop-filters, and interactive shadows to design state-of-the-art developer portfolios.',
      content: `## Modern UI Trends: Depth & Luminosity
Aesthetically pleasing dark modes are defined by how they deal with hierarchy, depth, and illumination. A black background with flat boxes looks boring. 

### Glassmorphism (유리 같은 깊이감)
Glassmorphism uses translucent backdrops to let the background gradient peak through. It builds layers of elements that feel real and touchable.
\`\`\`css
.glass-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
\`\`\`

### Neon Glow (네온 글로우 효과)
Subtle radial glowing elements beneath panels add a sense of luxury. By using Tailwinds v4 gradients combined with CSS custom properties, we can create light-emitting buttons and containers that respond beautifully to hover events.

Let's look at how we can implement these ideas to completely wow our readers at first glance.`,
      categoryId: designCategory?.id,
    },
    {
      title: 'How I Built a Premium Blog Ecosystem in 2026',
      slug: 'how-i-built-premium-blog-2026',
      description: 'My experience configuring Drizzle ORM, Tailwind CSS v4, and Netlify Postgres database under 30 minutes.',
      content: `## My Journey Creating netlify-blog
Building a blog used to mean choosing between absolute speed (static Markdown) or dynamic capabilities (headless CMS / DB). In 2026, we don't have to compromise.

### The Stack
- **Framework**: Astro 5.x (SSR Mode)
- **Database**: Netlify Database (Postgres)
- **ORM**: Drizzle ORM
- **Styles**: Tailwind CSS v4 (Zero configuration Vite plugin)

### Dynamic Guestbook
Using Astro server endpoints, users can write guestbook entries directly into our Postgres DB without needing an external API server. It is incredibly clean, safe, and lightning fast.`,
      categoryId: lifeCategory?.id,
    }
  ]).returning();

  console.log(`Inserted ${postsList.length} initial posts.`);

  // Insert mock guestbook entries
  await db.insert(schema.guestbook).values([
    { name: 'Alice Lee', message: 'Wow! This blog design looks absolutely beautiful! Extremely fast loading too.' },
    { name: 'Devin', message: 'Astro 5 + Drizzle + Netlify DB is indeed the best combination of 2026.' }
  ]);

  console.log('Seeding completed successfully!');
  await client.end();
  process.exit(0);
}

main().catch(async (err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
