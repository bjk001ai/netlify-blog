import { c as createComponent } from './astro-component_UqISaWAv.mjs';
import 'piccolore';
import { r as renderComponent, o as renderTemplate, m as maybeRenderHead, j as addAttribute, u as unescapeHTML } from './ssr-function_D15MiK1Z.mjs';
import { d as db, $ as $$BaseLayout } from './index_IV5mcOjB.mjs';
import { marked } from 'marked';

const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  if (!slug) {
    return Astro2.redirect("/404");
  }
  let post = null;
  let parsedContent = "";
  try {
    post = await db.query.posts.findFirst({
      where: (posts2, { eq: eq2 }) => eq2(posts2.slug, slug),
      with: {
        category: true
      }
    });
    if (post) {
      parsedContent = await marked.parse(post.content);
    }
  } catch (error) {
    console.error("Failed to query post details:", error);
  }
  if (!post) {
    return Astro2.redirect("/404");
  }
  const formattedDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(post.createdAt);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": post.title, "description": post.description }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="max-w-3xl mx-auto space-y-8"> <!-- Back Button --> <a href="/blog" class="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 group"> <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 transform group-hover:-translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path> </svg> <span>Back to Archive</span> </a> <!-- Header --> <header class="space-y-4 border-b border-white/5 pb-8"> <div class="flex items-center space-x-3 text-sm"> ${post.category && renderTemplate`<span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase border border-purple-500/20 bg-purple-500/10 text-purple-300"> ${post.category.name} </span>`} <time${addAttribute(post.createdAt.toISOString(), "datetime")} class="text-gray-500"> ${formattedDate} </time> </div> <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display leading-tight text-white tracking-tight text-glow"> ${post.title} </h1> <p class="text-gray-400 text-base sm:text-lg italic leading-relaxed pl-4 border-l-2 border-purple-500/40"> ${post.description} </p> </header> <!-- Content (Rendered Markdown) --> <div class="prose max-w-none">${unescapeHTML(parsedContent)}</div> </article> ` })}`;
}, "C:/bong/git/netlify-blog/src/pages/blog/[slug].astro", void 0);

const $$file = "C:/bong/git/netlify-blog/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
