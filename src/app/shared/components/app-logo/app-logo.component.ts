app - logo.component.ts;
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [IonicModule],
  template: `
    <div class="logo-container">
      <div class="nm-box">NM</div>
      <div class="title-row">
        <h1>{{ title }}</h1>
        <span class="ver">v2.4</span>
      </div>
      <div class="portal-chip">
        <div class="dot"></div>
        Citizen Service Portal
      </div>
    </div>
  `,
  styles: [
    `
      .logo-container {
        text-align: center;
        padding: 8px 0 16px;
      }
      .nm-box {
        width: 64px;
        height: 64px;
        margin: 0 auto 12px;
        background: #1a56db;
        color: #fff;
        font-weight: 800;
        font-size: 24px;
        display: grid;
        place-items: center;
        border-radius: 16px;
        box-shadow: 0 10px 20px rgba(26, 86, 219, 0.3);
      }
      .title-row {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
      }
      h1 {
        margin: 0;
        font-size: 28px;
        font-weight: 800;
        letter-spacing: -0.5px;
      }
      .ver {
        background: #e8eeff;
        color: #1a56db;
        font-size: 12px;
        font-weight: 700;
        padding: 2px 8px;
        border-radius: 20px;
      }
      .portal-chip {
        margin: 8px auto 0;
        background: #f1f5ff;
        color: #64748b;
        font-size: 12px;
        font-weight: 600;
        padding: 6px 14px;
        border-radius: 20px;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .dot {
        width: 8px;
        height: 8px;
        background: #1a56db;
        border-radius: 50%;
      }
    `,
  ],
})
export class AppLogoComponent {
  @Input() title = 'Nirmaan';
}
