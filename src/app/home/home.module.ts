import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { TodoComponent } from './components/todo/todo.component';
import { TodoScreenComponent } from './pages/todo-screen/todo-screen.component';
import { SharedModule } from '../shared/shared.module';
import { ListTodoComponent } from './components/list-todo/list-todo.component';
import { FormTodoComponent } from './components/form-todo/form-todo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListFilesComponent } from './components/list-files/list-files.component';


@NgModule({
  declarations: [
    TodoComponent,
    TodoScreenComponent,
    ListTodoComponent,
    FormTodoComponent,
    ListFilesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
