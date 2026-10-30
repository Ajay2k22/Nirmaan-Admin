import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular/lazy';

@Component({
  selector: 'app-complaint-card',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <div class="card" (click)="cardClick.emit(complaint)">
      <!-- Top Row -->
      <div class="top-row">
        <div class="left">
          <span class="cmp-id">#{{ getShortId() }}</span>
          <span class="dot">•</span>
          <span class="category">{{
            complaint.summary || 'Roads & Bridges'
          }}</span>
        </div>
        <div class="time">
          <ion-icon name="time-outline"></ion-icon>
          {{ getTimeAgo() }}
        </div>
      </div>

      <!-- Title -->
      <h3 class="title">{{ complaint.title }}</h3>

      <!-- Description -->
      <p class="desc">{{ complaint.description }}</p>

      <!-- Divider -->
      <div class="divider"></div>

      <!-- Bottom Pills -->
      <div class="bottom-row">
        <span
          class="pill status-pill"
          [ngClass]="(complaint.status || '').toLowerCase()"
        >
          <span class="dot"></span> {{ complaint.status }}
        </span>

        <span
          class="pill severity-pill"
          [ngClass]="(complaint.severity || '').toLowerCase()"
        >
          <span class="warn-icon">⚠</span> {{ complaint.severity }} Severity
        </span>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
        background: #ffffff;
        border-radius: 18px;
        padding: 16px 18px;
        box-shadow:
          0 8px 30px rgba(0, 0, 0, 0.06),
          0 2px 8px rgba(0, 0, 0, 0.04);
        border: 1px solid #f1f5f9;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .card:active {
        transform: scale(0.98);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
      }
      .top-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }
      .left {
        display: flex;
        align-items: center;
        gap: 6px;
        flex: 1;
        min-width: 0;
      }
      .cmp-id {
        font-size: 12px;
        font-weight: 800;
        color: #1a56db;
        white-space: nowrap;
      }
      .dot {
        font-size: 10px;
        color: #6b7280;
      }
      .category {
        font-size: 12px;
        color: #374151;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .time {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 11px;
        font-weight: 600;
        color: #111;
        background: #f8fafc;
        padding: 4px 8px;
        border-radius: 20px;
        flex-shrink: 0;
        ion-icon {
          font-size: 14px;
        }
      }
      .title {
        margin: 0 0 8px;
        font-size: 17px;
        font-weight: 800;
        color: #111827;
        line-height: 1.25;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .desc {
        margin: 0;
        font-size: 13px;
        color: #6b7280;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .divider {
        height: 1px;
        background: #f1f5f9;
        margin: 14px 0 12px;
      }
      .bottom-row {
        display: flex;
        gap: 8px;
        align-items: center;
        flex-wrap: wrap;
      }
      .pill {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.2px;
        .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: currentColor;
        }
        .warn-icon {
          font-size: 14px;
          line-height: 1;
        }
      }
      .status-pill {
        background: #eef2ff;
        color: #1e40af;
        &.pending {
          background: #fef3c7;
          color: #92400e;
        }
        &.in_progress,
        &.in-progress {
          background: #e0e7ff;
          color: #1e40af;
        }
        &.resolved {
          background: #dcfce7;
          color: #166534;
        }
        &.rejected {
          background: #fee2e2;
          color: #991b1b;
        }
      }
      .severity-pill {
        background: #fee2e2;
        color: #991b1b;
        &.high {
          background: #fee2e2;
          color: #991b1b;
        }
        &.medium {
          background: #fef3c7;
          color: #92400e;
        }
        &.low {
          background: #dcfce7;
          color: #166534;
        }
      }
    `,
  ],
})
export class ComplaintCardComponent {
  @Input() complaint: any;
  @Output() cardClick = new EventEmitter<any>();

  getShortId(): string {
    const id = this.complaint?.complaintId || '';
    if (!id) return 'AMC-2024-892';
    // Take first 8 chars like AMC-2024
    return id.substring(0, 12).toUpperCase();
  }

  getTimeAgo(): string {
    if (!this.complaint?.createdAt) return '12m ago';
    const created = new Date(this.complaint.createdAt);
    const now = new Date();
    const diffMs = now.getTime() - created.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 60) return `${diffMins || 1}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  }
}
