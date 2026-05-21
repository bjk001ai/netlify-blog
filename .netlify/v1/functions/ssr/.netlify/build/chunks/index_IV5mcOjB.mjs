import { c as createComponent } from './astro-component_UqISaWAv.mjs';
import 'piccolore';
import { j as addAttribute, l as renderHead, n as renderSlot, o as renderTemplate } from './ssr-function_D15MiK1Z.mjs';
import 'clsx';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { pgTable, text, serial, timestamp, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title, description = "Premium developer blog powered by Astro, Drizzle, and Netlify Postgres." } = Astro2.props;
  return renderTemplate`<html lang="ko"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><!-- SEO Meta Tags --><title>${title} | Antigravity Tech Blog</title><meta name="description"${addAttribute(description, "content")}><!-- Open Graph --><meta property="og:type" content="website"><meta property="og:title"${addAttribute(`${title} | Antigravity Tech Blog`, "content")}><meta property="og:description"${addAttribute(description, "content")}><!-- Google Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">${renderHead()}</head> <body class="selection:bg-purple-500/30 selection:text-purple-200 antialiased overflow-x-hidden"> <div class="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col min-h-screen"> <!-- Header --> <header class="py-6 flex justify-between items-center border-b border-white/5 relative z-50"> <a href="/" class="flex items-center space-x-3 group"> <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[1.5px] shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-all duration-300"> <div class="w-full h-full bg-[#080b11] rounded-[10px] flex items-center justify-center"> <span class="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">A</span> </div> </div> <span class="text-2xl font-bold font-display tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-pink-400 transition-all duration-300">
Antigravity<span class="text-purple-400">.</span> </span> </a> <nav class="flex items-center space-x-1 sm:space-x-2"> <a href="/" class="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200">Home</a> <a href="/blog" class="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200">Blog</a> <a href="/guestbook" class="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200">Guestbook</a> <a href="/admin/write" class="px-3 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/25 text-purple-300 hover:border-purple-500/50 hover:text-white hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300">Write</a> </nav> </header> <!-- Main Content --> <main class="flex-grow py-8 md:py-12 relative z-10"> ${renderSlot($$result, $$slots["default"])} </main> <!-- Footer --> <footer class="py-8 border-t border-white/5 text-center text-sm text-gray-500 relative z-50"> <div class="flex justify-between items-center flex-col md:flex-row space-y-4 md:space-y-0"> <p>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} Antigravity Tech Blog. Built with Astro 5, Drizzle & Netlify.</p> <div class="flex space-x-6"> <a href="#" class="hover:text-purple-400 transition-colors duration-200">GitHub</a> <a href="#" class="hover:text-purple-400 transition-colors duration-200">LinkedIn</a> <a href="#" class="hover:text-purple-400 transition-colors duration-200">Twitter</a> </div> </div> </footer> </div> </body></html>`;
}, "C:/bong/git/netlify-blog/src/layouts/BaseLayout.astro", void 0);

const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique()
});
const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  categoryId: integer("category_id").references(() => categories.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
const guestbook = pgTable("guestbook", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
const categoriesRelations = relations(categories, ({ many }) => ({
  posts: many(posts)
}));
const postsRelations = relations(posts, ({ one }) => ({
  category: one(categories, {
    fields: [posts.categoryId],
    references: [categories.id]
  })
}));

const schema = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  categories,
  categoriesRelations,
  guestbook,
  posts,
  postsRelations
}, Symbol.toStringTag, { value: 'Module' }));

const connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/netlify_blog";
const client = postgres(connectionString, { max: 1 });
const db = drizzle(client, { schema });

export { $$BaseLayout as $, db as d, guestbook as g, posts as p };
