import { c as createComponent } from './astro-component_UqISaWAv.mjs';
import 'piccolore';
import { r as renderComponent, o as renderTemplate, m as maybeRenderHead } from './ssr-function_D15MiK1Z.mjs';
import { d as db, $ as $$BaseLayout } from './index_IV5mcOjB.mjs';
import { $ as $$BlogCard } from './BlogCard_COLDYo21.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  let posts = [];
  let categoriesList = [];
  try {
    posts = await db.query.posts.findMany({
      orderBy: (posts2, { desc }) => [desc(posts2.createdAt)],
      with: {
        category: true
      }
    });
    categoriesList = await db.query.categories.findMany();
  } catch (error) {
    console.error("Failed to load blog posts:", error);
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Blog Archive", "description": "A complete collection of all articles, technical analysis, and posts." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="space-y-12"> <!-- Header --> <div class="space-y-4 max-w-2xl"> <h1 class="text-4xl font-extrabold font-display tracking-tight text-white sm:text-5xl">
Writing & <span class="text-gradient">Resources</span> </h1> <p class="text-gray-400 text-lg leading-relaxed">
프로젝트 트러블슈팅, 신기술 아키텍처에 관한 기술 분석 글을 한눈에 모아보세요.
</p> </div> <!-- Category Filter Bar --> <div class="flex flex-wrap gap-2 border-b border-white/5 pb-6"> <span class="px-4 py-1.5 rounded-full text-xs font-semibold uppercase border border-purple-500 bg-purple-500/20 text-white transition-all">
All Articles
</span> ${categoriesList.map((category) => renderTemplate`<span class="px-4 py-1.5 rounded-full text-xs font-semibold uppercase border border-white/10 text-gray-400"> ${category.name} </span>`)} </div> <!-- Grid --> ${posts.length === 0 ? renderTemplate`<div class="glass-panel rounded-2xl p-16 text-center text-gray-500 space-y-4"> <p class="text-lg">No publications found.</p> <p class="text-sm text-gray-600">Please make sure to run the seed script to populate posts database.</p> </div>` : renderTemplate`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${posts.map((post) => renderTemplate`${renderComponent($$result2, "BlogCard", $$BlogCard, { "title": post.title, "slug": post.slug, "description": post.description, "date": post.createdAt, "category": post.category?.name })}`)} </div>`} </div> ` })}`;
}, "C:/bong/git/netlify-blog/src/pages/blog/index.astro", void 0);

const $$file = "C:/bong/git/netlify-blog/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
