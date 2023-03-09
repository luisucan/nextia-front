import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {

  form!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      username: ['luisucan',[Validators.required]],
      password: ['1234',[Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  goToLogin(){
    this.router.navigateByUrl('/login')
  }

  register(){

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
