import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegisterService } from '../../services/register.service';

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
    private registerService: RegisterService
  ) {
    this.form = this.formBuilder.group({
      username: ['',[Validators.required]],
      password: ['',[Validators.required]],
      name: ['',[Validators.required]],
      lastName: ['',[]],
    })
  }

  ngOnInit(): void {
  }

  goToLogin(){
    this.router.navigateByUrl('/login')
  }

  register(){

    if(!this.form.valid){
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    this.registerService.register(this.form.value)
    .subscribe({
      next: ()=>{
        this.isLoading = false;
        this.router.navigateByUrl('home');
      },
      error: (err)=>{
        this.isLoading = false;
        Swal.fire(
          'Upps',
          'El usuario o contraseña no son correctos',
          'error'
        )
      }
    })
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
