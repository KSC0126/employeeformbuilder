import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm : FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName:['',[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      email: [''],
      skills: this.fb.group({
        skillName:[''],
        experienceInYears:[''],
        proficiency:['advanced']

      })
   
      
    });
  }
  onSubmit():void{
    console.log(this.employeeForm.touched); 
    console.log(this.employeeForm.controls.fullName.value); // two types to get the form invidual values
    console.log(this.employeeForm.get('fullName').value);
  }
  LoadDataClicked():void{ 
    this.employeeForm.setValue({ // set only a sub set of this form we use patchvalue instead of setvalue
      fullName: 'showrya',
      email:'a@b.com',
        skills:{
          skillName: 'Angular',
          experienceInYears:'2+ yrs',
          proficiency:'intermediate'

        }
      

    })

  }

}
