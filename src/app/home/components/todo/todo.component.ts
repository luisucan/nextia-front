import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SessionService } from 'src/app/shared/services/session.service';
import { TodoService } from '../../services/todo.service';
import { FormTodoComponent } from '../form-todo/form-todo.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  @ViewChild('formularioTask',{static:true})
  formularioTask!: FormTodoComponent;

  todo: any[] = [];
  dataPage: any;
  page = 0;

  constructor(
    private todoService: TodoService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.find();
  }

  find(page:number = this.page){
    this.page = page;

    this.todoService.find(this.sessionService.getId(), page)
    .subscribe({
      next: (data:any)=>{
        console.log(data);
        this.dataPage = data;
        this.todo = data.content;
      },
      error: (err)=>{

      }
    })
  }

  selectTask(task:any){
    this.formularioTask.openModal(task);
  }

}
