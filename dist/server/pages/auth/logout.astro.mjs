import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, h as addAttribute, m as maybeRenderHead } from '../../chunks/astro/server_DphMVhZR.mjs';
import { c as createTranslator, $ as $$Layout } from '../../chunks/Layout_CX9V-NAS.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("http://localhost:4321");
const $$Logout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Logout;
  const locale = Astro2.locals.locale ?? "en";
  const t = createTranslator(locale);
  const redirectTo = Astro2.url.searchParams.get("redirectTo") ?? "/";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": t("meta.loginTitle"), "description": t("meta.loginTitle") }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([" ", '<section class="flex flex-col items-center justify-center gap-4 py-20 text-center"', '> <p class="text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]"> ', ` </p> <script>
      const section = document.querySelector('section[data-redirect-to]');
      const redirectTarget = section?.dataset.redirectTo || '/';
      fetch("/api/auth/sign-out", {
        method: "POST",
        headers: { "content-type": "application/json" },
      })
        .catch(() => {})
        .finally(() => {
          window.location.href = redirectTarget;
        });
    <\/script> </section> `])), maybeRenderHead(), addAttribute(redirectTo, "data-redirect-to"), t("auth.subtitle")) })}`;
}, "/Users/darah.k/Downloads/projectsDubai/perfumestore/src/pages/auth/logout.astro", void 0);

const $$file = "/Users/darah.k/Downloads/projectsDubai/perfumestore/src/pages/auth/logout.astro";
const $$url = "/auth/logout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Logout,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
