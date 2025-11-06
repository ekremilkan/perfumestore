import { e as createAstro, f as createComponent, m as maybeRenderHead, l as renderSlot, h as addAttribute, r as renderTemplate } from './astro/server_DphMVhZR.mjs';
import 'clsx';

const $$Astro = createAstro("http://localhost:4321");
const $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { t, active, user } = Astro2.props;
  const navItems = [
    { key: "dashboard", href: "/admin", label: t("admin.nav.dashboard") },
    { key: "products", href: "/admin/products", label: t("admin.nav.products") },
    { key: "orders", href: "/admin/orders", label: t("admin.nav.orders") }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="space-y-10 py-10"> <header class="space-y-2"> <p class="text-xs uppercase tracking-[0.4em] text-[color-mix(in srgb,var(--color-secondary) 60%,white 40%)]"> ${user?.email} </p> <h1 class="font-heading text-3xl font-semibold text-[var(--color-secondary)]"> ${t("admin.title")} </h1> <p class="text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]"> ${t("admin.subtitle")} </p> </header> <nav class="flex flex-wrap gap-3"> ${navItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(`rounded-full border px-4 py-2 text-sm font-semibold transition ${active === item.key ? "border-[var(--color-secondary)] bg-[var(--color-secondary)] text-white" : "border-[color-mix(in srgb,var(--color-secondary) 20%,transparent 80%)] text-[var(--color-secondary)] hover:border-[var(--color-secondary)]"}`, "class")}> ${item.label} </a>`)} </nav> <div class="space-y-8"> ${renderSlot($$result, $$slots["default"])} </div> </section>`;
}, "/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/components/admin/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
