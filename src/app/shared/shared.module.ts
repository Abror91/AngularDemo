import { NgModule } from '@angular/core';
import { ConfirmationModalComponent } from './components/modals/confirmation-modal.component';
import { MatDialogModule, MatMenuModule, MatSnackBarModule, MatCardModule, MatIconModule, MatInputModule, MatCheckboxModule, MatButtonModule } from '@angular/material';
import { EmployeeService } from './services/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { FileExtentionsService } from './services/file-extentions.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ConfirmationModalComponent
    ],
    imports: [
        MatDialogModule,
        MatMenuModule,
        MatSnackBarModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        ReactiveFormsModule
    ],
    exports:[
        MatDialogModule,
        MatMenuModule,
        MatSnackBarModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [
        EmployeeService,
        FileExtentionsService
    ],
    entryComponents:[
        ConfirmationModalComponent
    ]
})
export class SharedModule {

}