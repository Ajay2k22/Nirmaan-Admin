import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  show(
    message: string,
    type: 'success' | 'danger' | 'warning' = 'danger',
    duration = 3000,
  ) {
    document.querySelectorAll('.nirmaan-toast').forEach((el) => el.remove());
    const toast = document.createElement('div');
    toast.innerText = message;
    const bg =
      type === 'danger'
        ? '#dc2626'
        : type === 'success'
          ? '#16a34a'
          : '#d97706';
    toast.style.cssText = `
      position: fixed !important;
      bottom: 120px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      background: ${bg} !important;
      color: white !important;
      padding: 14px 22px !important;
      border-radius: 12px !important;
      font-size: 14px !important;
      font-weight: 500 !important;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3) !important;
      z-index: 999999 !important;
      max-width: 90% !important;
      width: 360px !important;
      text-align: center !important;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 200);
    }, duration);
  }
  success(msg: string) {
    this.show(msg, 'success');
  }
  error(msg: string) {
    this.show(msg, 'danger', 3000);
  }
  warning(msg: string) {
    this.show(msg, 'warning');
  }
}
