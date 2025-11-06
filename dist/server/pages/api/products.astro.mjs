import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { p as prisma } from '../../chunks/prisma_BXVFITCM.mjs';
import { g as getTenantId } from '../../chunks/business_eBF7zugw.mjs';
import { g as getSession, i as isAdmin, a as applyAuthHeaders } from '../../chunks/auth_CnDPFWXt.mjs';
export { renderers } from '../../renderers.mjs';

const productPayload = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().nullable().optional(),
  price: z.union([z.number(), z.string()]).transform((value) => Number(value)),
  stock: z.union([z.number(), z.string()]).transform((value) => Number(value)).default(0),
  category: z.string().nullable().optional(),
  image: z.string().url().nullable().optional(),
  isFeatured: z.boolean().optional()
});
const GET = async ({ request }) => {
  const sessionResult = await getSession(request);
  const session = sessionResult.session;
  if (!session || !isAdmin(session.user)) {
    return new Response(null, { status: 401 });
  }
  const tenantId = await getTenantId();
  const products = await prisma.product.findMany({
    where: { tenant_id: tenantId },
    orderBy: { updatedAt: "desc" }
  });
  const response = new Response(JSON.stringify(products), {
    status: 200,
    headers: {
      "content-type": "application/json"
    }
  });
  return applyAuthHeaders(response, sessionResult.headers);
};
const POST = async ({ request }) => {
  const sessionResult = await getSession(request);
  const session = sessionResult.session;
  if (!session || !isAdmin(session.user)) {
    return new Response(null, { status: 401 });
  }
  const payload = await request.json().catch(() => null);
  const parsed = productPayload.safeParse(payload);
  if (!parsed.success) {
    return new Response(JSON.stringify({ errors: parsed.error.flatten() }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
  const data = parsed.data;
  if (Number.isNaN(data.price) || Number.isNaN(data.stock)) {
    return new Response(null, { status: 400 });
  }
  const tenantId = await getTenantId();
  try {
    const product = await prisma.product.create({
      data: {
        tenant_id: tenantId,
        name: data.name,
        slug: data.slug,
        description: data.description ?? null,
        price: data.price,
        stock: data.stock,
        category: data.category ?? null,
        image: data.image ?? null,
        isFeatured: data.isFeatured ?? false
      }
    });
    const response = new Response(JSON.stringify(product), {
      status: 201,
      headers: { "content-type": "application/json" }
    });
    return applyAuthHeaders(response, sessionResult.headers);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return new Response(JSON.stringify({ error: "duplicate" }), {
        status: 409,
        headers: { "content-type": "application/json" }
      });
    }
    console.error("[products] Failed to create product", error);
    return new Response(null, { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
