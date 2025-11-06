import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DphMVhZR.mjs';
import { $ as $$AdminLayout } from '../chunks/AdminLayout_-m8ErelV.mjs';
import { c as createTranslator, $ as $$Layout } from '../chunks/Layout_CW4dC78d.mjs';
import { p as prisma } from '../chunks/prisma_BXVFITCM.mjs';
import { g as getTenantId } from '../chunks/business_eBF7zugw.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("http://localhost:4321");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const locale = Astro2.locals.locale ?? "en";
  const t = createTranslator(locale);
  const tenantId = await getTenantId();
  const [productCount, orderAggregate, customerGroups] = await Promise.all([
    prisma.product.count({ where: { tenant_id: tenantId } }),
    prisma.order.aggregate({
      where: { tenant_id: tenantId },
      _sum: { total: true },
      _count: true
    }),
    prisma.order.groupBy({
      by: ["userId"],
      where: { tenant_id: tenantId }
    })
  ]);
  const totalRevenue = Number(orderAggregate._sum.total ?? 0);
  const totalOrders = orderAggregate._count ?? 0;
  const totalCustomers = customerGroups.length;
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR"
  });
  const metrics = [
    {
      key: "revenue",
      label: t("admin.dashboard.metrics.revenue"),
      value: formatter.format(totalRevenue)
    },
    {
      key: "orders",
      label: t("admin.dashboard.metrics.orders"),
      value: totalOrders.toString()
    },
    {
      key: "customers",
      label: t("admin.dashboard.metrics.customers"),
      value: totalCustomers.toString()
    },
    {
      key: "inventory",
      label: t("admin.dashboard.metrics.inventory"),
      value: productCount.toString()
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": t("meta.adminTitle"), "description": t("meta.adminDescription") }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "AdminLayout", $$AdminLayout, { "t": t, "active": "dashboard", "user": Astro2.locals.user ?? null }, { "default": async ($$result3) => renderTemplate`  ${maybeRenderHead()}<div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--color-primary)] via-[color-mix(in srgb,var(--color-primary) 80%,var(--color-secondary) 20%)] to-[var(--color-secondary)] p-8 text-white mb-8"> <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)] opacity-50"></div> <div class="relative z-10"> <h1 class="font-heading text-3xl font-semibold mb-2" style="text-shadow: 0 0 20px rgba(255,255,255,0.3);"> ${t("admin.title")} </h1> <p class="text-lg opacity-90"> ${t("admin.subtitle")} </p> </div> <!-- Floating perfume icons --> <div class="absolute top-4 right-4 opacity-20"> <div class="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center animate-soft-float"> <span class="text-2xl">🌸</span> </div> </div> <div class="absolute bottom-4 left-4 opacity-20"> <div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center animate-soft-float" style="animation-delay: 1s;"> <span class="text-xl">🕯️</span> </div> </div> </div>  <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4"> ${metrics.map((metric, index) => renderTemplate`<div class="premium-metric-card group relative overflow-hidden rounded-3xl border border-[color-mix(in srgb,var(--color-primary) 20%,transparent 80%)] bg-gradient-to-br from-white via-[color-mix(in srgb,var(--color-surface) 95%,white 5%)] to-[color-mix(in srgb,var(--color-surface) 90%,var(--color-primary) 10%)] p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl" style="box-shadow: 0 0 20px color-mix(in srgb, var(--color-primary) 15%, transparent 85%); animation-delay: \${index * 0.1}s;"> <div class="absolute inset-0 bg-gradient-to-br from-[color-mix(in srgb,var(--color-primary) 5%,transparent 95%)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> <div class="relative z-10"> <div class="flex items-center justify-between mb-4"> <div class="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center"> <span class="text-white text-sm font-bold"> ${metric.key === "revenue" ? "\u20AC" : metric.key === "orders" ? "\u{1F4E6}" : metric.key === "customers" ? "\u{1F465}" : "\u{1F9F4}"} </span> </div> <div class="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse"></div> </div> <p class="text-xs uppercase tracking-[0.35em] text-[color-mix(in srgb,var(--color-secondary) 60%,white 40%)] mb-2"> ${metric.label} </p> <p class="font-heading text-3xl text-[var(--color-secondary)] font-semibold"> ${metric.value} </p> <div class="mt-4 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[color-mix(in srgb,var(--color-primary) 50%,transparent 50%)] rounded-full"></div> </div> </div>`)} </div>  <div class="mt-8 grid gap-6 md:grid-cols-2"> <div class="premium-section-card rounded-3xl border border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)] bg-gradient-to-br from-[color-mix(in srgb,var(--color-surface) 98%,white 2%)] to-[color-mix(in srgb,var(--color-surface) 95%,var(--color-primary) 5%)] p-6" style="box-shadow: 0 0 15px color-mix(in srgb, var(--color-primary) 10%, transparent 90%);"> <h3 class="font-heading text-xl font-semibold text-[var(--color-secondary)] mb-4">Recent Activity</h3> <div class="space-y-3"> <div class="flex items-center gap-3 p-3 rounded-xl bg-white/50"> <div class="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center"> <span class="text-white text-xs">🛒</span> </div> <div> <p class="text-sm font-medium text-[var(--color-secondary)]">New order received</p> <p class="text-xs text-[color-mix(in srgb,var(--color-secondary) 60%,white 40%)]">2 minutes ago</p> </div> </div> <div class="flex items-center gap-3 p-3 rounded-xl bg-white/50"> <div class="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center"> <span class="text-white text-xs">➕</span> </div> <div> <p class="text-sm font-medium text-[var(--color-secondary)]">New perfume added</p> <p class="text-xs text-[color-mix(in srgb,var(--color-secondary) 60%,white 40%)]">1 hour ago</p> </div> </div> </div> </div> <div class="premium-section-card rounded-3xl border border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)] bg-gradient-to-br from-[color-mix(in srgb,var(--color-surface) 98%,white 2%)] to-[color-mix(in srgb,var(--color-surface) 95%,var(--color-primary) 5%)] p-6" style="box-shadow: 0 0 15px color-mix(in srgb, var(--color-primary) 10%, transparent 90%);"> <h3 class="font-heading text-xl font-semibold text-[var(--color-secondary)] mb-4">Quick Actions</h3> <div class="grid grid-cols-2 gap-3"> <a href="/admin/products" class="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[color-mix(in srgb,var(--color-primary) 80%,var(--color-secondary) 20%)] text-white transition hover:scale-105 hover:shadow-lg"> <span class="text-2xl">🧴</span> <span class="text-sm font-medium">Add Scent</span> </a> <a href="/admin/orders" class="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-[var(--color-secondary)] to-[color-mix(in srgb,var(--color-secondary) 80%,white 20%)] text-white transition hover:scale-105 hover:shadow-lg"> <span class="text-2xl">📋</span> <span class="text-sm font-medium">View Orders</span> </a> </div> </div> </div> ` })} ` })}`;
}, "/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/pages/admin/index.astro", void 0);

const $$file = "/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
