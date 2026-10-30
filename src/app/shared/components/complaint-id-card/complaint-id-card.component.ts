import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular/lazy';

@Component({
  selector: 'app-complaint-id-card',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: ` <div class="id-card">
    <div class="left">
      <div class="hash">#</div>
      <div class="txt">
        <div class="label">COMPLAINT ID</div>
        <div class="value">{{ shortId }}</div>
      </div>
      <ion-icon name="copy-outline" class="copy" (click)="copy()"></ion-icon>
    </div>
    <div class="right">
      <div class="label">
        <ion-icon name="time-outline"></ion-icon> REPORTED
      </div>
      <div class="date">{{ reportedAt | date: 'd MMM y, h:mm a' }}</div>
    </div>
  </div>`,
  styles: [
    `
      .id-card {
        background: #f8fafc;
        border: 1px solid #eef2f7;
        border-radius: 12px;
        padding: 10px 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .left {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .hash {
        width: 28px;
        height: 28px;
        background: #e0eaff;
        color: #1a56db;
        border-radius: 8px;
        display: grid;
        place-items: center;
        font-weight: 800;
        font-size: 13px;
      }
      .label {
        font-size: 9px;
        color: #9ca3af;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 3px;
        letter-spacing: 0.5px;
      }
      .value {
        font-size: 11px;
        font-weight: 800;
        color: #1a56db;
      }
      .copy {
        color: #9ca3af;
        font-size: 14px;
        cursor: pointer;
      }
      .right {
        text-align: right;
      }
      .date {
        font-size: 11px;
        font-weight: 700;
        color: #111827;
        margin-top: 2px;
      }
    `,
  ],
})
export class ComplaintIdCardComponent {
  @Input() complaintId = '';
  @Input() reportedAt: any;
  get shortId() {
    if (!this.complaintId) return 'CMP-2024-021';
    return `CMP-2024-${this.complaintId.substring(0, 3).toUpperCase()}`; // Figma format, no full UUID
  }
  copy() {
    navigator.clipboard.writeText(this.complaintId);
  }
}
