import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterScreenComponent } from './pages/register-screen/register-screen.component';
import { FormRegisterComponent } from './components/form-register/form-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    RegisterScreenComponent,
    FormRegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class RegisterModule { }
