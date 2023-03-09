import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss']
})
export class ListTodoComponent implements OnInit {

  @Input()
  todo:any [] = [];

  @Output()
  onUpdate = new EventEmitter();

  @Output()
  onSelectTask = new EventEmitter();

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
  }

  async deleteTask(task:any){
    console.log(task)
    const result = await Swal.fire({
      title: '¿Esta seguro de eliminar esta tarea?',
      text: "esta acción no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'No'
    })

    if (!result.isConfirmed) return;

    this.todoService.eliminar(task.taskId)
    .subscribe({
      next:()=>{

        Swal.fire(
          'Borrado!',
          'su tarea ha sido borrada con exito.',
          'success'
        )
        this.onUpdate.emit();
      },
      error: (err)=>{
        Swal.fire(
          'upss!',
          'no se pudo eliminar la tarea',
          'error'
        )
      }
    })

  }

  async doneTask(task:any){
    console.log(task)
    const result = await Swal.fire({
      title: '¿Esta seguro de marcar esta tarea como terminada?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, ya la terminé!',
      cancelButtonText: 'No'
    })

    if (!result.isConfirmed) return;

    const data = {...task};
    data.estatus = false;
    const id = task.taskId;
    delete data.taskId;

    this.todoService.editar(id, data)
    .subscribe({
      next:()=>{

        Swal.fire(
          'Exito!',
          'su tarea ha sido terminada con éxito.',
          'success'
        )
        this.onUpdate.emit();
      },
      error: (err)=>{
        Swal.fire(
          'upss!',
          'no se pudo marcar como terminada la tarea',
          'error'
        )
      }
    })

  }

  selectTask(task:any){
    this.onSelectTask.emit(task);
  }
}
