import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DphMVhZR.mjs';
import { $ as $$ProductCard } from '../chunks/ProductCard_Bzh-yx9c.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import React from 'react';
import { c as createTranslator, $ as $$Layout } from '../chunks/Layout_CX9V-NAS.mjs';
import { l as listProducts } from '../chunks/cart_ChTR_Zc6.mjs';
export { renderers } from '../renderers.mjs';

function ProductFilters({
  initialFilters,
  categories,
  notes,
  seasons,
  totalCount,
  texts,
  onFiltersChange
}) {
  const [filters, setFilters] = React.useState(initialFilters);
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateURL(newFilters);
    onFiltersChange(newFilters);
  };
  const updateURL = (filters2) => {
    const url = new URL(window.location.href);
    Object.entries(filters2).forEach(([key, value]) => {
      if (value && value !== false) {
        url.searchParams.set(key, value.toString());
      } else {
        url.searchParams.delete(key);
      }
    });
    window.location.href = url.toString();
  };
  const clearFilters = () => {
    const cleared = {
      category: "",
      priceRange: "",
      featuredOnly: false,
      notes: "",
      season: ""
    };
    setFilters(cleared);
    updateURL(cleared);
    onFiltersChange(cleared);
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-3xl p-6 shadow-sm", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-[var(--color-secondary)] mb-4", children: "Filters" }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-[var(--color-secondary)] mb-2", children: texts.categoryLabel }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: filters.category,
          onChange: (e) => handleFilterChange("category", e.target.value),
          className: "w-full px-3 py-2 rounded-xl border border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)] focus:border-[var(--color-primary)] focus:outline-none text-sm",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: texts.categoryAll }),
            categories.map((cat) => /* @__PURE__ */ jsx("option", { value: cat, children: cat }, cat))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-[var(--color-secondary)] mb-2", children: texts.priceTitle }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: filters.priceRange,
          onChange: (e) => handleFilterChange("priceRange", e.target.value),
          className: "w-full px-3 py-2 rounded-xl border border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)] focus:border-[var(--color-primary)] focus:outline-none text-sm",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "All prices" }),
            /* @__PURE__ */ jsx("option", { value: "0-50", children: "Under €50" }),
            /* @__PURE__ */ jsx("option", { value: "50-100", children: "€50 - €100" }),
            /* @__PURE__ */ jsx("option", { value: "100-200", children: "€100 - €200" }),
            /* @__PURE__ */ jsx("option", { value: "200+", children: "Over €200" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-[var(--color-secondary)] mb-2", children: texts.notesLabel }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: filters.notes,
          onChange: (e) => handleFilterChange("notes", e.target.value),
          className: "w-full px-3 py-2 rounded-xl border border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)] focus:border-[var(--color-primary)] focus:outline-none text-sm",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: texts.notesAll }),
            notes.map((note) => /* @__PURE__ */ jsx("option", { value: note, children: note }, note))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-[var(--color-secondary)] mb-2", children: texts.seasonLabel }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: filters.season,
          onChange: (e) => handleFilterChange("season", e.target.value),
          className: "w-full px-3 py-2 rounded-xl border border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)] focus:border-[var(--color-primary)] focus:outline-none text-sm",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: texts.seasonAll }),
            seasons.map((season) => /* @__PURE__ */ jsx("option", { value: season, children: season }, season))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: filters.featuredOnly,
          onChange: (e) => handleFilterChange("featuredOnly", e.target.checked),
          className: "w-4 h-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)] rounded"
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-[var(--color-secondary)]", children: texts.featuredOnly })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-[var(--color-secondary)]/70", children: texts.countLabel.replace("{{count}}", totalCount.toString()) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: clearFilters,
        className: "w-full px-4 py-2 bg-gray-100 text-[var(--color-secondary)] rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium mb-2",
        children: texts.clear
      }
    )
  ] });
}

const $$Astro = createAstro("http://localhost:4321");
const prerender = false;
const $$Products = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Products;
  const locale = Astro2.locals.locale ?? "en";
  const t = createTranslator(locale);
  const allProducts = await listProducts();
  const url = new URL(Astro2.request.url);
  const category = url.searchParams.get("category") || "";
  const priceRange = url.searchParams.get("priceRange") || "";
  const featuredOnly = url.searchParams.get("featuredOnly") === "true";
  const notes = url.searchParams.get("notes") || "";
  const season = url.searchParams.get("season") || "";
  let products = allProducts.filter((product) => {
    if (category && product.category !== category) return false;
    if (featuredOnly && !product.isFeatured) return false;
    if (priceRange) {
      const price = Number(product.price ?? 0);
      switch (priceRange) {
        case "0-50":
          if (price >= 50) return false;
          break;
        case "50-100":
          if (price < 50 || price >= 100) return false;
          break;
        case "100-200":
          if (price < 100 || price >= 200) return false;
          break;
        case "200+":
          if (price < 200) return false;
          break;
      }
    }
    if (notes) {
      const productNotes = product.attributes?.notes || [];
      if (!productNotes.includes(notes)) return false;
    }
    if (season) {
      const productSeasons = product.attributes?.seasons || [];
      if (!productSeasons.includes(season)) return false;
    }
    return true;
  });
  const categories = [...new Set(allProducts.map((p) => p.category).filter(Boolean))].sort();
  const notesList = [...new Set(allProducts.flatMap((p) => p.attributes?.notes || []).filter(Boolean))].sort();
  const seasonsList = [...new Set(allProducts.flatMap((p) => p.attributes?.seasons || []).filter(Boolean))].sort();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("navigation.collection"),
    description: t("hero.subheading"),
    url: new URL(Astro2.url.pathname, Astro2.url.origin).toString()
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${t("navigation.collection")} \u2013 PerfumeStore`, "description": t("hero.subheading"), "structuredData": structuredData }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="py-20 px-6"> <div class="max-w-7xl mx-auto"> <div class="text-center mb-16"> <h1 class="text-4xl md:text-5xl font-bold text-[#2B2B2B] mb-4 font-serif"> ${t("navigation.collection")} </h1> <p class="text-xl text-[#2B2B2B]/70 max-w-2xl mx-auto"> ${t("hero.subheading")} </p> </div> <!-- Mobile Filter Button --> <div class="flex justify-between items-center mb-6 lg:hidden"> <h2 class="text-lg font-semibold text-[#2B2B2B]"> ${products.length} ${t("navigation.collection").toLowerCase()} </h2> <button type="button" class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)] rounded-xl text-sm font-medium text-[var(--color-secondary)] hover:bg-gray-50 transition" data-mobile-filters-toggle> <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none"> <path d="M3 6h18M6 12h12M9 18h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> </svg>
Filters
</button> </div> <div class="grid lg:grid-cols-4 gap-8"> <!-- Filters Sidebar --> <div class="lg:col-span-1 hidden lg:block"> <div class="sticky top-6"> ${renderComponent($$result2, "ProductFilters", ProductFilters, { "client:idle": true, "initialFilters": { category, priceRange, featuredOnly, notes, season }, "categories": categories, "notes": notesList, "seasons": seasonsList, "totalCount": products.length, "texts": {
    categoryLabel: "Category",
    categoryAll: "All Categories",
    priceTitle: "Price Range",
    priceLabel: "Price",
    featuredOnly: "Featured Only",
    notesLabel: "Fragrance Notes",
    notesAll: "All Notes",
    seasonLabel: "Season",
    seasonAll: "All Seasons",
    clear: "Clear Filters",
    countLabel: "Showing {{count}} products"
  }, "onFiltersChange": ((filters) => {
    console.log("Filters changed:", filters);
  }), "client:component-hydration": "idle", "client:component-path": "/Users/darah.k/Downloads/projectsDubai/perfumestore/src/components/storefront/ProductFilters", "client:component-export": "ProductFilters" })} </div> </div> <!-- Products Grid --> <div class="lg:col-span-3"> <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"> ${products.map((product) => renderTemplate`${renderComponent($$result2, "ProductCard", $$ProductCard, { "product": product, "t": t, "locale": locale })}`)} </div> ${products.length === 0 && renderTemplate`<div class="text-center py-20"> <p class="text-lg text-[#2B2B2B]/70">No products found matching your filters.</p> </div>`} </div> </div> </div> </section> ` })}`;
}, "/Users/darah.k/Downloads/projectsDubai/perfumestore/src/pages/products.astro", void 0);

const $$file = "/Users/darah.k/Downloads/projectsDubai/perfumestore/src/pages/products.astro";
const $$url = "/products";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Products,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
