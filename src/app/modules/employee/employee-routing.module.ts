import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list.component';
import { DetailsEmployeeComponent } from './details-employee.component';
import { CreateEditEmployeeComponent } from './create-edit-employee.component';
const routes: Routes = [
    {
        path: 'employees',
        children: [
            { path: '', component: EmployeeListComponent },
            { path: 'details/:id', component: DetailsEmployeeComponent },
            { path: 'create', component: CreateEditEmployeeComponent },
            { path: 'edit/:id', component: CreateEditEmployeeComponent }
        ]
    }
]
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class EmployeeRoutingModule {

}