import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private TOKEN_KEY = 'nirmaan_admin_token';
  private LOGIN_TIME_KEY = 'login_time';
  private EXPIRY_MS = 8 * 60 * 1000;
  private intervalId: any;

  constructor(private router: Router) {}

  startWatching() {
    this.stopWatching();
    // Check every 30 sec
    this.intervalId = setInterval(() => this.checkExpiry(), 30 * 1000);
    // Also check when tab becomes active
    document.addEventListener('visibilitychange', this.onVisible);
  }

  stopWatching() {
    if (this.intervalId) clearInterval(this.intervalId);
    document.removeEventListener('visibilitychange', this.onVisible);
  }

  private onVisible = () => {
    if (!document.hidden) this.checkExpiry();
  };

  private checkExpiry() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const loginTimeStr = localStorage.getItem(this.LOGIN_TIME_KEY);
    if (!token || !loginTimeStr) return;

    const diff = Date.now() - parseInt(loginTimeStr, 10);
    if (diff > this.EXPIRY_MS) {
      this.logout();
    }
  }

  private logout() {
    this.stopWatching();
    localStorage.clear();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
