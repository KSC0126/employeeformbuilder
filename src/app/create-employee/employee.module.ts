import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEmployeeComponent } from '../list-employee/list-employee.component';
import { CreateEmployeeComponent } from './create-employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from '../create-employee/employee-routing.module'

@NgModule({
  declarations: [
    ListEmployeeComponent,
    CreateEmployeeComponent
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
