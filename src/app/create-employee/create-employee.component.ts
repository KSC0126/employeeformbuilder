import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, FormArray } from '@angular/forms';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { customValidators } from '../shared/custom.validator';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from './employee.service';
import { IEmployee } from './models/iemployee';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  private isButtonVisible = true;

  // formErrors = {
  //   'fullName': '',
  //   'email': '',
  //   'confirmEmail': '',
  //   'emailGroup':'',
  //   'phone': '',
  //   'skillName': '',
  //   'experienceInYears': '',
  //   'proficiency': ''
  // };
  formErrors = {

  }
  validationsMessages = {
    'fullName': {
      'required': ' Full name is required.',
      'minlength': ' Full name must be greater than 2 characters.',
      'maxlength': ' Full name must be greater than 10 characters.',
    }, 'email': {
      'required': 'Email is required.',
      'emailDomain': 'Email should be of Gmail.'
    },
    'confirmEmail': {
      'required': 'you need to confirm the email.',
    },
    'emailGroup': {
      'emailMismatch': 'email and confirm e mail does not match.'

    },
    'phone': {
      'required': 'Phone is required.'
    }
  }


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPreference: ['email'],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, customValidators.emailDomain('gmail.com')]],
        confirmEmail: ['', Validators.required],
      }, { validator: matchEmails }),

      phone: [''],
      skills: this.fb.array([
        this.addSkillFormGroup()
      ])


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
    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);// inorder to call the logvalidationerrors function with any changes
    });
    this.employeeForm.get('contactPreference').valueChanges.subscribe((data: string) => {
      this.contactPreferenceClicked(data);
    }// using to check the value that changes in contact preference
    );

    this.route.paramMap.subscribe(params => {
      const empId = +params.get('id'); // + symbol is type casting it to a number
      if (empId) {
        this.getEmployee(empId);
      }
    })

  }
  getEmployee(id: number) {
    this.employeeService.getEmployee(id).subscribe(
      (employee: IEmployee) => this.editEmployee(employee),
      (err: any) => console.log(err)
    );

  }
  editEmployee(employee: IEmployee) {
    this.employeeForm.patchValue({
      fullName: employee.fullName,
      contactPreference: employee.contactPreference,
      emailGroup: {
        email: employee.email,
        confirmEmail: employee.email,
      },
      phone: employee.phone

    });
  }
  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      proficiency: ['', Validators.required]

    })

  }
  addSkillButtonClick() {
    console.log('addskills clicked');
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  }
  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key); // we wrote it as we dont know whether the key is coming form from or nested form
      this.formErrors[key] = '';// to clear any existing validations error 
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty || abstractControl.value !=='')) {
        const messages = this.validationsMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ''; // last lo space to give sapce b/w errors if they are more than 1
          }
        }
      } // before it is in the else but moved it on to the top in order to validate the whole fromgroup not just a formConttrol
      if (abstractControl instanceof FormGroup) {

        this.logValidationErrors(abstractControl);

      }
    });


  }
  contactPreferenceClicked(selectedValue: string) {
    const phoneControl = this.employeeForm.get('phone');
    if (selectedValue === 'phone') {
      phoneControl.setValidators(Validators.required);
    }
    else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }
  onSubmit(): void {
    // console.log(this.employeeForm.touched);
    // console.log(this.employeeForm.controls.fullName.value); // two types to get the form invidual values
    // console.log(this.employeeForm.get('fullName').value);
    console.log(this.employeeForm.value)
  }
  removeSkillSet(selectedSkillIndex: number): void {
    (<FormArray>this.employeeForm.get('skills')).removeAt(selectedSkillIndex);

  }
  LoadDataClicked(): void {
    // this.logValidationErrors(this.employeeForm);
    // console.log(this.formErrors);
    const formArray = this.fb.array([
      new FormControl('jhon', Validators.required),
      new FormControl('It', Validators.required),
      new FormControl('male', Validators.required),
    ])
    console.log(formArray.value);
  }



}

// Nested form group (emailGroup) is passed as a parameter. Retrieve email and
// confirmEmail form controls. If the values are equal return null to indicate
// validation passed otherwise an object with emailMismatch key. Please note we
// used this same key in the validationMessages object against emailGroup
// property to store the corresponding validation error message
// function matchEmail(group: AbstractControl): { [key: string]: any } | null {
//   const emailControl = group.get('email');
//   const confirmEmailControl = group.get('confirmEmail'); // till here we are trying to get both email and confirm email values.
//   if (emailControl.value === confirmEmailControl.value || confirmEmailControl.pristine) {
//     return null; // here we are checking if the email value === confirmEmail we return null with no validation errors
//   } else {
//     return { 'emailMismatch': true }
// // in next step we need to tie this custom validator to our nested form group on the top
//   }
// }

function matchEmails(group: AbstractControl): { [key: string]: any } | null {
  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');

  if (emailControl.value === confirmEmailControl.value || (confirmEmailControl.pristine && confirmEmailControl.value=='')) {
    return null;
  } else {
    return { 'emailMismatch': true };
  }
}

