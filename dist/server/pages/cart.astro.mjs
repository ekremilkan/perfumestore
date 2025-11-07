import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DphMVhZR.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useMemo } from 'react';
import { c as createTranslator, $ as $$Layout } from '../chunks/Layout_CX9V-NAS.mjs';
import { g as getCartContext } from '../chunks/cart_ChTR_Zc6.mjs';
export { renderers } from '../renderers.mjs';

function CartTable({ initialLines, locale, currency, texts }) {
  const [lines, setLines] = useState(initialLines);
  const [error, setError] = useState(null);
  const formatter = useMemo(
    () => new Intl.NumberFormat(locale, {
      style: "currency",
      currency
    }),
    [locale, currency]
  );
  const subtotal = lines.reduce((sum, line) => sum + line.subtotal, 0);
  const totalQuantity = lines.reduce((sum, line) => sum + line.quantity, 0);
  const updateNav = (quantity) => {
    document.dispatchEvent(
      new CustomEvent("cart:updated", {
        detail: { totalQuantity: quantity }
      })
    );
  };
  const syncLines = (updated) => {
    setLines(updated);
    const quantity = updated.reduce((sum, line) => sum + line.quantity, 0);
    updateNav(quantity);
  };
  const handleUpdate = async (productId, quantity) => {
    setError(null);
    try {
      const response = await fetch("/api/cart", {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ productId, quantity })
      });
      if (!response.ok) {
        throw new Error("Failed to update cart");
      }
      syncLines(
        lines.map(
          (line) => line.productId === productId ? { ...line, quantity, subtotal: line.price * quantity } : line
        ).filter((line) => line.quantity > 0)
      );
    } catch (err) {
      console.error(err);
      setError(texts.updateError);
    }
  };
  const handleRemove = async (productId) => {
    setError(null);
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ productId })
      });
      if (!response.ok) {
        throw new Error("Failed to remove item");
      }
      syncLines(lines.filter((line) => line.productId !== productId));
    } catch (err) {
      console.error(err);
      setError(texts.updateError);
    }
  };
  if (!lines.length) {
    return /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "font-heading text-xl text-[var(--color-secondary)]", children: texts.empty }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/checkout",
          className: "inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-5 py-2 text-sm font-semibold text-[var(--color-secondary)] transition hover:bg-[color-mix(in srgb,var(--color-primary) 85%,white 15%)]",
          children: texts.checkout
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    error && /* @__PURE__ */ jsx("div", { className: "rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700", children: error }),
    /* @__PURE__ */ jsx("ul", { className: "space-y-6", children: lines.map((line) => /* @__PURE__ */ jsxs(
      "li",
      {
        className: "flex flex-col gap-6 rounded-3xl  bg-white p-6 md:flex-row md:items-center md:justify-between",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-1 items-center gap-4", children: [
            line.image ? /* @__PURE__ */ jsx(
              "img",
              {
                src: line.image,
                alt: line.name,
                className: "h-24 w-24 rounded-2xl object-cover",
                loading: "lazy"
              }
            ) : /* @__PURE__ */ jsx("div", { className: "flex h-24 w-24 items-center justify-center rounded-2xl bg-[var(--color-surface,#fdf8f2)] text-xs text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]", children: texts.itemLabel }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-heading text-lg text-[var(--color-secondary)]", children: line.name }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]", children: formatter.format(line.price) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-end gap-3 md:flex-row md:items-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-[var(--color-surface)] rounded-full border border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)]", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleUpdate(line.productId, Math.max(1, line.quantity - 1)),
                  className: "w-8 h-8 flex items-center justify-center text-[var(--color-secondary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] rounded-full transition-colors",
                  "aria-label": "Decrease quantity",
                  children: /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "w-3 h-3",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: "2",
                          d: "M20 12H4"
                        }
                      )
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "w-10 text-center text-sm font-semibold text-[var(--color-secondary)]", children: line.quantity }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleUpdate(line.productId, line.quantity + 1),
                  className: "w-8 h-8 flex items-center justify-center text-[var(--color-secondary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] rounded-full transition-colors",
                  "aria-label": "Increase quantity",
                  children: /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "w-3 h-3",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: "2",
                          d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                        }
                      )
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "font-semibold text-[var(--color-secondary)]", children: [
              texts.subtotal,
              ": ",
              formatter.format(line.subtotal)
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => handleRemove(line.productId),
                className: "w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white transition hover:bg-red-600",
                "aria-label": texts.remove,
                children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "w-4 h-4",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: "2",
                        d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      }
                    )
                  }
                )
              }
            )
          ] })
        ]
      },
      line.productId
    )) }),
    /* @__PURE__ */ jsx("div", { className: "rounded-3xl bg-[var(--color-surface,#fdf8f2)] p-8", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-heading text-xl text-[var(--color-secondary)] mb-4", children: "Order Summary" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]", children: [
                "Subtotal (",
                totalQuantity,
                " items)"
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-[var(--color-secondary)]", children: formatter.format(subtotal) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]", children: "Shipping" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-green-600", children: "Free" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]", children: "Tax" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-[var(--color-secondary)]", children: formatter.format(subtotal * 0.1) })
            ] }),
            /* @__PURE__ */ jsx("hr", { className: "border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)]" }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "text-lg font-semibold text-[var(--color-secondary)]", children: "Total" }),
              /* @__PURE__ */ jsx("span", { className: "text-2xl font-heading text-[var(--color-secondary)]", children: formatter.format(subtotal * 1.1) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]", children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-4 h-4 text-green-500",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                    d: "M5 13l4 4L19 7"
                  }
                )
              }
            ),
            "Free shipping on orders over €120"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]", children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-4 h-4 text-blue-500",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                    d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  }
                )
              }
            ),
            "Estimated delivery: 2-3 business days"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]", children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-4 h-4 text-purple-500",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "2",
                    d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  }
                )
              }
            ),
            "Secure SSL encrypted checkout"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center items-center space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)] mb-2", children: "We accept" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold", children: "V" }),
            /* @__PURE__ */ jsx("div", { className: "w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold", children: "MC" }),
            /* @__PURE__ */ jsx("div", { className: "w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold", children: "PP" }),
            /* @__PURE__ */ jsx("div", { className: "w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold", children: "AE" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/checkout",
            className: "w-full inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-8 py-4 text-lg font-semibold text-[var(--color-secondary)] transition hover:bg-[color-mix(in srgb,var(--color-primary) 85%,white 15%)] hover:scale-105 transform",
            children: [
              /* @__PURE__ */ jsx(
                "svg",
                {
                  className: "w-5 h-5 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2",
                      d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    }
                  )
                }
              ),
              texts.checkout
            ]
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-center text-[color-mix(in srgb,var(--color-secondary) 60%,white 40%)]", children: "By proceeding, you agree to our terms and privacy policy" })
      ] })
    ] }) })
  ] });
}

const $$Astro = createAstro("http://localhost:4321");
const $$Cart = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Cart;
  const locale = Astro2.locals.locale ?? "en";
  const t = createTranslator(locale);
  const cart = await getCartContext(Astro2.cookies);
  const lines = cart.lines.map((line) => ({
    productId: line.product.id,
    name: line.product.name,
    image: line.product.image,
    price: Number(line.product.price ?? 0),
    quantity: line.quantity,
    subtotal: line.subtotal
  }));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": t("meta.cartTitle"), "description": t("meta.cartDescription") }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="space-y-8 py-12"> <header class="space-y-2"> <h1 class="font-heading text-3xl font-semibold text-[var(--color-secondary)]"> ${t("cart.title")} </h1> <p class="text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]"> ${t("cart.shippingNotice")} </p> </header> ${renderComponent($$result2, "CartTable", CartTable, { "client:load": true, "initialLines": lines, "locale": locale, "currency": "EUR", "texts": {
    remove: t("cart.remove"),
    quantity: t("cart.quantity"),
    subtotal: t("cart.subtotal"),
    empty: t("cart.empty"),
    updateError: t("notifications.cartError"),
    checkout: t("cart.checkout"),
    continue: t("cart.continue"),
    itemLabel: t("cart.items")
  }, "client:component-hydration": "load", "client:component-path": "/Users/darah.k/Downloads/projectsDubai/perfumestore/src/components/storefront/CartTable.tsx", "client:component-export": "CartTable" })} </section> ` })}`;
}, "/Users/darah.k/Downloads/projectsDubai/perfumestore/src/pages/cart.astro", void 0);

const $$file = "/Users/darah.k/Downloads/projectsDubai/perfumestore/src/pages/cart.astro";
const $$url = "/cart";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Cart,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
