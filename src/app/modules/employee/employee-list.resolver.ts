import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { EmployeeService } from '../../shared/services/employee.service';
@Injectable()
export class EmployeeListResolver implements Resolve<any>{
    constructor(private _employeeService: EmployeeService){}
    resolve(route: ActivatedRouteSnapshot){
        return this._employeeService.getAll();
    }
}