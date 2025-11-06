import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { env as processEnv } from 'node:process';

export interface BusinessTheme {
  primary: string;
  secondary: string;
  accent: string;
  muted: string;
  background: string;
  surface: string;
  headingFont: string;
  bodyFont: string;
}

export interface BusinessAssets {
  heroImageQuery: string;
  collectionImageQuery: string;
  fallbackHeroImage?: string;
}

export interface BusinessSeo {
  defaultTitle: string;
  defaultDescription: string;
}

export interface BusinessConfig {
  id: string;
  name: string;
  domain?: string;
  tenantId: string;
  theme: BusinessTheme;
  assets: BusinessAssets;
  seo: BusinessSeo;
}

let cachedConfig: BusinessConfig | null = null;

async function readConfigFile() {
  const configPathEnv = processEnv.BUSINESS_CONFIG_PATH;
  const activeBusiness = processEnv.ACTIVE_BUSINESS ?? 'perfume';
  const configPath =
    configPathEnv ?? `./config/businesses/${activeBusiness}.json`;
  const absolutePath = path.resolve(process.cwd(), configPath);
  try {
    const raw = await readFile(absolutePath, 'utf-8');
    const parsed = JSON.parse(raw) as BusinessConfig;
    return parsed;
  } catch (error) {
    console.error(
      `[business] Failed to load business configuration from ${absolutePath}`,
      error
    );
    throw new Error(
      'Business configuration is missing or invalid. Please verify BUSINESS_CONFIG_PATH.'
    );
  }
}

export async function getBusinessConfig() {
  if (cachedConfig) {
    return cachedConfig;
  }
  const config = await readConfigFile();
  cachedConfig = config;
  return config;
}

export async function getBusinessTheme() {
  const config = await getBusinessConfig();
  return config.theme;
}

export async function getBusinessSeo() {
  const config = await getBusinessConfig();
  return config.seo;
}

export async function getTenantId() {
  const config = await getBusinessConfig();
  return config.tenantId;
}
