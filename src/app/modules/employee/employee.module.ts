import { NgModule } from '@angular/core';
import { EmployeeListComponent } from './employee-list.component';
import { DetailsEmployeeComponent } from './details-employee.component';
import { CreateEditEmployeeComponent } from './create-edit-employee.component';
import { EmployeeListResolver } from './employee-list.resolver';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { EmployeeRoutingModule } from './employee-routing.module';

@NgModule({
    declarations: [
        EmployeeListComponent,
        DetailsEmployeeComponent,
        CreateEditEmployeeComponent
    ], 
    imports: [
        CommonModule,
        SharedModule,
        EmployeeRoutingModule
    ], 
    exports:[

    ],
    providers: [
        EmployeeListResolver
    ]
})
export class EmployeeModule{

}