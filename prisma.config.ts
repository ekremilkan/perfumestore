import { defineConfig } from "prisma/config";
import dotenv from "dotenv";

// .env dosyasını yükle
dotenv.config();

const databaseUrl = process.env.DATABASE_URL ?? "file:../dev.db";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: databaseUrl,
  },
});
