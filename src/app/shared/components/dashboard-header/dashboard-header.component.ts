// src/app/shared/components/dashboard-header/dashboard-header.component.ts
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular/lazy';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [IonicModule],
  template: `
    <div class="header-wrap">
      <div class="left">
        <div class="nm-box">NM</div>
        <div class="text">
          <h2>{{ title }}</h2>
          <span>{{ subtitle }}</span>
        </div>
      </div>

    </div>
  `,
  styles: [
    `
      .header-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background: #fff;
      }
      .left {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .nm-box {
        width: 38px;
        height: 38px;
        background: #1a56db;
        color: #fff;
        font-weight: 800;
        font-size: 14px;
        display: grid;
        place-items: center;
        border-radius: 10px;
      }
      h2 {
        margin: 0;
        font-size: 16px;
        font-weight: 800;
        color: #000;
      }
      span {
        font-size: 11px;
        font-weight: 700;
        color: #6b7280;
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }
      .menu-btn {
        --color: #000;
      }
    `,
  ],
})
export class DashboardHeaderComponent {
  @Input() title = 'Nirmaan';
  @Input() subtitle = 'Ambernath - ROADS';
}
