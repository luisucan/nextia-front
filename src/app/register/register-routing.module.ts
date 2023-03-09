import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterScreenComponent } from './pages/register-screen/register-screen.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterScreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
