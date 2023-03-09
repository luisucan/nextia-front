import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: ()=>import('./login/login.module').then(m=>m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: ()=>import('./register/register.module').then(m=>m.RegisterModule)
  },
  {
    path: '',
    loadChildren: ()=>import('./home/home.module').then(m=>m.HomeModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
