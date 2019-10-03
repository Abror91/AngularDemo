import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from '../../shared/models/login.model';
import { AppConfig } from '../../core/configs/app.config';
import * as jwt_decode from 'jwt-decode';

const Api_URL = AppConfig.apiUrl;
const Token_Name = "jwt_token";
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    //private currentUserObject: BehaviorSubject<Login>;
   // public currentUser: Observable<Login>;
    constructor(private http: HttpClient) {
        //this.currentUserObject = new BehaviorSubject<Login>(JSON.parse(localStorage.getItem('token')));
       // this.currentUser = this.currentUserObject.asObservable();
    }
    // public get currentUserValue(): Login {
    //     return this.currentUserObject.value;
    // }

    public getToken() {
        return localStorage.getItem(Token_Name);
    }
    public setToken(token: string): void {
        localStorage.setItem(Token_Name, token);
    }

    public GetDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        }
        catch (Error) {
            return null;
        }
    }

    getTokenExpirationDate(token: string) {
        var decoded = this.GetDecodedAccessToken(token);
        if (!decoded)
            return null;
        if (decoded.exp === undefined)
            return null;
        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    isTokenExpired(): boolean {
        var token = this.getToken();
        if (!token)
            return true;
        var tokenDate = this.getTokenExpirationDate(token);
        if (!tokenDate)
            return true;
        return !(tokenDate.valueOf() > new Date().valueOf())
    }

    login(username: string, password: string) {
        return this.http.post<any>(Api_URL + '/api/auth/login', { username, password })
            .pipe(map(token => {
                //store user details and jwt in local storage to keep user logged in between page refreshes
                this.setToken(JSON.stringify(token));
                // this.currentUserObject.next(token);
                // return token;
            }))
    }

    logout() {
        //remove user from local storage to log user out
        localStorage.removeItem(Token_Name);
        //this.currentUserObject.next(null);
    }
}