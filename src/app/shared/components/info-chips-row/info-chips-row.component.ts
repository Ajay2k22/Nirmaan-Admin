import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular/lazy';

@Component({
  selector: 'app-info-chips-row',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: ` <div class="row">
    <div class="chip sev">
      <div class="t">SEVERITY <span class="dot"></span></div>
      <div class="b">
        <ion-icon name="warning-outline"></ion-icon> {{ severity || 'LOW' }}
      </div>
    </div>
    <div class="chip sta">
      <div class="t">STATUS <ion-icon name="sync-outline"></ion-icon></div>
      <div class="b">
        <ion-icon name="document-text-outline"></ion-icon>
        {{ status || 'PENDING' }}
      </div>
    </div>
    <div class="chip cat">
      <div class="t">CATEGORY <ion-icon name="apps-outline"></ion-icon></div>
      <div class="b">
        <ion-icon name="construct-outline"></ion-icon> {{ category || 'Other' }}
      </div>
    </div>
  </div>`,
  styles: [
    `
      .row {
        display: flex;
        gap: 8px;
      }
      .chip {
        flex: 1;
        border-radius: 10px;
        padding: 8px 10px;
        border: 1px solid;
      }
      .sev {
        background: #fef2f2;
        border-color: #fecaca;
        .b {
          color: #7f1d1d;
        }
      }
      .sta {
        background: #eff6ff;
        border-color: #bfdbfe;
        .b {
          color: #1e40af;
        }
      }
      .cat {
        background: #f8fafc;
        border-color: #e2e8f0;
        .b {
          color: #334155;
        }
      }
      .t {
        font-size: 8px;
        font-weight: 700;
        color: #9ca3af;
        display: flex;
        justify-content: space-between;
      }
      .dot {
        width: 6px;
        height: 6px;
        background: #dc2626;
        border-radius: 50%;
      }
      .b {
        font-size: 11px;
        font-weight: 700;
        margin-top: 4px;
        display: flex;
        gap: 4px;
        align-items: center;
        text-transform: capitalize;
      }
    `,
  ],
})
export class InfoChipsRowComponent {
  @Input() severity: string | undefined = 'LOW';
  @Input() status: string | undefined = 'PENDING';
  @Input() category: string | undefined = 'OTHER';
}
