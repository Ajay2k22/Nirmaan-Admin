import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular/lazy';

@Component({
  selector: 'app-inspection-notes-card',
  standalone: true,
  imports: [IonicModule],
  template: ` <div class="notes">
    <div class="h">
      <span class="blue"
        ><ion-icon name="clipboard-outline"></ion-icon> REASON FOR ACTION /
        INSPECTION NOTES</span
      ><span class="grey">Verified by PWD</span>
    </div>
    <div class="txt">{{ notes || 'Old and rusted' }}</div>
  </div>`,
  styles: [
    `
      .notes {
        background: #f0f7ff;
        border: 1px solid #dbeafe;
        border-radius: 12px;
        padding: 12px;
      }
      .h {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        .blue {
          font-size: 10px;
          font-weight: 700;
          color: #1a56db;
          display: flex;
          gap: 4px;
        }
        .grey {
          font-size: 10px;
          color: #6b7280;
        }
      }
      .txt {
        font-size: 12px;
        color: #334155;
        line-height: 1.6;
      }
    `,
  ],
})
export class InspectionNotesCardComponent {
  @Input() notes = '';
}
