import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular/lazy';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  imagesOutline,
  cameraOutline,
  shieldCheckmarkOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-work-verification-photos',
  standalone: true,
  imports: [IonicModule, CommonModule],
  template: ` <div class="wrap">
    <div class="head">
      <span
        ><ion-icon name="images-outline"></ion-icon> Work Verification &
        Photos</span
      >
      <span class="c">{{
        isResolvedOrRejected ? '2 Photos' : '1 Photo + Add'
      }}</span>
    </div>

    <div class="row">
      <!-- Citizen Photo -->
      <div class="box">
        <span class="tag t"
          ><ion-icon name="camera-outline"></ion-icon> Citizen Photo</span
        >
        <img [src]="safePhoto" (error)="onImgError($event, 'citizen')" />
        <span class="tag b r">ISSUE REPORTED</span>
      </div>

      <!-- IF RESOLVED/REJECTED -> show real proof -->
      <div class="box" *ngIf="isResolvedOrRejected; else addImgBlock">
        <span class="tag t"
          ><ion-icon name="shield-checkmark-outline"></ion-icon> Admin
          Proof</span
        >
        <img [src]="safeProof" (error)="onImgError($event, 'proof')" />
        <span class="tag b bl">WORK PROOF / REPAIRED</span>
      </div>

      <!-- ELSE -> Add Image Option -->
      <ng-template #addImgBlock>
        <div class="box add-box" (click)="triggerAdd()">
          <img *ngIf="previewUrl" [src]="previewUrl" />
          <div *ngIf="!previewUrl" class="add-inner">
            <ion-icon name="camera-outline"></ion-icon>
            <b>Add Image</b>
            <small>After repair</small>
          </div>
          <span *ngIf="previewUrl" class="tag t">New Proof</span>
          <span *ngIf="previewUrl" class="tag b bl">Tap to change</span>
        </div>
      </ng-template>
    </div>
  </div>`,
  styles: [
    `
      .wrap {
        background: #fff;
      }
      .head {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        font-weight: 800;
        margin-bottom: 10px;
        align-items: center;
        .c {
          font-size: 11px;
          color: #9ca3af;
          font-weight: 400;
        }
      }
      .row {
        display: flex;
        gap: 10px;
      }
      .box {
        flex: 1;
        position: relative;
        border-radius: 12px;
        overflow: hidden;
        height: 94px;
        background: #f3f4f6;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      }
      .tag {
        position: absolute;
        font-size: 8px;
        font-weight: 700;
        padding: 3px 7px;
        border-radius: 10px;
        color: #fff;
        left: 6px;
        display: flex;
        align-items: center;
        gap: 2px;
      }
      .t {
        top: 6px;
        background: rgba(0, 0, 0, 0.65);
      }
      .b {
        bottom: 6px;
      }
      .r {
        background: #dc2626;
      }
      .bl {
        background: #1a56db;
      }

      .add-box {
        border: 1.5px dashed #1a56db;
        background: #eff6ff;
        cursor: pointer;
        display: grid;
        place-items: center;
      }
      .add-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        color: #1a56db;
        ion-icon {
          font-size: 28px;
        }
        b {
          font-size: 11px;
        }
        small {
          font-size: 9px;
          color: #6b7280;
        }
      }
    `,
  ],
})
export class WorkVerificationPhotosComponent {
  @Input() photo: string | undefined | null = '';
  @Input() resolvedProof: string | undefined | null = '';
  @Input() previewUrl: string | null = null;
  @Input() status: string = ''; // ✅ PENDING / RESOLVED / REJECTED

  @Output() addImage = new EventEmitter<void>();

  private fallbackCitizen =
    'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=400';

  constructor() {
    addIcons({ imagesOutline, cameraOutline, shieldCheckmarkOutline });
  }

  get isResolvedOrRejected(): boolean {
    const s = this.status?.toUpperCase();
    return s === 'RESOLVED' || s === 'REJECTED';
  }

  get safePhoto(): string {
    if (!this.photo || this.photo.trim() === '') return this.fallbackCitizen;
    return this.photo;
  }

  // ✅ No fallback when PENDING - will go to addImgBlock
  get safeProof(): string {
    if (!this.resolvedProof || this.resolvedProof.trim() === '') return '';
    return this.resolvedProof;
  }

  onImgError(event: any, type: 'citizen' | 'proof') {
    if (type === 'citizen') event.target.src = this.fallbackCitizen;
  }

  triggerAdd() {
    if (!this.isResolvedOrRejected) {
      this.addImage.emit();
    }
  }
}
