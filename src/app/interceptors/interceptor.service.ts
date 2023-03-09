import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { SessionService } from '../shared/services/session.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(
    private router:Router,
    private session: SessionService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.session.getToken();

    let request = req;

    if(token){

      request = req.clone({
        setHeaders:{
          authorization: `Bearer ${token}`
        }
      });

    }

    return next.handle( request ).pipe(
      map((event:any)=>{
        return event;
      }),
      catchError( (err: HttpErrorResponse ) =>{
        if( err.status === 401 ){
          this.router.navigateByUrl('login');
        }

        return throwError( err );
      })
    );
  }
}
