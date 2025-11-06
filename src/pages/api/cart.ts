import type { APIRoute } from 'astro';

import { getCartContext, readCart, writeCart } from '../../lib/cart';
import { getProductById } from '../../lib/services/products';

const INVALID_PAYLOAD = new Response(null, { status: 400 });

export const GET: APIRoute = async ({ cookies }) => {
  const cart = await getCartContext(cookies);
  return new Response(
    JSON.stringify({
      lines: cart.lines.map((line) => ({
        productId: line.product.id,
        name: line.product.name,
        price: line.product.price,
        image: line.product.image,
        quantity: line.quantity,
        subtotal: line.subtotal
      })),
      subtotal: cart.subtotal,
      totalQuantity: cart.totalQuantity
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json'
      }
    }
  );
};

export const POST: APIRoute = async ({ request, cookies }) => {
  const body = await request.json().catch(() => null);
  const productId = body?.productId as string | undefined;
  const quantity = Number(body?.quantity ?? 1);

  if (!productId || Number.isNaN(quantity) || quantity <= 0) {
    return INVALID_PAYLOAD;
  }

  const product = await getProductById(productId);
  if (!product) {
    return new Response(null, { status: 404 });
  }

  const items = readCart(cookies);
  const existing = items.find((item) => item.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({ productId, quantity });
  }
  writeCart(cookies, items);

  const cart = await getCartContext(cookies);
  return new Response(
    JSON.stringify({
      totalQuantity: cart.totalQuantity
    }),
    {
      status: 200,
      headers: { 'content-type': 'application/json' }
    }
  );
};

export const PATCH: APIRoute = async ({ request, cookies }) => {
  const body = await request.json().catch(() => null);
  const productId = body?.productId as string | undefined;
  const quantity = Number(body?.quantity);

  if (!productId || Number.isNaN(quantity) || quantity < 0) {
    return INVALID_PAYLOAD;
  }

  const items = readCart(cookies);
  const existing = items.find((item) => item.productId === productId);
  if (!existing) {
    return new Response(null, { status: 404 });
  }

  if (quantity === 0) {
    const filtered = items.filter((item) => item.productId !== productId);
    writeCart(cookies, filtered);
  } else {
    existing.quantity = quantity;
    writeCart(cookies, items);
  }

  const cart = await getCartContext(cookies);
  return new Response(
    JSON.stringify({
      totalQuantity: cart.totalQuantity
    }),
    {
      status: 200,
      headers: { 'content-type': 'application/json' }
    }
  );
};

export const DELETE: APIRoute = async ({ request, cookies }) => {
  const body = await request.json().catch(() => null);
  const productId = body?.productId as string | undefined;

  if (!productId) {
    return INVALID_PAYLOAD;
  }

  const items = readCart(cookies).filter((item) => item.productId !== productId);
  writeCart(cookies, items);

  const cart = await getCartContext(cookies);
  return new Response(
    JSON.stringify({
      totalQuantity: cart.totalQuantity
    }),
    {
      status: 200,
      headers: { 'content-type': 'application/json' }
    }
  );
};
