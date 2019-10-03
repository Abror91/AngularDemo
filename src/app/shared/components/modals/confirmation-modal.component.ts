import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ConfirmationModalComponent {
    message: string;
    constructor(private _dialogRef: MatDialogRef<ConfirmationModalComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
        this.message = data.title;
    }

    close() {
        this._dialogRef.close({ result: false });
    }

    onConfirmationClose() {
        this._dialogRef.close({ result: true });
    }
}