import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListEmployeeComponent } from '../app/list-employee/list-employee.component';
import { CreateEmployeeComponent } from '../app/create-employee/create-employee.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  
  {
    path:'home',
    component:HomeComponent

  },
  {
    path:'**',
    component:PageNotFoundComponent

  },
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
