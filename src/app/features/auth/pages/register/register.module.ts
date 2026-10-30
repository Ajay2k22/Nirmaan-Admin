import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular/lazy';
import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';
// import { AuthLayoutModule } from '../../../../layout/auth-layout/auth-layout.module';
// import { AppInputComponent } from '../../../../shared/components/app-input/app-input.component';
// import { AppButtonComponent } from '../../../../shared/components/app-button/app-button.component';

import { AuthLayoutModule } from '../../../../layout/auth-layout/auth-layout.module';
import { AppInputComponent } from '../../../../shared/components/app-input/app-input.component';
import { AppButtonComponent } from '../../../../shared/components/app-button/app-button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    AuthLayoutModule,
    AppInputComponent,
    AppButtonComponent,
  ],
  declarations: [RegisterPage],
})
export class RegisterPageModule {}
