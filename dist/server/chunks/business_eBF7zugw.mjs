import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { env } from 'node:process';

let cachedConfig = null;
async function readConfigFile() {
  const configPathEnv = env.BUSINESS_CONFIG_PATH;
  const activeBusiness = env.ACTIVE_BUSINESS ?? "perfume";
  const configPath = configPathEnv ?? `./config/businesses/${activeBusiness}.json`;
  const absolutePath = path.resolve(process.cwd(), configPath);
  try {
    const raw = await readFile(absolutePath, "utf-8");
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (error) {
    console.error(
      `[business] Failed to load business configuration from ${absolutePath}`,
      error
    );
    throw new Error(
      "Business configuration is missing or invalid. Please verify BUSINESS_CONFIG_PATH."
    );
  }
}
async function getBusinessConfig() {
  if (cachedConfig) {
    return cachedConfig;
  }
  const config = await readConfigFile();
  cachedConfig = config;
  return config;
}
async function getTenantId() {
  const config = await getBusinessConfig();
  return config.tenantId;
}

export { getBusinessConfig as a, getTenantId as g };
