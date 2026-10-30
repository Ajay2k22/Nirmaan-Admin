import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular/lazy';

@Component({
  selector: 'app-status-cards',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <div class="status-grid">
      <div class="card pending selected">
        <div class="top">
          <div class="icon-wrap orange">
            <ion-icon name="hourglass-outline"></ion-icon>
          </div>
          <ion-icon name="checkmark-circle-outline" class="check"></ion-icon>
        </div>
        <div class="num">{{ pending }}</div>
        <div class="label">Pending</div>
        <div class="sub">Requires review</div>
      </div>

      <!-- ✅ Removed when showInProgress=false -->
      <div class="card inprogress" *ngIf="showInProgress">
        <div class="top">
          <div class="icon-wrap blue">
            <ion-icon name="people-outline"></ion-icon>
          </div>
          <span class="dot"></span>
        </div>
        <div class="num">{{ inProgress }}</div>
        <div class="label">In-Progress</div>
        <div class="sub">Work crews active</div>
      </div>

      <div class="card approve">
        <div class="top">
          <div class="icon-wrap green">
            <ion-icon name="checkmark-outline"></ion-icon>
          </div>
        </div>
        <div class="num">{{ approve }}</div>
        <div class="label">Approve</div>
        <div class="sub">Resolved & closed</div>
      </div>

      <div class="card reject">
        <div class="top">
          <div class="icon-wrap red">
            <ion-icon name="close-outline"></ion-icon>
          </div>
        </div>
        <div class="num">{{ reject }}</div>
        <div class="label">Reject</div>
        <div class="sub">Duplicate / Invalid</div>
      </div>
    </div>
  `,
  styles: [
    `
      .status-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        padding: 12px 16px;
      }
      .card {
        background: #fff;
        border-radius: 16px;
        padding: 14px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        border: 2px solid transparent;
        &.selected {
          border-color: #1a56db;
        }
        &.pending {
          background: #fff8c5;
        }
        &.approve {
          background: #e6f9ed;
        }
        &.reject {
          background: #ffe8e8;
        }
        &.inprogress {
          background: #e8f0ff;
        }
      }
      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }
      .icon-wrap {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        &.orange {
          background: #ffe9b3;
        }
        &.green {
          background: #c8f5d6;
        }
        &.red {
          background: #ffc9c9;
        }
        &.blue {
          background: #dbe7ff;
        }
      }
      .num {
        font-size: 28px;
        font-weight: 800;
      }
      .label {
        font-size: 14px;
        font-weight: 700;
      }
      .sub {
        font-size: 11px;
        color: #6b7280;
      }
    `,
  ],
})
export class StatusCardsComponent {
  @Input() pending = 0;
  @Input() inProgress = 0;
  @Input() approve = 0;
  @Input() reject = 0;
  @Input() showInProgress = true; // ✅ false to hide
}
