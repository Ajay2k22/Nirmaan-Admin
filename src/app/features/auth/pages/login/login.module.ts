import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

import { AuthLayoutModule } from '../../../../layout/auth-layout/auth-layout.module';
import { AppButtonComponent } from '../../../../shared/components/app-button/app-button.component';
import { AppInputComponent } from '../../../../shared/components/app-input/app-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,

    AuthLayoutModule,
    AppButtonComponent,
    AppInputComponent,
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
