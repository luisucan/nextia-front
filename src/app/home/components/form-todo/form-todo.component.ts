import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/shared/services/session.service';
import Swal from 'sweetalert2';
import { TodoService } from '../../services/todo.service';

declare var window: any;

@Component({
  selector: 'form-todo',
  templateUrl: './form-todo.component.html',
  styleUrls: ['./form-todo.component.scss']
})
export class FormTodoComponent implements OnInit {

  task: any;

  @ViewChild('modalWindow',{static: true})
  modalWindow!: ElementRef;

  modal: any;

  @Output()
  onUpdate = new EventEmitter<any>();

  form!: FormGroup;
  isLoading: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private sessionService: SessionService
  ) {
  }

  buildForm(){
    this.form = this.formBuilder.group({
      title: ['',[Validators.required]],
      description: ['',[Validators.required]],
    })
  }

  openModal(task:any = null){
    this.task = null;

    this.buildForm();
    if(task) {
      this.task = task;
      this.form.patchValue(task);
    }
    this.modalWindow.nativeElement.classList.add('show');
  }

  close(){
    this.modalWindow.nativeElement.classList.remove('show');
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
  }

  getError(controlName: string): string {
    let error = '';
    const control = this.form.get(controlName);
    if (control!.touched && control!.errors != null) {
      error = JSON.stringify(control!.errors);
    }
    return error;
  }

  save(){

    if(!this.form.value){
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.todoService.save(this.sessionService.getId(),this.form.value)
    .subscribe({
      next:(data)=>{
        this.isLoading = false;
        this.onUpdate.emit();
        this.buildForm();
      },
      error:(err)=>{
        this.isLoading = false;
        Swal.fire('upps','ocurrio un error al intentar guardar la tarea','error');
      }
    })
  }

  edit(){

    if(!this.form.value){
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const params = this.form.value;

    const data = {
      ...this.task
    }
    delete data.taskId;
    data.title = params.title;
    data.description = params.description;

    this.todoService.editar(this.task.taskId,data)
    .subscribe({
      next:(data)=>{
        this.isLoading = false;
        this.onUpdate.emit();
      },
      error:(err)=>{
        this.isLoading = false;
        Swal.fire('upps','ocurrio un error al intentar guardar la tarea','error');
      }
    })
  }
}
