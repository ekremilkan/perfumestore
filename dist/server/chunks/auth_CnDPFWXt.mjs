import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { emailOTP } from 'better-auth/plugins/email-otp';
import { google } from 'better-auth/social-providers';
import { env } from 'node:process';
import { p as prisma } from './prisma_BXVFITCM.mjs';

const appName = env.BUSINESS_NAME ?? "PerfumeStore";
const baseURL = env.BUSINESS_DOMAIN ?? env.PUBLIC_SITE_URL ?? (void 0);
if (!env.AUTH_SECRET) {
  throw new Error(
    "[auth] Missing AUTH_SECRET. Please ensure it is defined in the environment."
  );
}
const prismaAdapterInstance = prismaAdapter(prisma, {
  provider: "postgresql"
});
const otpPlugin = emailOTP({
  sendVerificationOTP: async ({ email, otp, type }) => {
    console.info(`[BetterAuth][${type}] OTP for ${email}: ${otp}`);
  },
  otpLength: 6,
  expiresIn: 300,
  overrideDefaultEmailVerification: true
});
const googleClientId = env.AUTH_PROVIDER_GOOGLE_CLIENT_ID;
const googleClientSecret = env.AUTH_PROVIDER_GOOGLE_CLIENT_SECRET;
const socialProviders = googleClientId && googleClientSecret ? {
  google: google({
    clientId: googleClientId,
    clientSecret: googleClientSecret
  })
} : void 0;
const auth = betterAuth({
  appName,
  baseURL,
  secret: env.AUTH_SECRET,
  database: prismaAdapterInstance,
  socialProviders,
  plugins: [otpPlugin],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: () => "USER",
        fieldName: "role"
      },
      locale: {
        type: "string",
        defaultValue: () => env.DEFAULT_LANGUAGE ?? "en",
        fieldName: "locale"
      }
    }
  },
  session: {
    additionalFields: {
      ipAddress: {
        type: "string",
        fieldName: "ipAddress",
        required: false,
        input: false,
        returned: true
      },
      userAgent: {
        type: "string",
        fieldName: "userAgent",
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
          path: "/",
          sameSite: "lax",
          secure: true
        }
      }
    }
  }
});
async function getSession(request) {
  const result = await auth.api.getSession({
    headers: request.headers,
    asResponse: false,
    returnHeaders: true
  });
  if ("headers" in result) {
    const { headers, response } = result;
    return {
      session: response,
      headers
    };
  }
  return {
    session: result ?? null,
    headers: void 0
  };
}
function applyAuthHeaders(response, headers) {
  if (headers) {
    headers.forEach((value, key) => {
      response.headers.append(key, value);
    });
  }
  return response;
}
function isAdmin(user) {
  return user?.role === "ADMIN";
}
const handleAuthRequest = auth.handler;

export { applyAuthHeaders as a, getSession as g, handleAuthRequest as h, isAdmin as i };
