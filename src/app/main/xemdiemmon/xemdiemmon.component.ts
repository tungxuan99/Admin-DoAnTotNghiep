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
import jsPDF from 'jspdf';
// import 'jspdf-autotable';
import html2canvas from 'html2canvas';
declare var $: any;


@Component({
  selector: 'app-xemdiemmon',
  templateUrl: './xemdiemmon.component.html',
  styleUrls: ['./xemdiemmon.component.css']
})
export class XemdiemmonComponent extends BaseComponent implements OnInit {
  public diems:any;
  public monhoc:any = 'V';
  public monhocs: any;
  public lophocs: any;
  public tenmon =  'Văn';
  public kyhoc:any = '22019';
  public lophoc:any = '10A1';
  constructor(private fb: FormBuilder, injector: Injector,
    private datePipe: DatePipe,private authenticationService: AuthenticationService) {
    super(injector);
  }

  ngOnInit(): void {
    this._api.get('/api/diem/xem-diem-tb-mon-by-mon/10A1/22019/A').takeUntil(this.unsubscribe).subscribe(res => {
      this.diems = res;
    });
    this._api.get('/api/monhoc/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.monhocs= res;
      });
    this._api.get('/api/lophoc/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.lophocs= res;
      });

  }

  changedLop(e) {
    this.lophoc = e;
    this.SetData();
  }
  changedMon(e) {
    this.monhoc = e;
    let tmp = this.monhocs.filter(mh => mh.maMonHoc === e);
    this.tenmon = tmp[0].tenMonHoc;
    this.SetData();
  }
  changedKy(e) {
    this.kyhoc = e;
    this.SetData();
  }
  SetData() {
    this._api.get('/api/diem/xem-diem-tb-mon-by-mon/'+this.lophoc+'/'+this.kyhoc+'/'+this.monhoc).takeUntil(this.unsubscribe).subscribe(res => {
      this.diems = res;
    });
  }

}
