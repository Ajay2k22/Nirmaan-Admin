import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppInputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="input-card">
      <div class="left-icon">{{ iconLabel }}</div>
      <div class="field">
        <label>{{ label }}</label>
        <input
          [type]="inputType"
          [placeholder]="placeholder"
          [(ngModel)]="value"
          (ngModelChange)="onChange($event)"
        />
      </div>
      <div
        class="right-icon"
        (click)="togglePass()"
        *ngIf="type === 'password'"
      >
        {{ show ? '👁' : '🙈' }}
      </div>
    </div>
  `,
  styles: [
    `
      .input-card {
        display: flex;
        align-items: center;
        gap: 12px;
        background: #f1f5ff;
        border-radius: 14px;
        padding: 12px 14px;
        margin-bottom: 14px;
        border: 1px solid transparent;
      }
      .input-card:focus-within {
        border-color: #1a56db;
        background: #fff;
      }
      .left-icon {
        width: 24px;
        text-align: center;
        font-weight: 700;
        color: #64748b;
      }
      .field {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      label {
        font-size: 10px;
        font-weight: 700;
        color: #64748b;
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }
      input {
        border: none;
        background: transparent;
        font-weight: 700;
        font-size: 15px;
        outline: none;
        width: 100%;
        color: #1e293b;
        margin-top: 2px;
      }
      .right-icon {
        cursor: pointer;
      }
    `,
  ],
})
export class AppInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() icon = 'business-outline';
  @Input() rightIcon = '';
  value = '';
  inputType = 'text';
  show = false;
  iconLabel = '🏢';
  onChange: any = () => {};
  onTouched: any = () => {};
  ngOnInit() {
    this.inputType = this.type;
    this.iconLabel = this.icon.includes('lock')
      ? '🔒'
      : this.icon.includes('layers')
        ? '⧉'
        : '🏢';
  }
  togglePass() {
    if (this.type === 'password') {
      this.show = !this.show;
      this.inputType = this.show ? 'text' : 'password';
    }
  }
  writeValue(v: any) {
    this.value = v;
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
