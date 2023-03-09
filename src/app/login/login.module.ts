import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { LoginScreenComponent } from './pages/login-screen/login-screen.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoginService } from './services/login.service';


@NgModule({
  declarations: [
    FormLoginComponent,
    LoginScreenComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [LoginService]
})
export class LoginModule { }
