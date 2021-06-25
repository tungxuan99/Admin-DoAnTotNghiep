import { MustMatch } from '../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild, Input  } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormGroup, FormArray, FormBuilder,
  Validators,ReactiveFormsModule  } from '@angular/forms';
import { BaseComponent } from '../../lib/base.component';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/takeUntil';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../../lib/authentication.service';
declare var $: any;


@Component({
  selector: 'app-xemdiemhk',
  templateUrl: './xemdiemhk.component.html',
  styleUrls: ['./xemdiemhk.component.css']
})
export class XemdiemhkComponent extends BaseComponent implements OnInit {
  public diems:any;
  public mon:any;
  public hocsinh:any;
  public formsearch: any;
  submitted = false;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private fb: FormBuilder, injector: Injector,
    private datePipe: DatePipe,private authenticationService: AuthenticationService) {
    super(injector);
  }

  ngOnInit(): void {
    this.formsearch = this.fb.group({
      'Search': ['']     
    });
    this._api.get('/api/monhoc/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.mon = res;
      });
      this._api.get('/api/diem/xem-diem-hk/'+this.authenticationService.userValue.username+'/'+'22019').takeUntil(this.unsubscribe).subscribe(res => {
        this.diems = res;
        });

        this._api.get('/api/hocsinh/get-by-ten-mahs/'+this.authenticationService.userValue.username).takeUntil(this.unsubscribe).subscribe(res => {
          this.hocsinh = res;
          });
  }
  search() {
    this._api.get('/api/diem/xem-diem-hk/'+this.formsearch.get('Search').value+'/'+'22019').takeUntil(this.unsubscribe).subscribe(res => {
      this.diems = res;
      });
      this._api.get('/api/hocsinh/get-by-ten-mahs/'+this.formsearch.get('Search').value).takeUntil(this.unsubscribe).subscribe(res => {
        this.hocsinh = res;
        });

  }

}
