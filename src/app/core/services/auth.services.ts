import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api-endpoints';

// --- Interfaces matching your API ---
export interface AdminRegisterRequest {
  MncCode: string;
  DeptCode: string;
  Pwd: string;
}

export interface AdminLoginRequest {
  MncCode: string;
  DeptCode: string;
  Pwd: string;
}

export interface AdminLoginResponse {
  statusCode: number;
  message: string;
  token: string;
  isCitizen: boolean;
  mnc_code: string;
  dept_code: string;
}

export interface BulkRegisterResponse {
  statusCode: number;
  message: string;
  data: {
    insertedCount: number;
    skippedCount: number;
    inserted: any[];
    skipped: { mncCode: string; deptCode: string; reason: string }[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'nirmaan_admin_token';
  private mncKey = 'nirmaan_mnc_code';
  private deptKey = 'nirmaan_dept_code';

  private isAuthSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isAuthSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // ✅ POST http://localhost:5077/api/Admin/register
  // Body: [ { MncCode, DeptCode, Pwd } ]
  register(admins: AdminRegisterRequest[]): Observable<BulkRegisterResponse> {
    return this.http.post<BulkRegisterResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      admins, // <-- send array directly
    );
  }

  // ✅ POST http://localhost:5077/api/Admin/login
  // Body: { MncCode, DeptCode, Pwd }
  login(payload: AdminLoginRequest): Observable<AdminLoginResponse> {
    return this.http
      .post<AdminLoginResponse>(API_ENDPOINTS.AUTH.LOGIN, payload)
      .pipe(
        tap((res) => {
          if (res.token) {
            localStorage.setItem(this.tokenKey, res.token);
            localStorage.setItem(this.mncKey, res.mnc_code);
            localStorage.setItem(this.deptKey, res.dept_code);
            this.isAuthSubject.next(true);
          }
        }),
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.mncKey);
    localStorage.removeItem(this.deptKey);
    this.isAuthSubject.next(false);
    this.router.navigateByUrl('/auth/login', { replaceUrl: true });
  }

  getMncCode(): string | null {
    return localStorage.getItem(this.mncKey);
  }

  getDeptCode(): string | null {
    return localStorage.getItem(this.deptKey);
  }
}
