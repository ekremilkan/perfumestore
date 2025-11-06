import type { APIRoute } from 'astro';

import { prisma } from '../../../lib/prisma';
import { getTenantId } from '../../../lib/business';
import { applyAuthHeaders, getSession, isAdmin } from '../../../lib/auth';

export const GET: APIRoute = async ({ request }) => {
  const sessionResult = await getSession(request);
  const session = sessionResult.session;
  if (!session || !isAdmin(session.user)) {
    return new Response(null, { status: 401 });
  }

  const tenantId = await getTenantId();
  const orders = await prisma.order.findMany({
    where: { tenant_id: tenantId },
    orderBy: { createdAt: 'desc' },
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
      'content-type': 'application/json'
    }
  });

  return applyAuthHeaders(response, sessionResult.headers);
};
