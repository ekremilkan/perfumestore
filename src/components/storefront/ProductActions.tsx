import { useState } from 'react';
import { AddToCartButton } from './AddToCartButton';

type Props = {
  productId: string;
  isOutOfStock: boolean;
  labels: {
    idle: string;
    loading: string;
    success: string;
    error: string;
  };
  outOfStockMessage: string;
};

export function ProductActions({ productId, isOutOfStock, labels, outOfStockMessage }: Props) {
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
    return <p className="text-sm text-[color-mix(in srgb,var(--color-secondary) 70%,white 30%)]">{outOfStockMessage}</p>;
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center bg-[var(--color-surface)] rounded-full border border-[color-mix(in srgb,var(--color-primary) 15%,transparent 85%)]">
        <button
          onClick={decreaseQuantity}
          className="w-10 h-10 flex items-center justify-center text-[var(--color-secondary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] rounded-full transition-colors"
          aria-label="Decrease quantity"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
          </svg>
        </button>
        <span className="w-12 text-center text-sm font-semibold text-[var(--color-secondary)]">{quantity}</span>
        <button
          onClick={increaseQuantity}
          className="w-10 h-10 flex items-center justify-center text-[var(--color-secondary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)] rounded-full transition-colors"
          aria-label="Increase quantity"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </button>
      </div>
      <AddToCartButton
        productId={productId}
        quantity={quantity}
        labels={labels}
        className="button-premium inline-flex w-full items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-secondary)] md:w-auto"
      />
    </div>
  );
}