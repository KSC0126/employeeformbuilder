import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEmployeeComponent } from '../app/list-employee/list-employee.component';
import { CreateEmployeeComponent } from '../app/create-employee/create-employee.component';

const routes: Routes = [
  {
    path:'list',
    component:ListEmployeeComponent

  },
  {
    path:'create',
    component:CreateEmployeeComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
