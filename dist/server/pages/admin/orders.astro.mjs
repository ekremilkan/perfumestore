import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_DphMVhZR.mjs';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_-m8ErelV.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useMemo } from 'react';
import { c as createTranslator, $ as $$Layout } from '../../chunks/Layout_CW4dC78d.mjs';
import { p as prisma } from '../../chunks/prisma_BXVFITCM.mjs';
import { g as getTenantId } from '../../chunks/business_eBF7zugw.mjs';
export { renderers } from '../../renderers.mjs';

function OrdersManager({ initialOrders, locale, currency, texts }) {
  const [orders, setOrders] = useState(initialOrders);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const formatter = useMemo(
    () => new Intl.NumberFormat(locale, {
      style: "currency",
      currency
    }),
    [locale, currency]
  );
  const updateStatus = async (id, status) => {
    setLoadingId(id);
    setMessage(null);
    setError(null);
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (!response.ok) {
        throw new Error("Failed to update order");
      }
      setOrders(
        (prev) => prev.map((order) => order.id === id ? { ...order, status } : order)
      );
      setMessage(texts.feedback);
    } catch (err) {
      console.error(err);
      setError(texts.error);
    } finally {
      setLoadingId(null);
    }
  };
  if (!orders.length) {
    return /* @__PURE__ */ jsx("p", { className: "text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]", children: texts.empty });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    error && /* @__PURE__ */ jsx("p", { className: "rounded-full bg-red-100 px-4 py-2 text-sm text-red-700", children: error }),
    message && /* @__PURE__ */ jsx("p", { className: "rounded-full bg-green-100 px-4 py-2 text-sm text-green-700", children: message }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: orders.map((order) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "space-y-4 rounded-3xl border border-[color:var(--color-accent,rgba(0,0,0,0.1))] bg-white p-6",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 md:flex-row md:items-center md:justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxs("h3", { className: "font-heading text-lg text-[var(--color-secondary)]", children: [
                texts.table.order,
                " #",
                order.id.slice(0, 8)
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]", children: [
                texts.table.customer,
                ": ",
                order.customer
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]", children: [
                texts.table.created,
                ":",
                " ",
                new Intl.DateTimeFormat(locale, {
                  dateStyle: "medium",
                  timeStyle: "short"
                }).format(new Date(order.createdAt))
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[0.35em] text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]", children: texts.table.status }),
              /* @__PURE__ */ jsx("p", { className: "font-heading text-xl text-[var(--color-secondary)]", children: texts.status[order.status] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 rounded-2xl bg-[var(--color-surface,#fdf8f2)] p-4 text-sm", children: [
            order.items.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                item.productName,
                " × ",
                item.quantity
              ] }),
              /* @__PURE__ */ jsx("span", { children: formatter.format(item.subtotal) })
            ] }, item.productId)),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t border-[color-mix(in srgb,var(--color-secondary) 10%,transparent 90%)] pt-2 font-semibold", children: [
              /* @__PURE__ */ jsx("span", { children: texts.table.total }),
              /* @__PURE__ */ jsx("span", { children: formatter.format(order.total) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                disabled: loadingId === order.id,
                onClick: () => updateStatus(order.id, "PROCESSING"),
                className: "rounded-full border border-[var(--color-secondary)] px-4 py-1 text-xs font-semibold text-[var(--color-secondary)] transition hover:bg-[var(--color-secondary)] hover:text-white disabled:cursor-not-allowed disabled:opacity-70",
                children: texts.actions.markProcessing
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                disabled: loadingId === order.id,
                onClick: () => updateStatus(order.id, "COMPLETED"),
                className: "rounded-full border border-green-500 px-4 py-1 text-xs font-semibold text-green-600 transition hover:bg-green-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-70",
                children: texts.actions.markCompleted
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                disabled: loadingId === order.id,
                onClick: () => updateStatus(order.id, "CANCELLED"),
                className: "rounded-full border border-red-300 px-4 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-70",
                children: texts.actions.cancel
              }
            )
          ] })
        ]
      },
      order.id
    )) })
  ] });
}

const $$Astro = createAstro("http://localhost:4321");
const $$Orders = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Orders;
  const locale = Astro2.locals.locale ?? "en";
  const t = createTranslator(locale);
  const tenantId = await getTenantId();
  const orders = await prisma.order.findMany({
    where: { tenant_id: tenantId },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          product: {
            select: {
              name: true,
              price: true
            }
          }
        }
      },
      user: {
        select: {
          email: true,
          name: true
        }
      }
    }
  });
  const initialOrders = orders.map((order) => ({
    id: order.id,
    total: Number(order.total ?? 0),
    status: order.status,
    customer: order.user?.email ?? order.userId,
    createdAt: order.createdAt.toISOString(),
    items: order.items.map((item) => ({
      productId: item.productId,
      productName: item.product?.name ?? "Product",
      quantity: item.quantity,
      subtotal: Number(item.subtotal ?? Number(item.unitPrice ?? 0) * item.quantity)
    }))
  }));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": t("meta.adminTitle"), "description": t("meta.adminDescription") }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "AdminLayout", $$AdminLayout, { "t": t, "active": "orders", "user": Astro2.locals.user ?? null }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "OrdersManager", OrdersManager, { "client:load": true, "initialOrders": initialOrders, "locale": locale, "currency": "EUR", "texts": {
    empty: t("admin.orders.empty"),
    error: t("admin.notifications.error"),
    feedback: t("admin.orders.feedback.statusUpdated"),
    table: {
      order: t("admin.orders.table.order"),
      customer: t("admin.orders.table.customer"),
      status: t("admin.orders.table.status"),
      total: t("admin.orders.table.total"),
      created: t("admin.orders.table.created"),
      actions: t("admin.orders.table.actions")
    },
    status: {
      PENDING: t("admin.orders.status.PENDING"),
      PROCESSING: t("admin.orders.status.PROCESSING"),
      COMPLETED: t("admin.orders.status.COMPLETED"),
      CANCELLED: t("admin.orders.status.CANCELLED")
    },
    actions: {
      markProcessing: t("admin.orders.actions.markProcessing"),
      markCompleted: t("admin.orders.actions.markCompleted"),
      cancel: t("admin.orders.actions.cancel")
    }
  }, "client:component-hydration": "load", "client:component-path": "/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/components/admin/OrdersManager.tsx", "client:component-export": "OrdersManager" })} ` })} ` })}`;
}, "/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/pages/admin/orders.astro", void 0);

const $$file = "/Users/ekremilkan/Desktop/projects/ecommerce-astro/src/pages/admin/orders.astro";
const $$url = "/admin/orders";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Orders,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
