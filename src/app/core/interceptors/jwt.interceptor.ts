import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    constructor(private _authService: AuthService){
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        //add authorization header with the token if available
        let tokenExpired = this._authService.isTokenExpired();
        var token = this._authService.getToken();
        if(tokenExpired == false){
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}` 
                }
            });
        }
        return next.handle(request);
    }
}   