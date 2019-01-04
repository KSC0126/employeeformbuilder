import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm : FormGroup;
  validationsMessages={
'fullName' :{
  'required':' Full name is required.',
  'minLenght':' Full name must be greater than 2 characters.',
  'maxLenght':' Full name must be greater than 10 characters.',
}, 'email': {
  'required': 'Email is required.'
},
'skillName': {
  'required': 'Skill Name is required.',
},
'experienceInYears': {
  'required': 'Experience is required.',
},
'proficiency': {
  'required': 'Proficiency is required.',
},
  }

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
    // this.employeeForm.valueChanges.subscribe((value:any) =>{
    //   console.log(JSON.stringify(value)); // to capture total form value
    // });
    this.employeeForm.get('skills').valueChanges.subscribe((value:any) =>{
      //console.log(JSON.stringify(value)); // to capture nested form form value
    });
    //  this.employeeForm.get('fullName').valueChanges.subscribe((value:any) =>{
    //   console.log(value);
    // });//to check only single value in the form
    
  }
  logKeyValuePairs(group: FormGroup):void{
    Object.keys(group.controls).forEach((key: string)=> {
      const abstractControl = group.get(key); // we wrote it as we dont know whether the key is coming form from or nested form
      if(abstractControl instanceof FormGroup) {
        this.logKeyValuePairs(abstractControl); 

      }else{
        console.log(abstractControl.value);
        abstractControl.disable();
      }
    })  

  }
  onSubmit():void{
    console.log(this.employeeForm.touched); 
    console.log(this.employeeForm.controls.fullName.value); // two types to get the form invidual values
    console.log(this.employeeForm.get('fullName').value);
  }
  LoadDataClicked():void{ 
    this.logKeyValuePairs(this.employeeForm);

        }
      

    
}
