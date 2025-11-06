import type { APIRoute } from 'astro';
import { z } from 'zod';

import { prisma } from '../../../lib/prisma';
import { getTenantId } from '../../../lib/business';
import { applyAuthHeaders, getSession, isAdmin } from '../../../lib/auth';

const statusSchema = z.object({
  status: z.enum(['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'])
});

export const PATCH: APIRoute = async ({ request, params }) => {
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
  const parsed = statusSchema.safeParse(payload);
  if (!parsed.success) {
    return new Response(JSON.stringify({ errors: parsed.error.flatten() }), {
      status: 400,
      headers: { 'content-type': 'application/json' }
    });
  }

  const tenantId = await getTenantId();
  const existing = await prisma.order.findFirst({
    where: { id, tenant_id: tenantId }
  });

  if (!existing) {
    return new Response(null, { status: 404 });
  }

  const updated = await prisma.order.update({
    where: { id },
    data: { status: parsed.data.status }
  });

  const response = new Response(JSON.stringify(updated), {
    status: 200,
    headers: { 'content-type': 'application/json' }
  });

  return applyAuthHeaders(response, sessionResult.headers);
};
