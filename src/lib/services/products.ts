import type { Product } from '@prisma/client';

import { prisma } from '../prisma';
import { getTenantId } from '../business';

export async function listProducts() {
  const tenantId = await getTenantId();
  const products = await prisma.product.findMany({
    where: { tenant_id: tenantId },
    orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }]
  });
  return products;
}

export async function getProductById(id: string) {
  const tenantId = await getTenantId();
  const product = await prisma.product.findFirst({
    where: { id, tenant_id: tenantId }
  });
  return product;
}

export async function getProductBySlug(slug: string) {
  const tenantId = await getTenantId();
  const product = await prisma.product.findFirst({
    where: { slug, tenant_id: tenantId }
  });
  return product;
}

export async function getFeaturedProducts(limit = 6) {
  const tenantId = await getTenantId();
  const products = await prisma.product.findMany({
    where: {
      tenant_id: tenantId,
      isFeatured: true
    },
    take: limit,
    orderBy: { updatedAt: 'desc' }
  });

  if (products.length < limit) {
    const additional = await prisma.product.findMany({
      where: {
        tenant_id: tenantId,
        id: { notIn: products.map((item) => item.id) }
      },
      take: limit - products.length,
      orderBy: { updatedAt: 'desc' }
    });
    return [...products, ...additional];
  }

  return products;
}

export async function getRelatedProducts(productId: string, limit = 3) {
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
    orderBy: { updatedAt: 'desc' }
  });

  return related;
}

export function toProductPreview(product: Product) {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    isFeatured: product.isFeatured,
    category: product.category,
    slug: product.slug
  };
}
