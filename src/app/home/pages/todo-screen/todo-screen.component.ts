import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-todo-screen',
  templateUrl: './todo-screen.component.html',
  styleUrls: ['./todo-screen.component.scss']
})
export class TodoScreenComponent implements OnInit {

  name: string = '';
  user:any;
  error:any;

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findUser();
  }

  findUser(){
    this.error = null;
    this.sessionService.findUser(this.sessionService.getId())
    .subscribe({
      next: (data)=>{
        this.user = data;
        this.name = this.user.name + ' ' + this.user.lastName;
      },
      error: (err)=>{
        this.error = 'ocurrio un error al iniciar sesión';
      }
    })
  }

  closeSession(){
    this.sessionService.deleteSession();
    this.router.navigateByUrl('login');
  }
}
