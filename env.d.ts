/// <reference types="astro/client" />

import type { AuthUser, AuthSession } from './src/lib/auth';

declare namespace App {
  interface Locals {
    auth: {
      user: AuthUser;
      session: AuthSession;
    } | null;
    user: AuthUser | null;
    locale: string;
  }
}