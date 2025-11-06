import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_DphMVhZR.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { A as AddToCartButton, $ as $$ProductCard } from '../../chunks/ProductCard_VQUZtOac.mjs';
import { c as createTranslator, $ as $$Layout } from '../../chunks/Layout_CW4dC78d.mjs';
import { g as getTenantId, a as getBusinessConfig } from '../../chunks/business_eBF7zugw.mjs';
import { b as getProductBySlug, c as getRelatedProducts } from '../../chunks/cart_ChTR_Zc6.mjs';
export { renderers } from '../../renderers.mjs';

function ProductActions({ productId, isOutOfStock, labels, outOfStockMessage }) {
  const [quantity, setQuantity] = useState(1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  if (isOutOfStock) {
    return /* @__PURE__ */ jsx("p", { className: "text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]", children: outOfStockMessage });
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-[var(--color-surface)] rounded-full border border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)]", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: decreaseQuantity,
          className: "w-10 h-10 flex items-center justify-center text-[var(--color-secondary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] rounded-full transition-colors",
          "aria-label": "Decrease quantity",
          children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M20 12H4" }) })
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "w-12 text-center text-sm font-semibold text-[var(--color-secondary)]", children: quantity }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: increaseQuantity,
          className: "w-10 h-10 flex items-center justify-center text-[var(--color-secondary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] rounded-full transition-colors",
          "aria-label": "Increase quantity",
          children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 6v6m0 0v6m0-6h6m-6 0H6" }) })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      AddToCartButton,
      {
        productId,
        quantity,
        labels,
        className: "button-premium inline-flex w-full items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-secondary)] md:w-auto"
      }
    )
  ] });
}

const $$Astro = createAstro("http://localhost:4321");
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  if (!slug) {
    return Astro2.redirect("/");
  }
  const locale = Astro2.locals.locale ?? "en";
  const t = createTranslator(locale);
  const product = await getProductBySlug(slug);
  if (!product) {
    return new Response(null, { status: 404 });
  }
  const related = await getRelatedProducts(product.id, 3);
  const price = Number(product.price ?? 0);
  const priceFormatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR"
  });
  const tenantId = await getTenantId();
  const business = await getBusinessConfig();
  const title = t("meta.productTitle", { name: product.name });
  const description = product.description ? product.description : t("meta.productDescription", { name: product.name });
  const attributes = product.attributes ?? {};
  function toStringArray(value) {
    if (!Array.isArray(value)) return null;
    const items = value.filter(
      (entry) => typeof entry === "string"
    );
    return items.length ? items : null;
  }
  const notesRaw = typeof attributes.notes === "object" && attributes.notes !== null ? attributes.notes : null;
  const topNotes = toStringArray(notesRaw?.top) ?? [];
  const heartNotes = toStringArray(notesRaw?.heart) ?? [];
  const baseNotes = toStringArray(notesRaw?.base) ?? [];
  const accords = toStringArray(attributes.accords) ?? [];
  const longevityHours = typeof attributes.longevityHours === "number" ? attributes.longevityHours : typeof attributes.longevity === "number" ? attributes.longevity : null;
  const bottleSize = typeof attributes.volume === "string" ? attributes.volume : t("product.volumeDefault");
  const longevityCopy = longevityHours ? t("product.longevityHours", { hours: longevityHours }) : t("product.longevityDefault");
  const stockCount = typeof product.stock === "number" ? product.stock : 0;
  const isOutOfStock = stockCount <= 0;
  const stockLabel = isOutOfStock ? t("products.outOfStock") : stockCount <= 5 ? t("product.stock.limited", { count: stockCount }) : t("product.stock.available");
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image ?? business.assets.fallbackHeroImage ?? void 0,
    description,
    sku: product.slug ?? void 0,
    brand: {
      "@type": "Brand",
      name: business.name
    },
    offers: {
      "@type": "Offer",
      url: new URL(Astro2.url.pathname, Astro2.url.origin).toString(),
      price: Number(product.price ?? 0),
      priceCurrency: "EUR",
      availability: isOutOfStock ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition"
    }
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description, "image": product.image ?? business.assets.fallbackHeroImage ?? null, "structuredData": structuredData, "ogType": "product" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="space-y-16 py-12"> <a href="/" class="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-secondary)] transition hover:text-[var(--color-primary)]"> <span aria-hidden="true">←</span> ${t("product.backLink")} </a> <div class="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_0.95fr]"> <div class="space-y-6 lg:space-y-8"> <div class="surface-shimmer relative overflow-hidden rounded-[2.5rem] bg-[var(--color-surface)] shadow-2xl"> ${product.image ? renderTemplate`<img${addAttribute(product.image, "src")}${addAttribute(product.name, "alt")} class="h-full w-full object-cover" loading="lazy">` : renderTemplate`<div class="flex h-96 w-full items-center justify-center text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]"> ${t("product.descriptionHeading")} </div>`} <div class="pointer-events-none absolute inset-x-6 top-6 flex items-center justify-between rounded-full bg-white/60 px-5 py-2 text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)] backdrop-blur"> <span>${tenantId}</span> ${product.category && renderTemplate`<span>${product.category}</span>`} </div> </div> </div> <div class="space-y-10"> <header class="space-y-6"> <div class="inline-flex items-center gap-3 rounded-full bg-[color-mix(in srgb,var(--color-primary) 18%,transparent 82%)] px-5 py-2 text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)]"> <span>${t("product.tenant")}</span> <span class="tracking-normal">${business.name}</span> </div> <div class="space-y-4"> <h1 class="font-heading text-4xl font-semibold text-[var(--color-secondary)] md:text-5xl"> ${product.name} </h1> <p class="text-base leading-relaxed text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)] md:text-lg"> ${description} </p> </div> </header> <section class="space-y-8"> <div class="flex flex-wrap items-center justify-between gap-4"> <div> <span class="block text-xs uppercase tracking-[0.2em] text-[color-mix(in srgb,var(--color-secondary) 65%,white 35%)]"> ${t("products.priceLabel")} </span> <p class="text-3xl font-semibold text-[var(--color-secondary)]"> ${priceFormatter.format(price)} </p> </div> <span class="rounded-full border border-[color-mix(in srgb,var(--color-primary) 22%,transparent 78%)] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-secondary)]"> ${stockLabel} </span> </div> <div class="flex flex-col gap-4 md:flex-row md:items-center"> ${renderComponent($$result2, "ProductActions", ProductActions, { "client:idle": true, "productId": product.id, "isOutOfStock": isOutOfStock, "labels": {
    idle: t("products.addToCart"),
    loading: t("products.adding"),
    success: t("products.added"),
    error: t("notifications.cartError")
  }, "outOfStockMessage": t("product.outOfStockMessage"), "client:component-hydration": "idle", "client:component-path": "/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/components/storefront/ProductActions", "client:component-export": "ProductActions" })} </div> <p class="text-xs uppercase tracking-[0.15em] text-[color-mix(in srgb,var(--color-secondary) 60%,white 40%)]"> ${t("product.deliveryCopy")} </p> <div class="grid gap-4 md:grid-cols-2"> <div> <span class="block text-xs uppercase tracking-[0.15em] text-[color-mix(in srgb,var(--color-secondary) 60%,white 40%)]"> ${t("product.volume")} </span> <p class="mt-2 text-sm text-[var(--color-secondary)]"> ${bottleSize} </p> </div> <div> <span class="block text-xs uppercase tracking-[0.15em] text-[color-mix(in srgb,var(--color-secondary) 60%,white 40%)]"> ${t("product.longevity")} </span> <p class="mt-2 text-sm text-[var(--color-secondary)]"> ${longevityCopy} </p> </div> </div> <div class="border-t border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)] pt-8"> <div class="space-y-2"> <h2 class="font-heading text-2xl font-semibold text-[var(--color-secondary)]"> ${t("product.notesHeading")} </h2> <p class="text-sm leading-relaxed text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]"> ${t("product.notesDescription")} </p> </div> <div class="grid gap-6 md:grid-cols-3 mt-6"> <div class="space-y-3"> <span class="text-xs uppercase tracking-[0.2em] text-[color-mix(in srgb,var(--color-secondary) 60%,white 40%)]"> ${t("product.topNotes")} </span> <p class="text-sm text-[var(--color-secondary)]"> ${(topNotes.length ? topNotes : [t("product.notesFallback")]).join(" \u2022 ")} </p> </div> <div class="space-y-3"> <span class="text-xs uppercase tracking-[0.2em] text-[color-mix(in srgb,var(--color-secondary) 60%,white 40%)]"> ${t("product.heartNotes")} </span> <p class="text-sm text-[var(--color-secondary)]"> ${(heartNotes.length ? heartNotes : [t("product.notesFallback")]).join(" \u2022 ")} </p> </div> <div class="space-y-3"> <span class="text-xs uppercase tracking-[0.2em] text-[color-mix(in srgb,var(--color-secondary) 60%,white 40%)]"> ${t("product.baseNotes")} </span> <p class="text-sm text-[var(--color-secondary)]"> ${(baseNotes.length ? baseNotes : [t("product.notesFallback")]).join(" \u2022 ")} </p> </div> </div> ${accords.length > 0 && renderTemplate`<div class="space-y-3 mt-6"> <span class="text-xs uppercase tracking-[0.2em] text-[color-mix(in srgb,var(--color-secondary) 60%,white 40%)]"> ${t("product.accordsHeading")} </span> <div class="flex flex-wrap gap-2"> ${accords.map((accord) => renderTemplate`<span class="rounded-full border border-[color-mix(in srgb,var(--color-primary) 20%,transparent 80%)] bg-white/70 px-4 py-1 text-xs uppercase tracking-[0.15em] text-[var(--color-secondary)]"> ${accord} </span>`)} </div> </div>`} </div> </section> </div> </div> ${related.length > 0 && renderTemplate`<section class="space-y-6"> <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"> <div> <h2 class="font-heading text-2xl font-semibold text-[var(--color-secondary)] md:text-3xl"> ${t("product.relatedHeading")} </h2> <p class="text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]"> ${t("product.relatedDescription")} </p> </div> <a href="/#collection" class="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[var(--color-secondary)] transition hover:text-[var(--color-primary)]"> <span aria-hidden="true">↺</span> ${t("product.backToCollection")} </a> </div> <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"> ${related.map((item) => renderTemplate`${renderComponent($$result2, "ProductCard", $$ProductCard, { "product": item, "t": t, "locale": locale })}`)} </div> </section>`} </article> ` })}`;
}, "/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/pages/product/[slug].astro", void 0);

const $$file = "/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/pages/product/[slug].astro";
const $$url = "/product/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
