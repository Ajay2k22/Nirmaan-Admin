import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout.component';

@NgModule({
  declarations: [AuthLayoutComponent],
  imports: [CommonModule],
  exports: [AuthLayoutComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthLayoutModule {}
