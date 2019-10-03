import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../configs/app.config';

const API_URL = AppConfig.apiUrl;

@Injectable()
export abstract class BaseService<T> {

    public actionUrl: string;
    public baseUrl = API_URL;
    constructor(public http: HttpClient, actionUrl: string) {
        this.actionUrl = actionUrl;
    }

    public get(url?: string, options?: { params?: any }): Observable<T[]> {
        url = url || this.actionUrl;

        return this.http.get<T[]>(API_URL + "/" + url, options);
    }

    public getAll(options?: { params?: any }): Observable<T[]> {
        return this.http.get<T[]>(API_URL + "/" + this.actionUrl, options);
    }

    public getById(id: number, options?: { params?: any }): Observable<T> {
        return this.http.get<T>(API_URL + "/" + this.actionUrl + "/" + id, options);
    }

    public post(actionUrl, model, options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<T> {
        actionUrl = actionUrl || this.actionUrl;
        return this.http.post<T>(API_URL + "/" + actionUrl, model, options);
    }

    public create<T>(model: T, actionUrl: string = '', options?: {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<T> {
        actionUrl = actionUrl || this.actionUrl;
        return this.http.post<T>(API_URL + "/" + actionUrl, model, options);
    }

    public update<K>(id: number, model: K): Observable<K>;
    public update<K>(id: number, model: K, action: string): Observable<K>;
    public update(id: number, model: T, action: string = ''): Observable<T> {
        action = action || this.actionUrl;
        return this.http
            .put<T>(API_URL + "/" + action + "/" + id, model);
    }


    public delete<T>(id: number): Observable<T> {
        return this.http.delete<T>(API_URL + "/" + this.actionUrl + "/" + id);
    }
}