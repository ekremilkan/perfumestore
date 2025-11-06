import { env } from 'node:process';
import { g as getSession, i as isAdmin, a as applyAuthHeaders } from './chunks/auth_CnDPFWXt.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_C0T1I5lw.mjs';
import './chunks/astro/server_DphMVhZR.mjs';
import 'clsx';
import 'cookie';
import { s as sequence } from './chunks/index_BWNQw2PL.mjs';

const ADMIN_PREFIX = "/admin";
const LOGIN_ROUTE = "/auth/login";
const onRequest$1 = async (context, next) => {
  const { session, headers } = await getSession(context.request);
  const defaultLocale = env.DEFAULT_LANGUAGE ?? "en";
  context.locals.auth = session;
  context.locals.user = session?.user ?? null;
  context.locals.locale = session?.user?.locale ?? context.url.searchParams.get("lang") ?? defaultLocale;
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

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
