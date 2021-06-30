import { FormGroup } from '@angular/forms';
import {AuthenticationService} from '../lib/authentication.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { isNumeric } from 'rxjs/util/isNumeric';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

export function CheckPass(control){
    let user = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    if(control.value.length < 6){
      return {matkhaulength: true};
    } else if(control.value !== user.value.password){
        return {matkhau: true};
    }
} 

export function CheckDiem(control){
    if(control.value !== "")
    {
        if((control.value).indexOf(',')>0){
            let tmp = control.value.split(',');
            for (const diem of tmp) {
              if (Number.parseFloat(diem)<0 || Number.parseFloat(diem)>10 || (!isNumeric(diem)))
              {
                return {diem: true};
              }
            }
        }else if((control.value).indexOf(',') ===0 )
        {
            return {diem: true}
        }else {
            if (Number.parseFloat(control.value)<0 || Number.parseFloat(control.value)>10 || (!isNumeric(control.value)))
              {
                return {diem: true};
              }
        }
    }
    return;
} 

