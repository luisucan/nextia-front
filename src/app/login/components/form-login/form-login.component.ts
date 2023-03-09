import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private loginService: LoginService
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
      },
      error: (err)=>{
        this.isLoading = false;
        console.log(err);
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
