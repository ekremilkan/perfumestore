import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';

type ProductRecord = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  stock: number;
  category: string | null;
  image: string | null;
  isFeatured: boolean;
  updatedAt: string;
};

type Props = {
  initialProducts: ProductRecord[];
  locale: string;
  currency: string;
  texts: {
    listTitle: string;
    empty: string;
    create: string;
    update: string;
    delete: string;
    cancel: string;
    statusLabel: string;
    confirmDelete: string;
    error: string;
    feedback: {
      created: string;
      updated: string;
      deleted: string;
    };
    form: {
      name: string;
      slug: string;
      description: string;
      price: string;
      stock: string;
      category: string;
      image: string;
      isFeatured: string;
      submitCreate: string;
      submitUpdate: string;
    };
    table: {
      name: string;
      price: string;
      stock: string;
      updated: string;
      actions: string;
    };
  };
};

type FormState = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  image: string;
  isFeatured: boolean;
};

const defaultForm: FormState = {
  name: '',
  slug: '',
  description: '',
  price: '',
  stock: '0',
  category: '',
  image: '',
  isFeatured: false
};

export function ProductManager({ initialProducts, locale, currency, texts }: Props) {
  const [products, setProducts] = useState<ProductRecord[]>(initialProducts);
  const [form, setForm] = useState<FormState>(defaultForm);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = Boolean(form.id);

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: 'currency',
        currency
      }),
    [locale, currency]
  );

  const resetForm = () => {
    setForm(defaultForm);
  };

  const handleEdit = (product: ProductRecord) => {
    setForm({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description ?? '',
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category ?? '',
      image: product.image ?? '',
      isFeatured: product.isFeatured
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(texts.confirmDelete)) {
      return;
    }
    setError(null);
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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

    const requestInit: RequestInit = {
      method: isEditing ? 'PUT' : 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    };

    const url = isEditing ? `/api/products/${form.id}` : '/api/products';

    try {
      const response = await fetch(url, requestInit);
      if (response.status === 409) {
        setError(texts.error);
        return;
      }
      if (!response.ok) {
        throw new Error('Invalid response');
      }
      const product = (await response.json()) as ProductRecord;
      setProducts((prev) => {
        if (isEditing) {
          return prev.map((item) => (item.id === product.id ? product : item));
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

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <form className="space-y-4 rounded-3xl border border-[color:var(--color-accent,rgba(0,0,0,0.1))] bg-white p-6" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl text-[var(--color-secondary)]">
            {isEditing ? texts.update : texts.create}
          </h2>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="text-sm font-semibold text-[var(--color-secondary)] underline"
            >
              {texts.cancel}
            </button>
          )}
        </div>
        {error && <p className="rounded-full bg-red-100 px-4 py-2 text-sm text-red-700">{error}</p>}
        {message && <p className="rounded-full bg-green-100 px-4 py-2 text-sm text-green-700">{message}</p>}
        <div className="grid gap-4">
          <label className="flex flex-col gap-2 text-sm text-[var(--color-secondary)]">
            {texts.form.name}
            <input
              required
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              className="rounded-full border border-[color:var(--color-accent,rgba(0,0,0,0.14))] px-4 py-2 focus:border-[var(--color-primary)] focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-[var(--color-secondary)]">
            {texts.form.slug}
            <input
              required
              value={form.slug}
              onChange={(event) => setForm((prev) => ({ ...prev, slug: event.target.value }))}
              className="rounded-full border border-[color:var(--color-accent,rgba(0,0,0,0.14))] px-4 py-2 focus:border-[var(--color-primary)] focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-[var(--color-secondary)]">
            {texts.form.description}
            <textarea
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              className="min-h-[120px] rounded-3xl border border-[color:var(--color-accent,rgba(0,0,0,0.14))] px-4 py-2 focus:border-[var(--color-primary)] focus:outline-none"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-[var(--color-secondary)]">
              {texts.form.price}
              <input
                required
                type="number"
                step="0.01"
                value={form.price}
                onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))}
                className="rounded-full border border-[color:var(--color-accent,rgba(0,0,0,0.14))] px-4 py-2 focus:border-[var(--color-primary)] focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-[var(--color-secondary)]">
              {texts.form.stock}
              <input
                required
                type="number"
                min="0"
                value={form.stock}
                onChange={(event) => setForm((prev) => ({ ...prev, stock: event.target.value }))}
                className="rounded-full border border-[color:var(--color-accent,rgba(0,0,0,0.14))] px-4 py-2 focus:border-[var(--color-primary)] focus:outline-none"
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-[var(--color-secondary)]">
              {texts.form.category}
              <input
                value={form.category}
                onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
                className="rounded-full border border-[color:var(--color-accent,rgba(0,0,0,0.14))] px-4 py-2 focus:border-[var(--color-primary)] focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-[var(--color-secondary)]">
              {texts.form.image}
              <input
                value={form.image}
                onChange={(event) => setForm((prev) => ({ ...prev, image: event.target.value }))}
                className="rounded-full border border-[color:var(--color-accent,rgba(0,0,0,0.14))] px-4 py-2 focus:border-[var(--color-primary)] focus:outline-none"
              />
            </label>
          </div>
          <label className="flex items-center gap-2 text-sm text-[var(--color-secondary)]">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(event) => setForm((prev) => ({ ...prev, isFeatured: event.target.checked }))}
              className="h-4 w-4 rounded border border-[color:var(--color-accent,rgba(0,0,0,0.14))]"
            />
            {texts.form.isFeatured}
          </label>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-[var(--color-secondary)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[color-mix(in srgb,var(--color-secondary) 85%,white 15%)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isEditing ? texts.form.submitUpdate : texts.form.submitCreate}
        </button>
      </form>
      <div className="space-y-4 rounded-3xl border border-[color:var(--color-accent,rgba(0,0,0,0.1))] bg-white p-6">
        <h2 className="font-heading text-xl text-[var(--color-secondary)]">{texts.listTitle}</h2>
        {products.length === 0 ? (
          <p className="text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]">{texts.empty}</p>
        ) : (
          <table className="w-full border-separate border-spacing-y-2 text-sm">
            <thead className="text-left text-[color-mix(in srgb,var(--color-secondary) 60%,white 40%)]">
              <tr>
                <th>{texts.table.name}</th>
                <th>{texts.table.price}</th>
                <th>{texts.table.stock}</th>
                <th>{texts.table.updated}</th>
                <th className="text-right">{texts.table.actions}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="rounded-3xl bg-[var(--color-surface,#fdf8f2)]">
                  <td className="rounded-l-3xl px-4 py-3 font-medium text-[var(--color-secondary)]">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]">
                    {formatter.format(product.price)}
                  </td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3">
                    {new Intl.DateTimeFormat(locale, {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    }).format(new Date(product.updatedAt))}
                  </td>
                  <td className="rounded-r-3xl px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(product)}
                        className="rounded-full border border-[var(--color-secondary)] px-3 py-1 text-xs font-semibold text-[var(--color-secondary)] transition hover:bg-[var(--color-secondary)] hover:text-white"
                      >
                        {texts.update}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        className="rounded-full border border-red-300 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
                      >
                        {texts.delete}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
