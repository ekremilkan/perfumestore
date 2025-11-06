import { z } from 'zod';
import { p as prisma } from '../../../chunks/prisma_BXVFITCM.mjs';
import { g as getTenantId } from '../../../chunks/business_eBF7zugw.mjs';
import { g as getSession, i as isAdmin, a as applyAuthHeaders } from '../../../chunks/auth_CnDPFWXt.mjs';
export { renderers } from '../../../renderers.mjs';

const statusSchema = z.object({
  status: z.enum(["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"])
});
const PATCH = async ({ request, params }) => {
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
      headers: { "content-type": "application/json" }
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
    headers: { "content-type": "application/json" }
  });
  return applyAuthHeaders(response, sessionResult.headers);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  PATCH
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
