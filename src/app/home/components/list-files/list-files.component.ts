import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.scss']
})
export class ListFilesComponent implements OnInit {

  @ViewChild('files',{static: true})
  files!: ElementRef;

  @Input()
  taskId:any;

  isLoading:boolean = false;

  filesTask: any[] = [];

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.find();
  }

  find(){
    this.todoService.findArchivos(this.taskId)
    .subscribe({
      next: (data:any)=>{
        this.filesTask = data;
      },
      error: ()=>{
        this.isLoading = false;
        Swal.fire('upp!!','ocurrio un error al intentar obtener los archivos','error');
      }
    })
  }

  save(){
    const files: File[] = this.files.nativeElement.files;
    console.log(files);
    if(files.length === 0) return;

    const formData = new FormData();
    for(let i=0;i<files.length;i++){
      formData.append('files', files[i], files[i].name);
    }

    this.isLoading = true;
    this.todoService.subirarchivos(this.taskId, formData)
    .subscribe({
      next:()=>{
        this.isLoading = false;
        this.files.nativeElement.value = '';
        this.find();
      },
      error: ()=>{
        this.isLoading = false;
        Swal.fire('upp!!','ocurrio un error al intentar subri los archivos','error');
      }
    })
  }

  async deleteFile(file:any){
    const result = await Swal.fire({
      title: '¿Esta seguro de eliminar este archivo?',
      text: "esta acción no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'No'
    })

    if (!result.isConfirmed) return;

    console.log(file)
    this.todoService.eliminarArchivo(file.fileTaskId)
    .subscribe({
      next:()=>{

        Swal.fire(
          'Borrado!',
          'su archivo ha sido borrada con exito.',
          'success'
        )
        this.find();
      },
      error: (err)=>{
        Swal.fire(
          'upss!',
          'no se pudo eliminar el archivo',
          'error'
        )
      }
    })

  }

  download(fileTask:any){
    this.todoService.descargar(fileTask.fileTaskId)
    .subscribe({
      next: (data:any)=>{
        console.log(data);
        const dataType = data.type;
        const binary = [];
        binary.push(data);

        const filepath = window.URL.createObjectURL(new Blob(binary, {type: dataType}));
        const link = document.createElement('a');
        link.href = filepath;
        link.setAttribute('download', fileTask.originalName);
        link.click();
      }
    });
  }
}
