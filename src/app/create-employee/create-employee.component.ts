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

  formErrors = {
    'fullName': '',
    'email': '',
    'skillName': '',
    'experienceInYears': '',
    'proficiency': ''
  };
  validationsMessages={
'fullName' :{
  'required':' Full name is required.',
  'minlength':' Full name must be greater than 2 characters.',
  'maxlength':' Full name must be greater than 10 characters.',
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
      email: ['',Validators.required],
      skills: this.fb.group({
        skillName:['',Validators.required],
        experienceInYears:['',Validators.required],
        proficiency:['',Validators.required]

      })
   
      
    });
    // this.employeeForm.valueChanges.subscribe((value:any) =>{
    //   console.log(JSON.stringify(value)); // to capture total form value
    // });
    // this.employeeForm.get('skills').valueChanges.subscribe((value:any) =>{
    //   //console.log(JSON.stringify(value)); // to capture nested form form value
    // });
    //  this.employeeForm.get('fullName').valueChanges.subscribe((value:any) =>{
    //   console.log(value);
    // });//to check only single value in the form
    this.employeeForm.valueChanges.subscribe((data) =>{
      this.logValidationErrors(this.employeeForm);// inorder to call the logvalidationerrors function with any changes
    });    
  }
  logValidationErrors(group: FormGroup= this.employeeForm):void{
    Object.keys(group.controls).forEach((key: string)=> {
      const abstractControl = group.get(key); // we wrote it as we dont know whether the key is coming form from or nested form
      if(abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl); 

      }else{
        this.formErrors[key]='';// to clear any existing validations error 
        if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)){
        const messages = this.validationsMessages[key];
        for (const errorKey in abstractControl.errors){
          if(errorKey){
            this.formErrors[key] += messages[errorKey] + ''; // last lo space to give sapce b/w errors if they are more than 1
          }
        }
        }
      }
    })  

  }
  onSubmit():void{
    console.log(this.employeeForm.touched); 
    console.log(this.employeeForm.controls.fullName.value); // two types to get the form invidual values
    console.log(this.employeeForm.get('fullName').value);
  }
  LoadDataClicked():void{ 
    // this.logValidationErrors(this.employeeForm);
    // console.log(this.formErrors);

        }
      

    
}
