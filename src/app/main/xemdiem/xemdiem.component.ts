import { MustMatch } from '../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild, Input  } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms' 
import { BaseComponent } from '../../lib/base.component';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/takeUntil';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../../lib/authentication.service';
declare var $: any;


@Component({
  selector: 'app-xemdiem',
  templateUrl: './xemdiem.component.html',
  styleUrls: ['./xemdiem.component.css']
})
export class XemdiemComponent extends BaseComponent implements OnInit {
  public tintuc: any;
  public diems: any;
  submitted = false;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private fb: FormBuilder, injector: Injector,
    private datePipe: DatePipe,private authenticationService: AuthenticationService) {
    super(injector);
  }

  ngOnInit(): void {
    this._api.get('/api/diem/get-by-hs-hk/'+this.authenticationService.userValue.username+"/"+'22019').takeUntil(this.unsubscribe).subscribe(res => {
      this.diems = res;
      console.log(this.diems);
      });
  }
  changed(e){
    this._api.get('/api/diem/get-by-hs-hk/'+this.authenticationService.userValue.username+"/"+e).takeUntil(this.unsubscribe).subscribe(res => {
      this.diems = res;
      });
}

}
