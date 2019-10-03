import { UploadService } from '../../shared/services/upload.service';
import { Component, ViewEncapsulation, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FileExtentionsService } from '../../shared/services/file-extentions.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'file-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UploadComponent implements OnInit {
    public progress: number;
    public message: string;
    selectedFile: any;
    uploadResponse = { status: '', message: '', filePath: '' }
    @ViewChild('userImage') userImage: ElementRef;
    @Output() public onUploadFinished = new EventEmitter();
    constructor(private _uploadService: UploadService,
        private _fileExtentionsService: FileExtentionsService,
        private _snackBar: MatSnackBar) {

    }
    ngOnInit() {

    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            const supportedFileExtentions = this._fileExtentionsService.getSupportedFileExtentions();
            const extention = file.name.substr(file.name.lastIndexOf("."));
            const isSupportedExtention = supportedFileExtentions.find(s => s == extention);
            if (!isSupportedExtention) {
                var supportedFormats = "";
                supportedFileExtentions.forEach(s => { supportedFormats += s + " " });
                this._snackBar.open("Unsupported file format. These are the supported file formats: " + supportedFormats,
                    null, { duration: 10 * 1000, verticalPosition: 'top' });
                return;
            }
            const fileSize = file.size / 1048576;
            const validSize = this.checkFileSize(fileSize);
            if (!validSize)
                return
            this.selectedFile = file;
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                let encoded_file = (<any>e.target).result;
                var formData = new FormData();
                formData.append('file', this.selectedFile);
                this._uploadService.uploadFile(formData).subscribe((res) => {
                    this.uploadResponse = res;
                    if (!res.status) {
                        this.userImage.nativeElement.src = encoded_file;
                    }
                },
                    (err) => {
                        var keys = Object.keys(err.error);
                        var ErrorDisplay = '';
                        keys.forEach(key => {
                            ErrorDisplay + err.error[key] + "! ";
                        });
                        this._snackBar.open(ErrorDisplay, null, { duration: 10 * 1000, verticalPosition: 'top' });   
                    }
                )
            }
        }
    }

    checkFileSize(fileSize: number): boolean {
        let result;
        if (fileSize > 1) {
            this._snackBar.open("Размер файла не может быть больше чем 1mb!", null, { duration: 10 * 1000, verticalPosition: 'top' });
            result = false;
        } else {
            result = true;
        }
        return result;
    }

    public uploadFile = (files) => {
        if (files.length === 0)
            return;

        let fileToUpload = <File>files[0];
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);

    }
}