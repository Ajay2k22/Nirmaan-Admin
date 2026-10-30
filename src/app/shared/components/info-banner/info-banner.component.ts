// src/app/shared/components/info-banner/info-banner.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular/lazy';

@Component({
  selector: 'app-info-banner',
  standalone: true,
  imports: [IonicModule],
  template: `
    <div class="banner">
      <div class="left">
        <div class="icon"><ion-icon name="location-outline"></ion-icon></div>
        <div>
          <strong>{{ title }}</strong>
          <span>{{ subtitle }}</span>
        </div>
      </div>
      <ion-button size="small" class="report-btn" (click)="report.emit()">{{
        buttonText
      }}</ion-button>
    </div>
  `,
  styles: [
    `
      .banner {
        margin: 16px;
        background: #e8f0ff;
        border-radius: 16px;
        padding: 12px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .left {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .icon {
        width: 36px;
        height: 36px;
        background: #fff;
        border-radius: 50%;
        display: grid;
        place-items: center;
        color: #1a56db;
        font-size: 18px;
      }
      strong {
        display: block;
        font-size: 13px;
        color: #000;
        font-weight: 700;
      }
      span {
        font-size: 11px;
        color: #6b7280;
      }
      .report-btn {
        --background: #1a56db;
        --border-radius: 10px;
        font-size: 12px;
        height: 32px;
        --color: #fff;
      }
    `,
  ],
})
export class InfoBannerComponent {
  @Input() title = 'Spotted a new road defect?';
  @Input() subtitle = 'Instant GPS auto-detection active';
  @Input() buttonText = 'Report';
  @Output() report = new EventEmitter<void>();
}
