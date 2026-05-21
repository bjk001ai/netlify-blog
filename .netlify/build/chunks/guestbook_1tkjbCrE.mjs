import { c as createComponent } from './astro-component_UqISaWAv.mjs';
import 'piccolore';
import { r as renderComponent, o as renderTemplate, m as maybeRenderHead, j as addAttribute } from './ssr-function_D15MiK1Z.mjs';
import { d as db, g as guestbook, $ as $$BaseLayout } from './index_IV5mcOjB.mjs';

const $$Guestbook = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Guestbook;
  let errorMessage = "";
  if (Astro2.request.method === "POST") {
    try {
      const data = await Astro2.request.formData();
      const name = data.get("name")?.toString().trim();
      const message = data.get("message")?.toString().trim();
      if (!name || !message) {
        errorMessage = "이름과 메시지를 모두 입력해 주세요.";
      } else {
        await db.insert(guestbook).values({
          name,
          message
        });
        return Astro2.redirect("/guestbook");
      }
    } catch (error) {
      console.error("Error saving guestbook entry:", error);
      errorMessage = "데이터베이스에 방명록을 남기는 도중 에러가 발생했습니다.";
    }
  }
  let entries = [];
  try {
    entries = await db.query.guestbook.findMany({
      orderBy: (gb, { desc }) => [desc(gb.createdAt)]
    });
  } catch (error) {
    console.error("Error fetching guestbook entries:", error);
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Guestbook", "description": "Leave a message, say hello or provide feedback to the developer." }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-3xl mx-auto space-y-12"> <!-- Header --> <div class="space-y-4"> <h1 class="text-4xl font-extrabold font-display tracking-tight text-white sm:text-5xl">
Guestbook<span class="text-gradient">.</span> </h1> <p class="text-gray-400 text-lg leading-relaxed">
방문해 주셔서 감사합니다! 자유롭게 방명록이나 피드백을 남겨주세요.
</p> </div> <!-- Error Callout --> ${errorMessage && renderTemplate`<div class="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm"> ${errorMessage} </div>`} <!-- Form Panel --> <section class="glass-panel rounded-2xl p-6 md:p-8 relative overflow-hidden"> <div class="absolute -left-12 -bottom-12 w-28 h-28 bg-indigo-500/5 rounded-full blur-2xl"></div> <form method="POST" class="space-y-6 relative z-10"> <h2 class="text-lg font-bold font-display text-white">Sign the guestbook</h2> <div class="grid grid-cols-1 gap-4"> <div class="space-y-2"> <label for="name" class="text-xs font-semibold uppercase tracking-wider text-gray-400">Name</label> <input type="text" id="name" name="name" required placeholder="Your nickname" class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all duration-200"> </div> <div class="space-y-2"> <label for="message" class="text-xs font-semibold uppercase tracking-wider text-gray-400">Message</label> <textarea id="message" name="message" required rows="4" placeholder="Write your hello here..." class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all duration-200 resize-none"></textarea> </div> </div> <button type="submit" class="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold text-sm shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
Publish Message
</button> </form> </section> <!-- Entries List --> <section class="space-y-6"> <h2 class="text-sm font-semibold tracking-wider text-gray-500 uppercase font-display border-b border-white/5 pb-2">Messages (${entries.length})</h2> ${entries.length === 0 ? renderTemplate`<div class="glass-panel rounded-2xl p-12 text-center text-gray-500">
Be the first one to sign the guestbook!
</div>` : renderTemplate`<div class="space-y-4"> ${entries.map((entry) => {
    const entryDate = new Intl.DateTimeFormat("ko-KR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(entry.createdAt);
    return renderTemplate`<article class="glass-panel rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-start justify-between gap-4"> <div class="space-y-2 flex-grow"> <p class="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">${entry.message}</p> <div class="flex items-center space-x-2"> <span class="text-white font-bold text-xs">${entry.name}</span> <span class="text-gray-600 text-[10px]">&bull;</span> <time class="text-gray-500 text-[10px]"${addAttribute(entry.createdAt.toISOString(), "datetime")}>${entryDate}</time> </div> </div> </article>`;
  })} </div>`} </section> </div> ` })}`;
}, "C:/bong/git/netlify-blog/src/pages/guestbook.astro", void 0);

const $$file = "C:/bong/git/netlify-blog/src/pages/guestbook.astro";
const $$url = "/guestbook";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Guestbook,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
