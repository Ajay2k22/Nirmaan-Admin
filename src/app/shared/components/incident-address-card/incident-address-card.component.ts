import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular/lazy';

@Component({
  selector: 'app-incident-address-card',
  standalone: true,
  imports: [IonicModule],
  template: ` <div class="addr">
    <div class="pin"><ion-icon name="location-outline"></ion-icon></div>
    <div class="mid">
      <div class="lab">INCIDENT SITE ADDRESS</div>
      <div class="a">Station Road, Ambernath West</div>
      <div class="s">(Opp. Municipal High School, Near Bus Stand #4)</div>
    </div>
    <div class="dist"><ion-icon name="navigate-outline"></ion-icon> 1.2 km</div>
  </div>`,
  styles: [
    `
      .addr {
        display: flex;
        gap: 10px;
        align-items: flex-start;
        background: #fff;
        border: 1px solid #f1f5f9;
        border-radius: 12px;
        padding: 10px;
      }
      .pin {
        width: 32px;
        height: 32px;
        background: #eff6ff;
        color: #1a56db;
        border-radius: 50%;
        display: grid;
        place-items: center;
        flex-shrink: 0;
      }
      .mid {
        flex: 1;
      }
      .lab {
        font-size: 9px;
        font-weight: 700;
        color: #9ca3af;
      }
      .a {
        font-size: 13px;
        font-weight: 700;
        color: #111827;
      }
      .s {
        font-size: 11px;
        color: #6b7280;
      }
      .dist {
        background: #eff6ff;
        color: #1a56db;
        font-size: 11px;
        font-weight: 700;
        padding: 6px 10px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        gap: 4px;
      }
    `,
  ],
})
export class IncidentAddressCardComponent {}
