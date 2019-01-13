import { NgModule } from '@angular/core';
import { ListEmployeeComponent } from '../list-employee/list-employee.component';
import { CreateEmployeeComponent } from './create-employee.component';
import { EmployeeRoutingModule } from '../create-employee/employee-routing.module';
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [
    ListEmployeeComponent,
    CreateEmployeeComponent
    
  ],
  imports: [
    EmployeeRoutingModule,
    SharedModule
  ]
})
export class EmployeeModule { }
