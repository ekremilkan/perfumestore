import { betterAuth, type InferSession, type InferUser } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { emailOTP } from 'better-auth/plugins/email-otp';
import { google } from 'better-auth/social-providers';
import { env as processEnv } from 'node:process';

import { prisma } from './prisma';

const appName = processEnv.BUSINESS_NAME ?? 'PerfumeStore';
const baseURL =
  processEnv.BUSINESS_DOMAIN ??
  processEnv.PUBLIC_SITE_URL ??
  (import.meta.env.DEV ? 'http://localhost:4321' : undefined);

if (!processEnv.AUTH_SECRET) {
  throw new Error(
    '[auth] Missing AUTH_SECRET. Please ensure it is defined in the environment.'
  );
}

const prismaAdapterInstance = prismaAdapter(prisma, {
  provider: 'postgresql'
});

const otpPlugin = emailOTP({
  sendVerificationOTP: async ({ email, otp, type }) => {
    console.info(`[BetterAuth][${type}] OTP for ${email}: ${otp}`);
  },
  otpLength: 6,
  expiresIn: 300,
  overrideDefaultEmailVerification: true
});

const googleClientId = processEnv.AUTH_PROVIDER_GOOGLE_CLIENT_ID;
const googleClientSecret = processEnv.AUTH_PROVIDER_GOOGLE_CLIENT_SECRET;

const socialProviders =
  googleClientId && googleClientSecret
    ? {
        google: google({
          clientId: googleClientId,
          clientSecret: googleClientSecret
        })
      }
    : undefined;

export const auth = betterAuth({
  appName,
  baseURL,
  secret: processEnv.AUTH_SECRET,
  database: prismaAdapterInstance,
  socialProviders: socialProviders as any,
  plugins: [otpPlugin],
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: () => 'USER',
        fieldName: 'role'
      },
      locale: {
        type: 'string',
        defaultValue: () => processEnv.DEFAULT_LANGUAGE ?? 'en',
        fieldName: 'locale'
      }
    }
  },
  session: {
    additionalFields: {
      ipAddress: {
        type: 'string',
        fieldName: 'ipAddress',
        required: false,
        input: false,
        returned: true
      },
      userAgent: {
        type: 'string',
        fieldName: 'userAgent',
        required: false,
        input: false,
        returned: true
      }
    }
  },
  advanced: {
    cookies: {
      sessionToken: {
        attributes: {
          path: '/',
          sameSite: 'lax',
          secure: !import.meta.env.DEV
        }
      }
    }
  }
});

export type AuthUser = InferUser<typeof auth> & {
  role: 'USER' | 'ADMIN';
  locale: string;
};
export type AuthSession = InferSession<typeof auth>;

export type SessionContext = {
  user: AuthUser;
  session: AuthSession;
} | null;

export async function getSession(request: Request) {
  const result = await auth.api.getSession({
    headers: request.headers,
    asResponse: false,
    returnHeaders: true
  });

  if ('headers' in (result as Record<string, unknown>)) {
    const { headers, response } = result as {
      headers: Headers;
      response: SessionContext;
    };
    return {
      session: response as SessionContext,
      headers
    };
  }

  return {
    session: (result as unknown as SessionContext) ?? null,
    headers: undefined
  };
}

export function applyAuthHeaders(response: Response, headers?: Headers) {
  if (headers) {
    headers.forEach((value, key) => {
      response.headers.append(key, value);
    });
  }
  return response;
}

export function isAdmin(user: AuthUser | null | undefined) {
  return user?.role === 'ADMIN';
}

export const handleAuthRequest = auth.handler;
