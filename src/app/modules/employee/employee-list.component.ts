import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { EmployeeService } from '../../shared/services/employee.service';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { ConfirmationModalComponent } from '../../shared/components/modals/confirmation-modal.component';
import { takeUntil } from 'rxjs/operators';
import { Employee } from '../../shared/models/employee.model';

@Component({
    selector: 'employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class EmployeeListComponent implements OnInit, OnDestroy {
    employees: Employee[] = employees;
    private _unsubscribeAll: Subject<any>;
    constructor(private _employeeService: EmployeeService,
        private _matDialog: MatDialog,
        private _snackBar: MatSnackBar) {
        this._unsubscribeAll = new Subject();
    }
    ngOnInit() {

    }

    onDeleteEmployee(id?: number) {
        const dialogConf = new MatDialogConfig();
        dialogConf.data = {
            title: "Are you sure you want to delete this item"
        }
        var dialogRef = this._matDialog.open(ConfirmationModalComponent, dialogConf);
        dialogRef.afterClosed().subscribe(response => {
            if (response.result) {
                this.deleteEmployee(id);
            }
        });
    }

    deleteEmployee(id: number) {
        this._employeeService.delete(id)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(response => {
                if (response) {
                    this._snackBar.open("Employee was successfully deleted!", null, { duration: 10 * 1000, horizontalPosition: 'center', verticalPosition: 'top' });
                } else {
                    this._snackBar.open("Unable to delete employee!", null, { duration: 10 * 1000, horizontalPosition: 'center', verticalPosition: 'top' });
                }
            })
    }

    ngOnDestroy() {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
const employees: Employee[] = [
    {
        id: 1,
        fullName: "Jason Mccoy",
        about: "This is some random info for testing",
        jobStartDate: new Date(2019, 10, 10),
        country: "USA"
    },
    {
        id: 2,
        fullName: "Smith Mccoy",
        about: "This is some random info for testing",
        jobStartDate: new Date(2019, 5, 5),
        country: "USA"
    },
    {
        id: 3,
        fullName: "Helen Mccoy",
        about: "This is some random info for testing",
        jobStartDate: new Date(2019, 15, 15),
        country: "USA"
    },
    {
        id: 1,
        fullName: "Clark Mccoy",
        about: "This is some random info for testing",
        jobStartDate: new Date(2019, 20, 20),
        country: "USA"
    },
    {
        id: 1,
        fullName: "Micheal Mccoy",
        about: "This is some random info for testing",
        jobStartDate: new Date(2019, 25, 25),
        country: "USA"
    },
]