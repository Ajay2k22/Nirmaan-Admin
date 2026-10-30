import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular/lazy'; // ✅ Fixed from /lazy
import { addIcons } from 'ionicons';
import { searchOutline, micOutline } from 'ionicons/icons';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  template: `
    <div class="search-wrap">
      <div class="search-box">
        <ion-icon name="search-outline" class="search-icon"></ion-icon>
        <input
          type="text"
          [placeholder]="placeholder"
          [(ngModel)]="searchText"
          (ngModelChange)="onSearchChange($event)"
        />
      </div>
    </div>
  `,
  styles: [
    `
      .search-wrap {
        padding: 0 16px 14px;
      }
      .search-box {
        display: flex;
        align-items: center;
        gap: 10px;
        background: #ffffff; /* ✅ White not grey */
        border: 1px solid #f0f0f0;
        border-radius: 14px;
        padding: 0 14px;
        height: 48px;

        /* ✅ SHADOW LIKE FIGMA CARD */
        box-shadow:
          0 8px 24px rgba(0, 0, 0, 0.06),
          0 2px 8px rgba(0, 0, 0, 0.04);

        .search-icon {
          font-size: 20px;
          color: #9ca3af;
          flex-shrink: 0;
        }
        input {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-size: 14px;
          font-weight: 400;
          color: #111827;
          &::placeholder {
            color: #9ca3af;
            font-size: 14px;
          }
        }
        .mic-icon {
          font-size: 20px;
          color: #6b7280;
          cursor: pointer;
          flex-shrink: 0;
        }
      }
    `,
  ],
})
export class SearchBarComponent {
  @Input() placeholder = 'Search by ID, keyword, or location...';
  @Input() searchText = '';
  @Output() searchChange = new EventEmitter<string>();
  @Output() voiceSearch = new EventEmitter<void>();

  constructor() {
    addIcons({ searchOutline, micOutline }); // ✅ Required in Ionic 8
  }

  onSearchChange(val: string) {
    this.searchChange.emit(val);
  }
}
