import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

type Props = {
  productId: string;
  quantity?: number;
  labels: {
    idle: string;
    loading: string;
    success: string;
    error: string;
  };
  className?: string;
};

export function AddToCartButton({ productId, quantity = 1, labels, className }: Props) {
  const [status, setStatus] = useState<Status>('idle');

  const labelMap: Record<Status, string> = {
    idle: labels.idle,
    loading: labels.loading,
    success: labels.success,
    error: labels.error
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (status === 'loading') {
      return;
    }
    setStatus('loading');

    const target = event.currentTarget;
    const currentQuantity = parseInt(target.getAttribute('data-quantity') || quantity.toString(), 10);

    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ productId, currentQuantity })
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = (await response.json()) as { totalQuantity: number };
      document.dispatchEvent(
        new CustomEvent('cart:updated', {
          detail: { totalQuantity: data.totalQuantity }
        })
      );
      setStatus('success');
      setTimeout(() => setStatus('idle'), 1500);
    } catch (error) {
      console.error('Failed to add to cart', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2500);
    }
  };

  const isIconButton = className?.includes('w-12') || className?.includes('h-12');

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={status === 'loading'}
      data-status={status}
      aria-live="polite"
      aria-busy={status === 'loading'}
      aria-label={labelMap[status]}
      className={
        className ??
        'button-premium inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-5 py-2 text-sm font-semibold text-[var(--color-secondary)] disabled:cursor-not-allowed disabled:opacity-70'
      }
    >
      {isIconButton ? (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13v8a2 2 0 002 2h10a2 2 0 002-2v-3"
          />
        </svg>
      ) : (
        labelMap[status]
      )}
    </button>
  );
}
