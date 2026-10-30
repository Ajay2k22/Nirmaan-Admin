import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { ToastController } from '@ionic/angular'; // ✅ CHANGED: Removed
import { ToastService } from '../../../../core/services/toast.service';
import {
  AuthService,
  AdminRegisterRequest,
} from '../../../../core/services/auth.services';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  form = {
    mnc: 'Ambernath (MC)',
    dept: 'ROADS & HIGHWAYS',
    designation: 'Junior Engineer / Site Supervisor',
    passkey: 'Nirmaan@1212',
    agree: true,
  };
  show = false;
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    // private toastCtrl: ToastController, // ✅ CHANGED: Removed
    private toast: ToastService, // ✅ CHANGED: Only ToastService
  ) {}

  private mapToCodes() {
    let mncCode = this.form.mnc;
    let deptCode = this.form.dept;

    if (mncCode.includes('Ambernath')) mncCode = 'Ambernath';
    if (mncCode.includes('ULS')) mncCode = 'ULS';

    if (deptCode.toUpperCase().includes('ROAD')) deptCode = 'ROADS';
    if (deptCode.toUpperCase().includes('WATER')) deptCode = 'WATER';
    if (deptCode.toUpperCase().includes('ULS')) deptCode = deptCode;

    return { mncCode, deptCode };
  }

  async onRegister() {
    if (!this.form.agree) {
      this.toast.warning('Please accept terms'); // ✅ CHANGED: was showToast
      return;
    }

    if (!this.form.mnc || !this.form.dept || !this.form.passkey) {
      this.toast.warning('Fill all required fields'); // ✅ CHANGED
      return;
    }

    this.loading = true;
    const { mncCode, deptCode } = this.mapToCodes();

    const payload: AdminRegisterRequest = {
      MncCode: mncCode,
      DeptCode: deptCode,
      Pwd: this.form.passkey.trim(),
    };

    this.authService.register([payload]).subscribe({
      next: async (res) => {
        this.loading = false;
        console.log('Register response:', res);

        if (res.data?.insertedCount > 0) {
          this.loading = false;
          this.toast.success('Registration successful! Please login'); // ✅ CHANGED
          setTimeout(() => {
            // ✅ CHANGED: Added delay for toast visibility
            this.router.navigateByUrl('/login', { replaceUrl: true });
          }, 800);
        } else if (res.data?.skippedCount > 0) {
          this.loading = false;
          const reason = res.data.skipped[0]?.reason || 'Already exists';
          this.toast.warning(`Skipped: ${reason}`); // ✅ CHANGED
          if (reason.includes('Already exists')) {
            setTimeout(() => {
              // ✅ CHANGED: Added delay
              this.router.navigateByUrl('/auth/login');
            }, 800);
          }
        } else {
          this.toast.success(res.message); // ✅ CHANGED
        }
      },
      error: async (err) => {
        this.loading = false;
        console.error('Register error:', err);
        const msg = err.error?.message || 'Registration failed';
        this.toast.error(msg); // ✅ CHANGED: was showToast
      },
    });
  }

  goLogin() {
    this.router.navigateByUrl('/login');
  }

  // ✅ CHANGED: Removed entire showToast() method - now using ToastService
}
