import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prismaClient = globalThis.prisma ?? new PrismaClient();

if (import.meta.env.DEV) {
  globalThis.prisma = prismaClient;
}

export const prisma = prismaClient;
