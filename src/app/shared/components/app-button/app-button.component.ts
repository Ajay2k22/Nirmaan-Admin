import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="'btn ' + variant"
      [disabled]="disabled || loading"
      (click)="clicked.emit()"
    >
      <span *ngIf="!loading">{{ label }}</span>
      <span *ngIf="loading" class="loader"></span>
      <span *ngIf="!loading">→</span>
    </button>
  `,
  styles: [
    `
      .btn {
        width: 100%;
        height: 48px;
        border: none;
        border-radius: 24px;
        font-weight: 700;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      }
      .btn:disabled {
        opacity: 0.5;
        pointer-events: none;
      }
      .primary {
        background: #1a56db;
        color: #fff;
        box-shadow: 0 8px 20px rgba(26, 86, 219, 0.35);
      }
      .danger {
        background: #fff;
        color: #dc2626;
        border: 1.5px solid #fecaca;
      }
      .red {
        background: #dc2626;
        color: #fff;
        box-shadow: 0 8px 20px rgba(220, 38, 38, 0.35);
      }
      .loader {
        width: 18px;
        height: 18px;
        border: 2px solid currentColor;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class AppButtonComponent {
  @Input() label = 'Login';
  @Input() loading = false;
  @Input() disabled = false; // ✅ ADDED
  @Input() variant: 'primary' | 'danger' | 'red' = 'primary';
  @Output() clicked = new EventEmitter<void>();
}
