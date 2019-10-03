import { Injectable } from '@angular/core';

@Injectable()
export class FileExtentionsService{
    private fileExtentions: string[] = [
        ".jpg", ".jpeg", ".png"
    ];
    getSupportedFileExtentions(){
        return this.fileExtentions;
    }
}