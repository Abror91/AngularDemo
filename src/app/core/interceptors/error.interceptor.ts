import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    constructor(private _authService: AuthService){

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        return next.handle(request).pipe(catchError(error => {
            if(error.status === 401){
                //auto logout if 401 is returned from the server
                this._authService.logout();
                location.reload(true);
            }
            const err = error.error.message || error.statusText;
            return throwError(err);
        }));
    }    
}