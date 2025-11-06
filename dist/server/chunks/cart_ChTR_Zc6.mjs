import { p as prisma } from './prisma_BXVFITCM.mjs';
import { g as getTenantId } from './business_eBF7zugw.mjs';

async function listProducts() {
  const tenantId = await getTenantId();
  const products = await prisma.product.findMany({
    where: { tenant_id: tenantId },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }]
  });
  return products;
}
async function getProductById(id) {
  const tenantId = await getTenantId();
  const product = await prisma.product.findFirst({
    where: { id, tenant_id: tenantId }
  });
  return product;
}
async function getProductBySlug(slug) {
  const tenantId = await getTenantId();
  const product = await prisma.product.findFirst({
    where: { slug, tenant_id: tenantId }
  });
  return product;
}
async function getRelatedProducts(productId, limit = 3) {
  const tenantId = await getTenantId();
  const product = await prisma.product.findFirst({
    where: { id: productId, tenant_id: tenantId },
    select: { category: true }
  });
  if (!product?.category) {
    return [];
  }
  const related = await prisma.product.findMany({
    where: {
      tenant_id: tenantId,
      category: product.category,
      id: { not: productId }
    },
    take: limit,
    orderBy: { updatedAt: "desc" }
  });
  return related;
}

const CART_COOKIE_NAME = "perfume_cart";
function parseCartCookie(value) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (item) => typeof item?.productId === "string" && typeof item?.quantity === "number" && item.quantity > 0
      );
    }
    return [];
  } catch {
    return [];
  }
}
function readCart(cookies) {
  const cookie = cookies.get(CART_COOKIE_NAME)?.value;
  return parseCartCookie(cookie);
}
function writeCart(cookies, items) {
  cookies.set(CART_COOKIE_NAME, JSON.stringify(items), {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: true,
    maxAge: 60 * 60 * 24 * 30
    // 30 days
  });
}
async function getCartLines(cookies) {
  const items = readCart(cookies);
  if (!items.length) return [];
  const lines = [];
  for (const item of items) {
    const product = await getProductById(item.productId);
    if (!product) continue;
    const quantity = item.quantity;
    const subtotal = Number(product.price) * quantity;
    lines.push({ product, quantity, subtotal });
  }
  return lines;
}
async function getCartContext(cookies) {
  const lines = await getCartLines(cookies);
  const subtotal = lines.reduce((sum, line) => sum + line.subtotal, 0);
  const totalQuantity = lines.reduce((sum, line) => sum + line.quantity, 0);
  return {
    lines,
    subtotal,
    totalQuantity
  };
}

export { getProductById as a, getProductBySlug as b, getRelatedProducts as c, getCartContext as g, listProducts as l, readCart as r, writeCart as w };
