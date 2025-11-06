import { p as prisma } from '../../chunks/prisma_BXVFITCM.mjs';
import { g as getTenantId } from '../../chunks/business_eBF7zugw.mjs';
import { g as getSession, i as isAdmin, a as applyAuthHeaders } from '../../chunks/auth_CnDPFWXt.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async ({ request }) => {
  const sessionResult = await getSession(request);
  const session = sessionResult.session;
  if (!session || !isAdmin(session.user)) {
    return new Response(null, { status: 401 });
  }
  const tenantId = await getTenantId();
  const orders = await prisma.order.findMany({
    where: { tenant_id: tenantId },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          product: {
            select: {
              name: true,
              image: true,
              price: true
            }
          }
        }
      },
      user: {
        select: {
          email: true,
          name: true
        }
      }
    }
  });
  const response = new Response(JSON.stringify(orders), {
    status: 200,
    headers: {
      "content-type": "application/json"
    }
  });
  return applyAuthHeaders(response, sessionResult.headers);
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
