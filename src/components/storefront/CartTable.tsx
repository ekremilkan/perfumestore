import { useMemo, useState } from "react";

type CartLine = {
  productId: string;
  name: string;
  image?: string | null;
  price: number;
  quantity: number;
  subtotal: number;
};

type Props = {
  initialLines: CartLine[];
  locale: string;
  currency: string;
  texts: {
    remove: string;
    quantity: string;
    subtotal: string;
    empty: string;
    updateError: string;
    checkout: string;
    continue: string;
    itemLabel: string;
  };
};

export function CartTable({ initialLines, locale, currency, texts }: Props) {
  const [lines, setLines] = useState<CartLine[]>(initialLines);
  const [error, setError] = useState<string | null>(null);

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
      }),
    [locale, currency]
  );

  const subtotal = lines.reduce((sum, line) => sum + line.subtotal, 0);
  const totalQuantity = lines.reduce((sum, line) => sum + line.quantity, 0);

  const updateNav = (quantity: number) => {
    document.dispatchEvent(
      new CustomEvent("cart:updated", {
        detail: { totalQuantity: quantity },
      })
    );
  };

  const syncLines = (updated: CartLine[]) => {
    setLines(updated);
    const quantity = updated.reduce((sum, line) => sum + line.quantity, 0);
    updateNav(quantity);
  };

  const handleUpdate = async (productId: string, quantity: number) => {
    setError(null);
    try {
      const response = await fetch("/api/cart", {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!response.ok) {
        throw new Error("Failed to update cart");
      }
      syncLines(
        lines
          .map((line) =>
            line.productId === productId
              ? { ...line, quantity, subtotal: line.price * quantity }
              : line
          )
          .filter((line) => line.quantity > 0)
      );
    } catch (err) {
      console.error(err);
      setError(texts.updateError);
    }
  };

  const handleRemove = async (productId: string) => {
    setError(null);
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ productId }),
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
    return (
      <div className="space-y-6 text-center">
        <p className="font-heading text-xl text-[var(--color-secondary)]">
          {texts.empty}
        </p>
        <a
          href="/checkout"
          className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-5 py-2 text-sm font-semibold text-[var(--color-secondary)] transition hover:bg-[color-mix(in srgb,var(--color-primary) 85%,white 15%)]"
        >
          {texts.checkout}
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
      <ul className="space-y-6">
        {lines.map((line) => (
          <li
            key={line.productId}
            className="flex flex-col gap-6 rounded-3xl  bg-white p-6 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex w-full flex-1 items-center gap-4">
              {line.image ? (
                <img
                  src={line.image}
                  alt={line.name}
                  className="h-24 w-24 rounded-2xl object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-[var(--color-surface,#fdf8f2)] text-xs text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]">
                  {texts.itemLabel}
                </div>
              )}
              <div className="space-y-2">
                <h3 className="font-heading text-lg text-[var(--color-secondary)]">
                  {line.name}
                </h3>
                <p className="text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]">
                  {formatter.format(line.price)}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3 md:flex-row md:items-center">
              <div className="flex items-center bg-[var(--color-surface)] rounded-full border border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)]">
                <button
                  onClick={() =>
                    handleUpdate(line.productId, Math.max(1, line.quantity - 1))
                  }
                  className="w-8 h-8 flex items-center justify-center text-[var(--color-secondary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] rounded-full transition-colors"
                  aria-label="Decrease quantity"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 12H4"
                    ></path>
                  </svg>
                </button>
                <span className="w-10 text-center text-sm font-semibold text-[var(--color-secondary)]">
                  {line.quantity}
                </span>
                <button
                  onClick={() =>
                    handleUpdate(line.productId, line.quantity + 1)
                  }
                  className="w-8 h-8 flex items-center justify-center text-[var(--color-secondary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] rounded-full transition-colors"
                  aria-label="Increase quantity"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                </button>
              </div>
              <p className="font-semibold text-[var(--color-secondary)]">
                {texts.subtotal}: {formatter.format(line.subtotal)}
              </p>
              <button
                type="button"
                onClick={() => handleRemove(line.productId)}
                className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white transition hover:bg-red-600"
                aria-label={texts.remove}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="rounded-3xl bg-[var(--color-surface,#fdf8f2)] p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-xl text-[var(--color-secondary)] mb-4">
                Order Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]">
                    Subtotal ({totalQuantity} items)
                  </span>
                  <span className="text-sm font-semibold text-[var(--color-secondary)]">
                    {formatter.format(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]">
                    Shipping
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    Free
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]">
                    Tax
                  </span>
                  <span className="text-sm font-semibold text-[var(--color-secondary)]">
                    {formatter.format(subtotal * 0.1)}
                  </span>
                </div>
                <hr className="border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)]" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-[var(--color-secondary)]">
                    Total
                  </span>
                  <span className="text-2xl font-heading text-[var(--color-secondary)]">
                    {formatter.format(subtotal * 1.1)}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]">
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Free shipping on orders over €120
              </div>
              <div className="flex items-center gap-2 text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]">
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Estimated delivery: 2-3 business days
              </div>
              <div className="flex items-center gap-2 text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]">
                <svg
                  className="w-4 h-4 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
                Secure SSL encrypted checkout
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center space-y-6">
            <div className="text-center">
              <p className="text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)] mb-2">
                We accept
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  V
                </div>
                <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">
                  MC
                </div>
                <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
                  PP
                </div>
                <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  AE
                </div>
              </div>
            </div>
            <a
              href="/checkout"
              className="w-full inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-8 py-4 text-lg font-semibold text-[var(--color-secondary)] transition hover:bg-[color-mix(in srgb,var(--color-primary) 85%,white 15%)] hover:scale-105 transform"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              {texts.checkout}
            </a>
            <p className="text-xs text-center text-[color-mix(in srgb,var(--color-secondary) 60%,white 40%)]">
              By proceeding, you agree to our terms and privacy policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
