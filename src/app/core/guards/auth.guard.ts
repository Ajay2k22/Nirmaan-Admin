import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

const TOKEN_KEY = 'nirmaan_admin_token';
const LOGIN_TIME_KEY = 'login_time';
const EXPIRY_MINUTES = 8;
const EXPIRY_MS = EXPIRY_MINUTES * 60 * 1000;

const PUBLIC_ROUTES = ['/login', '/register'];
const DEFAULT_AUTH_ROUTE = '/tabs/dashboard';
const DEFAULT_PUBLIC_ROUTE = '/login';

function isPublicRoute(url: string): boolean {
  return PUBLIC_ROUTES.some((r) => url.includes(r));
}

function clearStorage() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(LOGIN_TIME_KEY);
  localStorage.removeItem('nirmaan_mnc_code');
  localStorage.removeItem('nirmaan_dept_code');
  localStorage.removeItem('nirmaan_admin_token');
  // clear legacy keys if any
  localStorage.removeItem('token');
}

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const url = state.url;

  const token = localStorage.getItem(TOKEN_KEY);
  const loginTimeStr = localStorage.getItem(LOGIN_TIME_KEY);

  // CASE A: No token or no login_time -> Not logged in
  if (!token || !loginTimeStr) {
    if (isPublicRoute(url)) {
      return true; // allow login/register
    }
    router.navigateByUrl(DEFAULT_PUBLIC_ROUTE, { replaceUrl: true });
    return false;
  }

  // CASE B: Token exists, check expiry
  const loginTime = parseInt(loginTimeStr, 10);
  const now = Date.now();
  const diff = now - loginTime;

  if (isNaN(loginTime) || diff > EXPIRY_MS) {
    // Expired > 8 minutes
    clearStorage();
    if (isPublicRoute(url)) {
      return true; // allow login/register after expiry
    }
    router.navigateByUrl(DEFAULT_PUBLIC_ROUTE, { replaceUrl: true });
    return false;
  }

  // CASE C: Token valid (<8 min)
  if (isPublicRoute(url)) {
    // Already logged in, cannot go back to login/register
    router.navigateByUrl(DEFAULT_AUTH_ROUTE, { replaceUrl: true });
    return false;
  }

  // Valid user can access all protected routes
  return true;
};
