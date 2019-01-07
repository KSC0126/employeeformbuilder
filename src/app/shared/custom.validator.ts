import { AbstractControl } from '@angular/forms';

export class  customValidators {

    static emailDomain(domainName:string){
        return (control: AbstractControl): { [key: string]: any } | null => {
        const email: string = control.value;
        const domain: string = email.substring(email.lastIndexOf('@') + 1);
        if ( email === '' || domain.toLowerCase() === domainName.toLocaleLowerCase()) { // custom validator with parameter check commit 01/06 23:00 for vsalidators without parameter
          return null;
        } else {
          return { 'emailDomain': true }
        }
      
      }
      };

}