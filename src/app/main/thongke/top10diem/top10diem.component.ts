import { MustMatch } from '../../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild, Input  } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms' 
import { BaseComponent } from '../../../lib/base.component';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/takeUntil';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../../../lib/authentication.service';
declare var $: any;

@Component({
  selector: 'app-top10diem',
  templateUrl: './top10diem.component.html',
  styleUrls: ['./top10diem.component.css']
})
export class Top10diemComponent extends BaseComponent implements OnInit {
  public hocsinhs: any;
  constructor(private fb: FormBuilder, injector: Injector,
    private datePipe: DatePipe,private authenticationService: AuthenticationService) {
    super(injector);
  }

  ngOnInit(): void {
    this._api.get('/api/diem/top-10-diem-by-hk/22019').takeUntil(this.unsubscribe).subscribe(res => {
      this.hocsinhs = res;
      console.log(this.hocsinhs);
      });
  }
  changed(e){
    this._api.get('/api/diem/top-10-diem-by-hk/'+e).takeUntil(this.unsubscribe).subscribe(res => {
      this.hocsinhs = res;
      });
}

}
