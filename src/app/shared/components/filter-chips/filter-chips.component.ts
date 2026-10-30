import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular/lazy'; // ✅ Fixed from /lazy

export interface FilterChip {
  key: string;
  label: string;
  count?: number;
}

@Component({
  selector: 'app-filter-chips',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <div class="chips-scroll">
      <div
        class="chip"
        *ngFor="let chip of chips"
        [class.active]="selectedKey === chip.key"
        (click)="onChipClick(chip.key)"
      >
        {{ chip.label }}
        <span
          *ngIf="chip.count !== undefined"
          class="count"
          [class.active-count]="selectedKey === chip.key"
        >
          {{ chip.count }}
        </span>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        --nirmaan-primary: #1a56db;
        --nirmaan-primary-light: #e0eaff;
      }
      .chips-scroll {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding: 0 16px 14px;
        &::-webkit-scrollbar {
          display: none;
        }
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .chip {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        gap: 6px;
        background: #f1f5f9;
        color: #64748b;
        border: 1px solid #e2e8f0;
        padding: 7px 14px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        white-space: nowrap;
        transition: all 0.2s ease;

        &.active {
          background: var(--nirmaan-primary);
          color: #fff;
          border-color: var(--nirmaan-primary);
          box-shadow: 0 4px 12px rgba(26, 86, 219, 0.3); /* ✅ primary shadow */
        }

        .count {
          background: #fff;
          color: var(--nirmaan-primary); /* ✅ ICON/COUNT COLOR = PRIMARY */
          font-size: 11px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 10px;
          min-width: 20px;
          text-align: center;
          line-height: 1.2;

          &.active-count {
            background: rgba(255, 255, 255, 0.25);
            color: #fff;
          }
        }
      }
    `,
  ],
})
export class FilterChipsComponent {
  @Input() chips: FilterChip[] = [];
  @Input() selectedKey = 'ALL';
  @Output() filterChange = new EventEmitter<string>();

  onChipClick(key: string) {
    this.selectedKey = key;
    this.filterChange.emit(key);
  }
}
