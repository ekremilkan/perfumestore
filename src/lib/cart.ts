import type { APIContext, AstroCookies } from 'astro';
import type { Product } from '@db/prisma/client';

import { getProductById } from './services/products';

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartLine {
  product: Product;
  quantity: number;
  subtotal: number;
}

const CART_COOKIE_NAME = 'perfume_cart';

function parseCartCookie(value: string | undefined | null) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value) as CartItem[];
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (item) =>
          typeof item?.productId === 'string' &&
          typeof item?.quantity === 'number' &&
          item.quantity > 0
      );
    }
    return [];
  } catch {
    return [];
  }
}

export function readCart(cookies: AstroCookies) {
  const cookie = cookies.get(CART_COOKIE_NAME)?.value;
  return parseCartCookie(cookie);
}

export function writeCart(cookies: AstroCookies, items: CartItem[]) {
  cookies.set(CART_COOKIE_NAME, JSON.stringify(items), {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: !import.meta.env.DEV,
    maxAge: 60 * 60 * 24 * 30 // 30 days
  });
}

export async function getCartLines(cookies: AstroCookies) {
  const items = readCart(cookies);
  if (!items.length) return [];

  const lines: CartLine[] = [];
  for (const item of items) {
    const product = await getProductById(item.productId);
    if (!product) continue;
    const quantity = item.quantity;
    const subtotal = Number(product.price) * quantity;
    lines.push({ product, quantity, subtotal });
  }

  return lines;
}

export async function getCartContext(cookies: AstroCookies) {
  const lines = await getCartLines(cookies);
  const subtotal = lines.reduce((sum, line) => sum + line.subtotal, 0);
  const totalQuantity = lines.reduce((sum, line) => sum + line.quantity, 0);
  return {
    lines,
    subtotal,
    totalQuantity
  };
}

export async function getCartFromContext(context: APIContext) {
  return getCartContext(context.cookies);
}
