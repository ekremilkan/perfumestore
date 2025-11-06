/// <reference path="../env.d.ts" />

import type { MiddlewareHandler } from 'astro';
import { env as processEnv } from 'node:process';

import { applyAuthHeaders, getSession, isAdmin } from './lib/auth';

const ADMIN_PREFIX = '/admin';
const LOGIN_ROUTE = '/auth/login';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { session, headers } = await getSession(context.request);
  const defaultLocale = processEnv.DEFAULT_LANGUAGE ?? 'en';

  context.locals.auth = session;
  context.locals.user = session?.user ?? null;
  context.locals.locale =
    session?.user?.locale ?? context.url.searchParams.get('lang') ?? defaultLocale;

  if (context.url.pathname.startsWith(ADMIN_PREFIX)) {
    const user = session?.user ?? null;
    if (!user || !isAdmin(user)) {
      const redirectResponse = context.redirect(LOGIN_ROUTE);
      return applyAuthHeaders(redirectResponse, headers);
    }
  }

  const response = await next();
  return applyAuthHeaders(response, headers);
};
