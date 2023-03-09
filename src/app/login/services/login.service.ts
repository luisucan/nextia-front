import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

/*
{
  providedIn: 'root'
}*/

@Injectable()
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  login(parametros:any){
    return this.http.post(`${environment.url}/login`, parametros);
  }
}
