import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private http: HttpClient
  ) { }

  setToken(token:string){
    localStorage.setItem('todo.token', token);
  }

  getToken(){
    return localStorage.getItem('todo.token') || '';
  }

  setId(id:number){
    localStorage.setItem('todo.userid', id+'');
  }

  getId(){
    return localStorage.getItem('todo.userid') || '';
  }

  deleteSession(){
    localStorage.removeItem('todo.token');
    localStorage.removeItem('todo.userid');
  }

  findUser(userId:any){
    return this.http.get(`${environment.url}/users/${userId}`);
  }
}
