import { useMemo, useState } from 'react';

type OrderItemRecord = {
  productId: string;
  productName: string;
  quantity: number;
  subtotal: number;
};

type OrderRecord = {
  id: string;
  total: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
  customer: string;
  createdAt: string;
  items: OrderItemRecord[];
};

type Props = {
  initialOrders: OrderRecord[];
  locale: string;
  currency: string;
  texts: {
    empty: string;
    error: string;
    feedback: string;
    table: {
      order: string;
      customer: string;
      status: string;
      total: string;
      created: string;
      actions: string;
    };
    status: Record<'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED', string>;
    actions: {
      markProcessing: string;
      markCompleted: string;
      cancel: string;
    };
  };
};

export function OrdersManager({ initialOrders, locale, currency, texts }: Props) {
  const [orders, setOrders] = useState<OrderRecord[]>(initialOrders);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: 'currency',
        currency
      }),
    [locale, currency]
  );

  const updateStatus = async (id: string, status: OrderRecord['status']) => {
    setLoadingId(id);
    setMessage(null);
    setError(null);
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!response.ok) {
        throw new Error('Failed to update order');
      }
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? { ...order, status } : order))
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
    return <p className="text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]">{texts.empty}</p>;
  }

  return (
    <div className="space-y-4">
      {error && <p className="rounded-full bg-red-100 px-4 py-2 text-sm text-red-700">{error}</p>}
      {message && <p className="rounded-full bg-green-100 px-4 py-2 text-sm text-green-700">{message}</p>}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="space-y-4 rounded-3xl border border-[color:var(--color-accent,rgba(0,0,0,0.1))] bg-white p-6"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <h3 className="font-heading text-lg text-[var(--color-secondary)]">
                  {texts.table.order} #{order.id.slice(0, 8)}
                </h3>
                <p className="text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]">
                  {texts.table.customer}: {order.customer}
                </p>
                <p className="text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]">
                  {texts.table.created}:{' '}
                  {new Intl.DateTimeFormat(locale, {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  }).format(new Date(order.createdAt))}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.35em] text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]">
                  {texts.table.status}
                </p>
                <p className="font-heading text-xl text-[var(--color-secondary)]">
                  {texts.status[order.status]}
                </p>
              </div>
            </div>
            <div className="space-y-2 rounded-2xl bg-[var(--color-surface,#fdf8f2)] p-4 text-sm">
              {order.items.map((item) => (
                <div key={item.productId} className="flex items-center justify-between">
                  <span>{item.productName} × {item.quantity}</span>
                  <span>{formatter.format(item.subtotal)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between border-t border-[color-mix(in srgb,var(--color-secondary) 10%,transparent 90%)] pt-2 font-semibold">
                <span>{texts.table.total}</span>
                <span>{formatter.format(order.total)}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={loadingId === order.id}
                onClick={() => updateStatus(order.id, 'PROCESSING')}
                className="rounded-full border border-[var(--color-secondary)] px-4 py-1 text-xs font-semibold text-[var(--color-secondary)] transition hover:bg-[var(--color-secondary)] hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {texts.actions.markProcessing}
              </button>
              <button
                type="button"
                disabled={loadingId === order.id}
                onClick={() => updateStatus(order.id, 'COMPLETED')}
                className="rounded-full border border-green-500 px-4 py-1 text-xs font-semibold text-green-600 transition hover:bg-green-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {texts.actions.markCompleted}
              </button>
              <button
                type="button"
                disabled={loadingId === order.id}
                onClick={() => updateStatus(order.id, 'CANCELLED')}
                className="rounded-full border border-red-300 px-4 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {texts.actions.cancel}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
