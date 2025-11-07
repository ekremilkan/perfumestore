import { PrismaBetterSQLite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaClient } from '../../generated/prisma/client';
import {config} from 'dotenv'

config();

const adapter = new PrismaBetterSQLite3({
  url: process.env.DATABASE_URL ?? 'file:dev.db'
});
export const prisma = new PrismaClient({ adapter });