import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private tokenKey = 'nirmaan_admin_token';

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(this.tokenKey);

    // Don't add token to login/register requests
    const isAuthUrl =
      req.url.includes('/Admin/login') || req.url.includes('/Admin/register');

    let authReq = req;

    if (token && !isAuthUrl) {
      // ✅ Add token to header - your backend expects it
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          // If your backend uses custom header, also add:
          // 'x-auth-token': token,
          // 'token': token
        },
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 - expired/invalid token
        if (error.status === 401 || error.status === 0) {
          const hadToken = !!token;
          const isApiCall = req.url.includes('/api/');

          // Only logout if we had token and it's API call (not login fail)
          if (hadToken && isApiCall && !isAuthUrl) {
            this.handleUnauthorized();
          }
        }
        return throwError(() => error);
      }),
    );
  }

  private async handleUnauthorized() {
    // Prevent multiple toasts
    if ((this as any).isHandling401) return;
    (this as any).isHandling401 = true;

    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('nirmaan_mnc_code');
    localStorage.removeItem('nirmaan_dept_code');

    const toast = await this.toastCtrl.create({
      message: 'Session expired. Please login again',
      duration: 2500,
      color: 'danger',
      position: 'bottom',
    });
    await toast.present();

    this.router.navigateByUrl('/auth/login', { replaceUrl: true });

    setTimeout(() => ((this as any).isHandling401 = false), 3000);
  }
}
