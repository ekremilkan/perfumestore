import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, k as renderComponent, r as renderTemplate } from './astro/server_DphMVhZR.mjs';
import { jsx } from 'react/jsx-runtime';
import { useState } from 'react';

function AddToCartButton({ productId, quantity = 1, labels, className }) {
  const [status, setStatus] = useState("idle");
  const labelMap = {
    idle: labels.idle,
    loading: labels.loading,
    success: labels.success,
    error: labels.error
  };
  const handleClick = async (event) => {
    if (status === "loading") {
      return;
    }
    setStatus("loading");
    const target = event.currentTarget;
    const currentQuantity = parseInt(target.getAttribute("data-quantity") || quantity.toString(), 10);
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ productId, currentQuantity })
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      document.dispatchEvent(
        new CustomEvent("cart:updated", {
          detail: { totalQuantity: data.totalQuantity }
        })
      );
      setStatus("success");
      setTimeout(() => setStatus("idle"), 1500);
    } catch (error) {
      console.error("Failed to add to cart", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    }
  };
  const isIconButton = className?.includes("w-12") || className?.includes("h-12");
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick: handleClick,
      disabled: status === "loading",
      "data-status": status,
      "aria-live": "polite",
      "aria-busy": status === "loading",
      "aria-label": labelMap[status],
      className: className ?? "button-premium inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-5 py-2 text-sm font-semibold text-[var(--color-secondary)] disabled:cursor-not-allowed disabled:opacity-70",
      children: isIconButton ? /* @__PURE__ */ jsx(
        "svg",
        {
          className: "w-5 h-5",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h10a2 2 0 002-2v-3"
            }
          )
        }
      ) : labelMap[status]
    }
  );
}

const $$Astro = createAstro("http://localhost:4321");
const $$ProductCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProductCard;
  const { product, t, locale } = Astro2.props;
  const price = Number(product.price ?? 0);
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR"
  });
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/product/${product.slug}`, "href")} class="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full block" data-product-card${addAttribute(product.category ?? "uncategorized", "data-category")}${addAttribute(price, "data-price")}${addAttribute(String(product.isFeatured), "data-featured")}> <div class="relative block overflow-hidden aspect-square flex-shrink-0"> ${product.image ? renderTemplate`<img${addAttribute(product.image, "src")}${addAttribute(product.name, "alt")} loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">` : renderTemplate`<div class="w-full h-full bg-[#F6F2E9] flex items-center justify-center"> <svg class="w-12 h-12 text-[#2B2B2B]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path> </svg> </div>`} <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div> ${product.isFeatured && renderTemplate`<span class="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-[#B68D40] px-3 py-1 text-xs font-semibold text-white shadow"> ${t("products.newArrival")} </span>`} </div> <div class="p-6 flex flex-col justify-between flex-grow"> <div> <div class="text-sm text-[#3A4B2E] uppercase tracking-wide mb-2"> ${product.category ?? t("products.uncategorized")} </div> <h3 class="text-xl font-semibold text-[#2B2B2B] mb-2 line-clamp-2 hover:text-[#B68D40] transition-colors"> ${product.name} </h3> </div> <div class="flex items-center justify-between mt-4"> <span class="text-2xl font-bold text-[#B68D40]"> ${formatter.format(price)} </span> ${renderComponent($$result, "AddToCartButton", AddToCartButton, { "client:idle": true, "productId": product.id, "labels": {
    idle: t("products.addToCart"),
    loading: t("products.adding"),
    success: t("products.added"),
    error: t("notifications.cartError")
  }, "className": "w-12 h-12 bg-[#3A4B2E] text-white rounded-full flex items-center justify-center hover:bg-[#3A4B2E]/90 transition-colors", "client:component-hydration": "idle", "client:component-path": "/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/components/storefront/AddToCartButton.tsx", "client:component-export": "AddToCartButton" })} </div> </div> </a>`;
}, "/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/components/storefront/ProductCard.astro", void 0);

export { $$ProductCard as $, AddToCartButton as A };
