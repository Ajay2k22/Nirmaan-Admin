import { Component, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular/lazy';
import { addIcons } from 'ionicons';
import { closeCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-action-desk',
  standalone: true,
  imports: [IonicModule],
  template: ` <div class="desk">
    <button class="rej" (click)="reject.emit()">
      <ion-icon name="close-circle-outline"></ion-icon> Reject
    </button>
    <button class="app" (click)="approve.emit()">
      <ion-icon name="checkmark-circle-outline"></ion-icon> Approve & Resolve
    </button>
  </div>`,
  styles: [
    `
      .desk {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        max-width: 440px;
        margin: 0 auto;
        background: #fff;
        border-top: 1px solid #eef2f7;
        padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
        display: flex;
        gap: 12px;
        z-index: 99999;
        box-shadow: 0 -8px 30px rgba(0, 0, 0, 0.08);
      }
      button {
        flex: 1;
        height: 46px;
        border-radius: 24px;
        font-weight: 700;
        font-size: 13px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      }
      .rej {
        background: #fff;
        color: #dc2626;
        border: 1.5px solid #fecaca;
      }
      .app {
        background: #1a56db;
        color: #fff;
        border: none;
        box-shadow: 0 6px 18px rgba(26, 86, 219, 0.35);
      }
    `,
  ],
})
export class ActionDeskComponent {
  @Output() reject = new EventEmitter<void>();
  @Output() approve = new EventEmitter<void>();

  constructor() {
    addIcons({ closeCircleOutline, checkmarkCircleOutline });
  }
}
