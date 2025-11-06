import { g as getCartContext, a as getProductById, r as readCart, w as writeCart } from '../../chunks/cart_ChTR_Zc6.mjs';
export { renderers } from '../../renderers.mjs';

const INVALID_PAYLOAD = new Response(null, { status: 400 });
const GET = async ({ cookies }) => {
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
        "content-type": "application/json"
      }
    }
  );
};
const POST = async ({ request, cookies }) => {
  const body = await request.json().catch(() => null);
  const productId = body?.productId;
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
      headers: { "content-type": "application/json" }
    }
  );
};
const PATCH = async ({ request, cookies }) => {
  const body = await request.json().catch(() => null);
  const productId = body?.productId;
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
      headers: { "content-type": "application/json" }
    }
  );
};
const DELETE = async ({ request, cookies }) => {
  const body = await request.json().catch(() => null);
  const productId = body?.productId;
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
      headers: { "content-type": "application/json" }
    }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  GET,
  PATCH,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
