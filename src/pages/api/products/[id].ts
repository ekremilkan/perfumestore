import type { APIRoute } from 'astro';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { prisma } from '../../../lib/prisma';
import { getTenantId } from '../../../lib/business';
import { applyAuthHeaders, getSession, isAdmin } from '../../../lib/auth';

const updateSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().nullable().optional(),
  price: z.union([z.number(), z.string()]).transform((value) => Number(value)),
  stock: z.union([z.number(), z.string()]).transform((value) => Number(value)).default(0),
  category: z.string().nullable().optional(),
  image: z.string().url().nullable().optional(),
  isFeatured: z.boolean().optional()
});

export const PUT: APIRoute = async ({ request, params }) => {
  const id = params.id;
  if (!id) {
    return new Response(null, { status: 400 });
  }

  const sessionResult = await getSession(request);
  const session = sessionResult.session;
  if (!session || !isAdmin(session.user)) {
    return new Response(null, { status: 401 });
  }

  const payload = await request.json().catch(() => null);
  const parsed = updateSchema.safeParse(payload);
  if (!parsed.success) {
    return new Response(JSON.stringify({ errors: parsed.error.flatten() }), {
      status: 400,
      headers: { 'content-type': 'application/json' }
    });
  }

  const data = parsed.data;
  if (Number.isNaN(data.price) || Number.isNaN(data.stock)) {
    return new Response(null, { status: 400 });
  }

  const tenantId = await getTenantId();
  const existing = await prisma.product.findFirst({
    where: { id, tenant_id: tenantId }
  });

  if (!existing) {
    return new Response(null, { status: 404 });
  }

  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
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
      status: 200,
      headers: { 'content-type': 'application/json' }
    });

    return applyAuthHeaders(response, sessionResult.headers);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return new Response(JSON.stringify({ error: 'duplicate' }), {
        status: 409,
        headers: { 'content-type': 'application/json' }
      });
    }
    console.error('[products] Failed to update product', error);
    return new Response(null, { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request, params }) => {
  const id = params.id;
  if (!id) {
    return new Response(null, { status: 400 });
  }

  const sessionResult = await getSession(request);
  const session = sessionResult.session;
  if (!session || !isAdmin(session.user)) {
    return new Response(null, { status: 401 });
  }

  const tenantId = await getTenantId();
  const existing = await prisma.product.findFirst({
    where: { id, tenant_id: tenantId }
  });

  if (!existing) {
    return new Response(null, { status: 404 });
  }

  await prisma.product.delete({ where: { id } });

  const response = new Response(null, { status: 204 });
  return applyAuthHeaders(response, sessionResult.headers);
};
