import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthService,
  AdminLoginRequest,
} from '../../../../core/services/auth.services';
import { ToastService } from '../../../../core/services/toast.service';
import { SessionService } from '../../../../core/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  form = { mnc: '', dept: '', pwd: '' };
  loading = false;
  errorMsg = '';

  private TOKEN_KEY = 'nirmaan_admin_token';
  private LOGIN_TIME_KEY = 'login_time';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: ToastService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    private session: SessionService,
  ) {}

  async onLogin() {
    if (!this.form.mnc || !this.form.dept || !this.form.pwd) {
      this.toast.warning('Please fill all fields');
      return;
    }

    this.zone.run(() => {
      this.loading = true;
      this.errorMsg = '';
      this.cdr.detectChanges();
    });

    const payload: AdminLoginRequest = {
      MncCode: this.form.mnc.trim(),
      DeptCode: this.form.dept.trim(),
      Pwd: this.form.pwd.trim(),
    };

    this.authService.login(payload).subscribe({
      next: async (res) => {
        this.zone.run(() => {
          this.loading = false;
          this.cdr.detectChanges();
        });

        if (res.token) {
          // ✅ NEW LOGIC: Save token + current_time as login_time
          localStorage.setItem(this.TOKEN_KEY, res.token);
          localStorage.setItem(this.LOGIN_TIME_KEY, Date.now().toString());
          localStorage.setItem('nirmaan_mnc_code', this.form.mnc);
          localStorage.setItem('nirmaan_dept_code', this.form.dept);
          this.session.startWatching();

          this.toast.success(res.message || 'Admin login successful');
          setTimeout(() => {
            this.router.navigate(['/tabs/dashboard'], { replaceUrl: true });
          }, 800);
        } else {
          this.zone.run(() => {
            this.errorMsg = res.message || 'Invalid admin credentials';
            this.cdr.detectChanges();
          });
          this.toast.error(this.errorMsg);
        }
      },
      error: async (err) => {
        this.zone.run(() => {
          this.loading = false;
          const msg =
            err.error?.message || err.error?.msg || 'Invalid admin credentials';
          this.errorMsg = msg;
          this.cdr.detectChanges();
          this.toast.error(msg);
        });
      },
    });
  }

  goRegister() {
    this.router.navigate(['/register']);
  }
}
