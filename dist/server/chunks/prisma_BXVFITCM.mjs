import { PrismaClient } from '@prisma/client';

const prismaClient = globalThis.prisma ?? new PrismaClient();
const prisma = prismaClient;

export { prisma as p };
