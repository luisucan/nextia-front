import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient
  ) { }

  find(userId:any, page:number){

    page = page ? page : 0;

    return this.http.get(`${environment.url}/tasks/page/${userId}?page=${page}&size=10&sort=createdAt,desc`)
  }

  save(userId:any, task:any){
    return this.http.post(`${environment.url}/tasks/user/${userId}`, task);
  }

  editar(taskId:any, task:any){
    return this.http.put(`${environment.url}/tasks/${taskId}`, task);
  }

  eliminar(taskId:any){
    return this.http.delete(`${environment.url}/tasks/${taskId}`, {});
  }

  findArchivos(taskId:any){
    return this.http.get(`${environment.url}/files/task/${taskId}`)
  }

  subirarchivos(taskId:any,formData: FormData){
    return this.http.post(`${environment.url}/files/${taskId}`, formData);
  }

  eliminarArchivo(fileTaskId:any){
    return this.http.delete(`${environment.url}/files/${fileTaskId}`, {});
  }

  descargar(fileTaskId:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${environment.url}/files/download/${fileTaskId}`, {}, {
      headers,
      responseType: 'blob' as 'json'
    });
  }
}
