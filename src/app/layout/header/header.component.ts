import { Component, OnInit, Injector } from '@angular/core';
import { AuthenticationService } from 'src/app/lib/authentication.service';
import { FormBuilder, Validators} from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms' 
import { BaseComponent } from '../../lib/base.component';
import { MustMatch, CheckPass } from '../../helpers/must-match.validator';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/takeUntil';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
declare var $: any;


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit {
  public formUser: any;
  public user : any;
  public doneSetup: any;  
  public ShowModal:any;
  public isCreate:any;
  submitted = false;

  constructor(private fb: FormBuilder, injector: Injector,private authenticationService: AuthenticationService) { 
    super(injector);
  }

  ngOnInit(): void {
    this.user = this.authenticationService.userValue;
  }
  logout() {
    this.authenticationService.logout();
  }
  get fr() { return this.formUser.controls; }

  onSubmit(value) {
    this.submitted = true;
    if (this.formUser.invalid) {
      console.log(this.fr)
      return;
    }else { 
    let tmp = {
      HoTen:this.user.hoTen,
      username:this.user.username,
      password:value.newPassWord,
      level:this.user.level,   
      id:this.user.id,          
      };
    this._api.post('/api/users/update-user',tmp).takeUntil(this.unsubscribe).subscribe(res => {
      Swal.fire(
        'Đã cập nhật!',
        'Cập nhật thành công',
        'success'
      );
      this.Close();
      });
    }
  } 

  ResetModal() {  
    this.formUser = this.fb.group({
      'oldPassWord': ['', [CheckPass]],
      'newPassWord': ['', Validators.required, Validators.minLength(6)],
      'newPassWord1': ['', Validators.required, Validators.minLength(6)],
    }, {
      validator: MustMatch('newPassWord', 'newPassWord1'), 
    }); 
    this.submitted = false;
  }

  public openUpdateModal() {
    this.doneSetup = false;
    this.ShowModal = true; 
    setTimeout(() => {
      $('#updateUserModal').modal('toggle');
      this.formUser = this.fb.group({
        'oldPassWord': ['', [CheckPass]],
        'newPassWord': ['', [Validators.required, Validators.minLength(6)]],
        'newPassWord1': ['',  [Validators.required, Validators.minLength(6)]],
      }, {
        validator: [MustMatch('newPassWord', 'newPassWord1')]
      }); 
      this.doneSetup = true;
    }, 100);
  }

  Close() {
    $('#updateUserModal').closest('.modal').modal('hide');
  } 
  
}