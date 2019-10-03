import { BaseService } from '../../core/services/base.service';
import { Employee } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const API_URL = 'api/employee'
@Injectable()
export class EmployeeService extends BaseService<Employee>{
    constructor(http: HttpClient){
        super(http, API_URL);
    }
}