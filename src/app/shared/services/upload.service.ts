import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../core/configs/app.config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
const Upload_URL = AppConfig.apiUrl + "/api/upload";
@Injectable()
export class UploadService {
    constructor(private http: HttpClient) {

    }
    uploadFile(file: FormData): Observable<any> {
        return this.http.post<any>(Upload_URL, file, { reportProgress: true, observe: 'events' })
            .pipe(map((event) => {
                switch (event.type) {
                    case HttpEventType.UploadProgress:
                        const progress = Math.round(100 * event.loaded / event.total);
                        return { status: 'progress', message: progress };
                    case HttpEventType.Response:
                        return event.body;
                    default:
                        return {};
                }
            }))
    }

    upload(file: Blob): Observable<any> {
        var data = new FormData();
        data.append('file', file);
        return this.http.post<any>(Upload_URL, data);
    }
}