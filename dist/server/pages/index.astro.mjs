import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DphMVhZR.mjs';
import { $ as $$ProductCard } from '../chunks/ProductCard_VQUZtOac.mjs';
import { c as createTranslator, $ as $$Layout } from '../chunks/Layout_CW4dC78d.mjs';
import { a as getBusinessConfig } from '../chunks/business_eBF7zugw.mjs';
import { createApi } from 'unsplash-js';
import { env } from 'node:process';
import { l as listProducts } from '../chunks/cart_ChTR_Zc6.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const accessKey = env.UNSPLASH_ACCESS_KEY;
const unsplashClient = accessKey ? createApi({ accessKey }) : null;
async function getUnsplashImage(query) {
  if (!unsplashClient) {
    return null;
  }
  try {
    const response = await unsplashClient.search.getPhotos({
      query,
      perPage: 1,
      orientation: "landscape"
    });
    if (response.response?.results?.length) {
      const image = response.response.results[0];
      return {
        url: image.urls?.regular ?? null,
        alt: image.alt_description ?? image.description ?? query
      };
    }
  } catch (error) {
    console.error("[unsplash] Failed to fetch image", error);
  }
  return null;
}

const $$Astro = createAstro("http://localhost:4321");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const locale = Astro2.locals.locale ?? "en";
  const t = createTranslator(locale);
  const products = await listProducts();
  const business = await getBusinessConfig();
  const user = Astro2.locals.user ?? null;
  user?.role === "ADMIN";
  const heroImage = await getUnsplashImage("gentleman perfume") ?? (business.assets.fallbackHeroImage ? { url: business.assets.fallbackHeroImage, alt: business.name } : null);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: business.name,
    url: business.domain ?? Astro2.url.origin,
    image: heroImage?.url ?? null,
    description: "Discover signature fragrances crafted to capture your individuality.",
    sameAs: business.domain ? [business.domain] : [],
    makesOffer: products.slice(0, 12).map((product) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: product.name,
        description: product.description ?? void 0,
        image: product.image ?? void 0,
        sku: product.slug ?? void 0
      },
      price: Number(product.price ?? 0),
      priceCurrency: "EUR",
      availability: product.stock && product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }))
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "PerfumeStore \u2013 Artisanal Fragrance House", "description": "Discover signature fragrances crafted to capture your individuality.", "structuredData": structuredData, "image": heroImage?.url ?? null, "overlayHeader": true, "mainFullBleed": true, "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-6" data-astro-cid-j7pv25f6> <!-- Video Background --> <video class="absolute inset-0 w-full h-full object-cover" autoplay muted loop playsinline data-astro-cid-j7pv25f6> <source src="/videos/hero-video.mp4" type="video/mp4" data-astro-cid-j7pv25f6> <!-- Fallback image --> <div class="absolute inset-0 bg-cover bg-center" style="background-image: url(\${heroImage?.url ?? '/background.svg'}); background-color: #F6F2E9;" data-astro-cid-j7pv25f6></div> </video> <!-- Overlay --> <div class="absolute inset-0 bg-black/40" data-astro-cid-j7pv25f6></div> <!-- Content --> <div class="relative z-10 text-center w-full" data-astro-cid-j7pv25f6> <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 font-serif" data-astro-cid-j7pv25f6> ${t("hero.heading")} </h1> <p class="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed" data-astro-cid-j7pv25f6> ${t("hero.subheading")} </p> <a href="#bestsellers" class="inline-block px-8 py-4 bg-[#B68D40] text-[#2B2B2B] text-lg font-semibold rounded-full hover:bg-[#B68D40]/90 transition-colors duration-300 shadow-lg" data-astro-cid-j7pv25f6> ${t("hero.primaryCta")} </a> </div> <!-- Scroll indicator --> <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" data-astro-cid-j7pv25f6> <div class="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center" data-astro-cid-j7pv25f6> <div class="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" data-astro-cid-j7pv25f6></div> </div> </div> </section>  <section id="bestsellers" class="py-20 px-6 bg-[#F6F2E9]" data-astro-cid-j7pv25f6> <div class="max-w-7xl mx-auto" data-astro-cid-j7pv25f6> <div class="text-center mb-16" data-astro-cid-j7pv25f6> <h2 class="text-4xl md:text-5xl font-bold text-[#2B2B2B] mb-4 font-serif" data-astro-cid-j7pv25f6> ${t("navigation.secondary.bestSellers")} </h2> <div class="w-24 h-1 bg-[#B68D40] mx-auto rounded-full" data-astro-cid-j7pv25f6></div> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-astro-cid-j7pv25f6> ${products.slice(0, 4).map((product, index) => renderTemplate`${renderComponent($$result2, "ProductCard", $$ProductCard, { "product": product, "t": t, "locale": locale, "data-astro-cid-j7pv25f6": true })}`)} </div> <div class="text-center mt-12" data-astro-cid-j7pv25f6> <a href="/products" class="inline-block px-8 py-4 bg-[#3A4B2E] text-white text-lg font-semibold rounded-full hover:bg-[#3A4B2E]/90 transition-colors" data-astro-cid-j7pv25f6> ${t("products.viewDetails")} </a> </div> </div> </section>  <section id="women" class="py-20 px-6 bg-[#F6F2E9]" data-astro-cid-j7pv25f6> <div class="max-w-7xl mx-auto" data-astro-cid-j7pv25f6> <div class="text-center mb-16" data-astro-cid-j7pv25f6> <h2 class="text-4xl md:text-5xl font-bold text-[#2B2B2B] mb-4 font-serif" data-astro-cid-j7pv25f6> ${t("navigation.primary.women")} </h2> <p class="text-xl text-[#2B2B2B]/70 max-w-2xl mx-auto" data-astro-cid-j7pv25f6> ${t("hero.subheading")} </p> </div> <div class="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4" data-astro-cid-j7pv25f6> ${products.filter((p) => p.category === "Women").map((product) => renderTemplate`<div class="flex-shrink-0 w-80 snap-start" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "ProductCard", $$ProductCard, { "product": product, "t": t, "locale": locale, "data-astro-cid-j7pv25f6": true })} </div>`)} </div> </div> </section>  <section id="men" class="py-20 px-6 bg-white" data-astro-cid-j7pv25f6> <div class="max-w-7xl mx-auto" data-astro-cid-j7pv25f6> <div class="text-center mb-16" data-astro-cid-j7pv25f6> <h2 class="text-4xl md:text-5xl font-bold text-[#2B2B2B] mb-4 font-serif" data-astro-cid-j7pv25f6> ${t("navigation.primary.men")} </h2> <p class="text-xl text-[#2B2B2B]/70 max-w-2xl mx-auto" data-astro-cid-j7pv25f6> ${t("hero.subheading")} </p> </div> <div class="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4" data-astro-cid-j7pv25f6> ${products.filter((p) => p.category === "Men").map((product) => renderTemplate`<div class="flex-shrink-0 w-80 snap-start" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "ProductCard", $$ProductCard, { "product": product, "t": t, "locale": locale, "data-astro-cid-j7pv25f6": true })} </div>`)} </div> </div> </section>  <section id="exclusive" class="py-20 px-6 bg-[#F6F2E9]" data-astro-cid-j7pv25f6> <div class="max-w-7xl mx-auto" data-astro-cid-j7pv25f6> <div class="text-center mb-16" data-astro-cid-j7pv25f6> <h2 class="text-4xl md:text-5xl font-bold text-[#2B2B2B] mb-4 font-serif" data-astro-cid-j7pv25f6> ${t("navigation.primary.exclusiveCollection")} </h2> <p class="text-xl text-[#2B2B2B]/70 max-w-2xl mx-auto" data-astro-cid-j7pv25f6> ${t("hero.subheading")} </p> </div> <div class="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4" data-astro-cid-j7pv25f6> ${products.filter((p) => p.category === "Exclusive Collection").map((product) => renderTemplate`<div class="flex-shrink-0 w-80 snap-start" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "ProductCard", $$ProductCard, { "product": product, "t": t, "locale": locale, "data-astro-cid-j7pv25f6": true })} </div>`)} </div> </div> </section>  <section id="gifts" class="py-20 px-6 bg-white" data-astro-cid-j7pv25f6> <div class="max-w-7xl mx-auto" data-astro-cid-j7pv25f6> <div class="text-center mb-16" data-astro-cid-j7pv25f6> <h2 class="text-4xl md:text-5xl font-bold text-[#2B2B2B] mb-4 font-serif" data-astro-cid-j7pv25f6> ${t("navigation.primary.giftSets")} </h2> <p class="text-xl text-[#2B2B2B]/70 max-w-2xl mx-auto" data-astro-cid-j7pv25f6> ${t("hero.subheading")} </p> </div> <div class="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4" data-astro-cid-j7pv25f6> ${products.filter((p) => p.category === "Gift Sets").map((product) => renderTemplate`<div class="flex-shrink-0 w-80 snap-start" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "ProductCard", $$ProductCard, { "product": product, "t": t, "locale": locale, "data-astro-cid-j7pv25f6": true })} </div>`)} </div> </div> </section>  <section class="py-20 px-6 bg-[#F6F2E9]" data-astro-cid-j7pv25f6> <div class="max-w-4xl mx-auto text-center" data-astro-cid-j7pv25f6> <h2 class="text-4xl md:text-5xl font-bold text-[#2B2B2B] mb-8 font-serif" data-astro-cid-j7pv25f6> ${t("hero.heading")} </h2> <p class="text-xl text-[#2B2B2B]/70 leading-relaxed mb-12" data-astro-cid-j7pv25f6> ${t("hero.subheading")} </p> <div class="grid md:grid-cols-3 gap-8" data-astro-cid-j7pv25f6> <div class="bg-white rounded-2xl p-8 shadow-md border border-[#F6F2E9]" data-astro-cid-j7pv25f6> <div class="w-12 h-12 bg-[#B68D40] rounded-full flex items-center justify-center mb-4" data-astro-cid-j7pv25f6> <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" data-astro-cid-j7pv25f6></path> </svg> </div> <h3 class="text-xl font-semibold text-[#2B2B2B] mb-4" data-astro-cid-j7pv25f6> ${t("hero.benefits.composition")} </h3> <p class="text-[#2B2B2B]/70" data-astro-cid-j7pv25f6> ${t("hero.benefits.notes")} </p> </div> <div class="bg-white rounded-2xl p-8 shadow-md border border-[#F6F2E9]" data-astro-cid-j7pv25f6> <div class="w-12 h-12 bg-[#3A4B2E] rounded-full flex items-center justify-center mb-4" data-astro-cid-j7pv25f6> <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" data-astro-cid-j7pv25f6></path> </svg> </div> <h3 class="text-xl font-semibold text-[#2B2B2B] mb-4" data-astro-cid-j7pv25f6> ${t("hero.benefits.sillage")} </h3> <p class="text-[#2B2B2B]/70" data-astro-cid-j7pv25f6> ${t("hero.benefits.refillable")} </p> </div> <div class="bg-white rounded-2xl p-8 shadow-md border border-[#F6F2E9]" data-astro-cid-j7pv25f6> <div class="w-12 h-12 bg-[#B68D40] rounded-full flex items-center justify-center mb-4" data-astro-cid-j7pv25f6> <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-j7pv25f6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" data-astro-cid-j7pv25f6></path> </svg> </div> <h3 class="text-xl font-semibold text-[#2B2B2B] mb-4" data-astro-cid-j7pv25f6> ${t("hero.benefits.sillage")} </h3> <p class="text-[#2B2B2B]/70" data-astro-cid-j7pv25f6> ${t("hero.benefits.refillable")} </p> </div> </div> </div> </section> ` })} `;
}, "/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/pages/index.astro", void 0);

const $$file = "/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
