import { OnInit, Component, ViewEncapsulation } from '@angular/core';
import { UploadService } from '../../shared/services/upload.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit{
    profileForm: FormGroup;
    error: string;
    uploadResponse = { status: '', message: '', filePath: '' }
    constructor(private _uploadService: UploadService,
                private fb: FormBuilder){
    }

    ngOnInit(){
        this.profileForm = this.fb.group({
            avatar: ['']
        })
    }

    onFileChange(event){
        if(event.target.files.length > 0){
            const file = event.target.files[0];
            this.profileForm.get('avatar').setValue(file);
        }
    }

    onSubmit(){
        var formData = new FormData();
        formData.append('file', this.profileForm.get('avatar').value);
        this._uploadService.uploadFile(formData)
        .subscribe(
            (res) => this.uploadResponse = res,
            (err) => this.error = err
        )
    }
}