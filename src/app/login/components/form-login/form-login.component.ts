import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first, map } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  form: FormGroup
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private sessionService: SessionService
  ) {
    this.form = this.formBuilder.group({
      username: ['luisucan',[Validators.required]],
      password: ['1234',[Validators.required]],
    })

  }

  ngOnInit(): void {
  }

  login(){
    if(!this.form.valid){
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.loginService.login(this.form.value)
    .subscribe({
      next: (data:any)=>{
        this.isLoading = false;
        console.log(data.Bearer)
        this.sessionService.setToken( data.Bearer);
        this.router.navigateByUrl('');
      },
      error: (err)=>{
        console.log(err)
        this.isLoading = false;
        Swal.fire(
          'Upps',
          'El usuario o contraseña no son correctos',
          'error'
        )
      }
    })
  }

  goToRegister(){
    this.router.navigateByUrl('/register')
  }

  getError(controlName: string): string {
    let error = '';
    const control = this.form.get(controlName);
    if (control!.touched && control!.errors != null) {
      error = JSON.stringify(control!.errors);
    }
    return error;
  }
}
