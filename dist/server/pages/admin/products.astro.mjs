import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_DphMVhZR.mjs';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_DSnMBYk_.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useMemo } from 'react';
import { c as createTranslator, $ as $$Layout } from '../../chunks/Layout_CX9V-NAS.mjs';
import { p as prisma } from '../../chunks/prisma_BXVFITCM.mjs';
import { g as getTenantId } from '../../chunks/business_eBF7zugw.mjs';
export { renderers } from '../../renderers.mjs';

const defaultForm = {
  name: "",
  slug: "",
  description: "",
  price: "",
  stock: "0",
  category: "",
  image: "",
  isFeatured: false
};
function ProductManager({ initialProducts, locale, currency, texts }) {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState(defaultForm);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = Boolean(form.id);
  const formatter = useMemo(
    () => new Intl.NumberFormat(locale, {
      style: "currency",
      currency
    }),
    [locale, currency]
  );
  const resetForm = () => {
    setForm(defaultForm);
  };
  const handleEdit = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description ?? "",
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category ?? "",
      image: product.image ?? "",
      isFeatured: product.isFeatured
    });
  };
  const handleDelete = async (id) => {
    if (!window.confirm(texts.confirmDelete)) {
      return;
    }
    setError(null);
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      setProducts((prev) => prev.filter((item) => item.id !== id));
      setMessage(texts.feedback.deleted);
      if (form.id === id) {
        resetForm();
      }
    } catch (err) {
      console.error(err);
      setError(texts.error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setMessage(null);
    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      description: form.description.trim() || null,
      price: Number(form.price),
      stock: Number(form.stock),
      category: form.category.trim() || null,
      image: form.image.trim() || null,
      isFeatured: form.isFeatured
    };
    if (!payload.name || !payload.slug || Number.isNaN(payload.price)) {
      setError(texts.error);
      setIsSubmitting(false);
      return;
    }
    const requestInit = {
      method: isEditing ? "PUT" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload)
    };
    const url = isEditing ? `/api/products/${form.id}` : "/api/products";
    try {
      const response = await fetch(url, requestInit);
      if (response.status === 409) {
        setError(texts.error);
        return;
      }
      if (!response.ok) {
        throw new Error("Invalid response");
      }
      const product = await response.json();
      setProducts((prev) => {
        if (isEditing) {
          return prev.map((item) => item.id === product.id ? product : item);
        }
        return [product, ...prev];
      });
      setMessage(isEditing ? texts.feedback.updated : texts.feedback.created);
      resetForm();
    } catch (err) {
      console.error(err);
      setError(texts.error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_1fr]", children: [
    /* @__PURE__ */ jsxs("form", { className: "space-y-4 rounded-3xl border border-[color:var(--color-accent,rgba(0,0,0,0.1))] bg-white p-6", onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-heading text-xl text-[var(--color-secondary)]", children: isEditing ? texts.update : texts.create }),
        isEditing && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: resetForm,
            className: "text-sm font-semibold text-[var(--color-secondary)] underline",
            children: texts.cancel
          }
        )
      ] }),
      error && /* @__PURE__ */ jsx("p", { className: "rounded-full bg-red-100 px-4 py-2 text-sm text-red-700", children: error }),
      message && /* @__PURE__ */ jsx("p", { className: "rounded-full bg-green-100 px-4 py-2 text-sm text-green-700", children: message }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
        /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-2 text-sm text-[var(--color-secondary)]", children: [
          texts.form.name,
          /* @__PURE__ */ jsx(
            "input",
            {
              required: true,
              value: form.name,
              onChange: (event) => setForm((prev) => ({ ...prev, name: event.target.value })),
              className: "rounded-full border border-[color:var(--color-accent,rgba(0,0,0,0.14))] px-4 py-2 focus:border-[var(--color-primary)] focus:outline-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-2 text-sm text-[var(--color-secondary)]", children: [
          texts.form.slug,
          /* @__PURE__ */ jsx(
            "input",
            {
              required: true,
              value: form.slug,
              onChange: (event) => setForm((prev) => ({ ...prev, slug: event.target.value })),
              className: "rounded-full border border-[color:var(--color-accent,rgba(0,0,0,0.14))] px-4 py-2 focus:border-[var(--color-primary)] focus:outline-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-2 text-sm text-[var(--color-secondary)]", children: [
          texts.form.description,
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: form.description,
              onChange: (event) => setForm((prev) => ({ ...prev, description: event.target.value })),
              className: "min-h-[120px] rounded-3xl border border-[color:var(--color-accent,rgba(0,0,0,0.14))] px-4 py-2 focus:border-[var(--color-primary)] focus:outline-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-2 text-sm text-[var(--color-secondary)]", children: [
            texts.form.price,
            /* @__PURE__ */ jsx(
              "input",
              {
                required: true,
                type: "number",
                step: "0.01",
                value: form.price,
                onChange: (event) => setForm((prev) => ({ ...prev, price: event.target.value })),
                className: "rounded-full border border-[color:var(--color-accent,rgba(0,0,0,0.14))] px-4 py-2 focus:border-[var(--color-primary)] focus:outline-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-2 text-sm text-[var(--color-secondary)]", children: [
            texts.form.stock,
            /* @__PURE__ */ jsx(
              "input",
              {
                required: true,
                type: "number",
                min: "0",
                value: form.stock,
                onChange: (event) => setForm((prev) => ({ ...prev, stock: event.target.value })),
                className: "rounded-full border border-[color:var(--color-accent,rgba(0,0,0,0.14))] px-4 py-2 focus:border-[var(--color-primary)] focus:outline-none"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-2 text-sm text-[var(--color-secondary)]", children: [
            texts.form.category,
            /* @__PURE__ */ jsx(
              "input",
              {
                value: form.category,
                onChange: (event) => setForm((prev) => ({ ...prev, category: event.target.value })),
                className: "rounded-full border border-[color:var(--color-accent,rgba(0,0,0,0.14))] px-4 py-2 focus:border-[var(--color-primary)] focus:outline-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-2 text-sm text-[var(--color-secondary)]", children: [
            texts.form.image,
            /* @__PURE__ */ jsx(
              "input",
              {
                value: form.image,
                onChange: (event) => setForm((prev) => ({ ...prev, image: event.target.value })),
                className: "rounded-full border border-[color:var(--color-accent,rgba(0,0,0,0.14))] px-4 py-2 focus:border-[var(--color-primary)] focus:outline-none"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm text-[var(--color-secondary)]", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: form.isFeatured,
              onChange: (event) => setForm((prev) => ({ ...prev, isFeatured: event.target.checked })),
              className: "h-4 w-4 rounded border border-[color:var(--color-accent,rgba(0,0,0,0.14))]"
            }
          ),
          texts.form.isFeatured
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: isSubmitting,
          className: "rounded-full bg-[var(--color-secondary)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[color-mix(in srgb,var(--color-secondary) 85%,white 15%)] disabled:cursor-not-allowed disabled:opacity-70",
          children: isEditing ? texts.form.submitUpdate : texts.form.submitCreate
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4 rounded-3xl border border-[color:var(--color-accent,rgba(0,0,0,0.1))] bg-white p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-heading text-xl text-[var(--color-secondary)]", children: texts.listTitle }),
      products.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]", children: texts.empty }) : /* @__PURE__ */ jsxs("table", { className: "w-full border-separate border-spacing-y-2 text-sm", children: [
        /* @__PURE__ */ jsx("thead", { className: "text-left text-[color-mix(in srgb,var(--color-secondary) 60%,white 40%)]", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { children: texts.table.name }),
          /* @__PURE__ */ jsx("th", { children: texts.table.price }),
          /* @__PURE__ */ jsx("th", { children: texts.table.stock }),
          /* @__PURE__ */ jsx("th", { children: texts.table.updated }),
          /* @__PURE__ */ jsx("th", { className: "text-right", children: texts.table.actions })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: products.map((product) => /* @__PURE__ */ jsxs("tr", { className: "rounded-3xl bg-[var(--color-surface,#fdf8f2)]", children: [
          /* @__PURE__ */ jsx("td", { className: "rounded-l-3xl px-4 py-3 font-medium text-[var(--color-secondary)]", children: product.name }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]", children: formatter.format(product.price) }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: product.stock }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: new Intl.DateTimeFormat(locale, {
            dateStyle: "medium",
            timeStyle: "short"
          }).format(new Date(product.updatedAt)) }),
          /* @__PURE__ */ jsx("td", { className: "rounded-r-3xl px-4 py-3 text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => handleEdit(product),
                className: "rounded-full border border-[var(--color-secondary)] px-3 py-1 text-xs font-semibold text-[var(--color-secondary)] transition hover:bg-[var(--color-secondary)] hover:text-white",
                children: texts.update
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => handleDelete(product.id),
                className: "rounded-full border border-red-300 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-500 hover:text-white",
                children: texts.delete
              }
            )
          ] }) })
        ] }, product.id)) })
      ] })
    ] })
  ] });
}

const $$Astro = createAstro("http://localhost:4321");
const $$Products = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Products;
  const locale = Astro2.locals.locale ?? "en";
  const t = createTranslator(locale);
  const tenantId = await getTenantId();
  const products = await prisma.product.findMany({
    where: { tenant_id: tenantId },
    orderBy: { updatedAt: "desc" }
  });
  const initialProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description ?? "",
    price: Number(product.price ?? 0),
    stock: product.stock,
    category: product.category ?? "",
    image: product.image ?? "",
    isFeatured: product.isFeatured,
    updatedAt: product.updatedAt.toISOString()
  }));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": t("meta.adminTitle"), "description": t("meta.adminDescription") }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "AdminLayout", $$AdminLayout, { "t": t, "active": "products", "user": Astro2.locals.user ?? null }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "ProductManager", ProductManager, { "client:load": true, "initialProducts": initialProducts, "locale": locale, "currency": "EUR", "texts": {
    listTitle: t("admin.products.title"),
    empty: t("admin.products.empty"),
    create: t("admin.products.create"),
    update: t("admin.products.update"),
    delete: t("admin.products.delete"),
    cancel: t("admin.products.cancel"),
    statusLabel: t("admin.products.statusLabel"),
    confirmDelete: t("admin.products.confirmDelete"),
    error: t("admin.notifications.error"),
    feedback: {
      created: t("admin.products.feedback.created"),
      updated: t("admin.products.feedback.updated"),
      deleted: t("admin.products.feedback.deleted")
    },
    form: {
      name: t("admin.products.form.name"),
      slug: t("admin.products.form.slug"),
      description: t("admin.products.form.description"),
      price: t("admin.products.form.price"),
      stock: t("admin.products.form.stock"),
      category: t("admin.products.form.category"),
      image: t("admin.products.form.image"),
      isFeatured: t("admin.products.form.isFeatured"),
      submitCreate: t("admin.products.form.submitCreate"),
      submitUpdate: t("admin.products.form.submitUpdate")
    },
    table: {
      name: t("admin.products.table.name"),
      price: t("admin.products.table.price"),
      stock: t("admin.products.table.stock"),
      updated: t("admin.products.table.updated"),
      actions: t("admin.products.table.actions")
    }
  }, "client:component-hydration": "load", "client:component-path": "/Users/darah.k/Downloads/projectsDubai/perfumestore/src/components/admin/ProductManager.tsx", "client:component-export": "ProductManager" })} ` })} ` })}`;
}, "/Users/darah.k/Downloads/projectsDubai/perfumestore/src/pages/admin/products.astro", void 0);

const $$file = "/Users/darah.k/Downloads/projectsDubai/perfumestore/src/pages/admin/products.astro";
const $$url = "/admin/products";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Products,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
