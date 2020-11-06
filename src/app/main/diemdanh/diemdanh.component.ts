import { MustMatch } from '../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild, Input  } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms' 
import { BaseComponent } from '../../lib/base.component';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/takeUntil';
import {formatDate } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-diemdanh',
  templateUrl: './diemdanh.component.html',
  styleUrls: ['./diemdanh.component.css']
})
export class DiemdanhComponent extends BaseComponent implements OnInit {
  public hocsinhs: any;
  public lophocs: any;
  public totalRecords:any;
  public pageSize = 3;
  public page = 1;
  public uploadedFiles: any[] = [];
  public formds: any;
  public formdata: any;
  public doneSetupForm: any;  
  public showUpdateModal:any;
  public isCreate:any;
  public check: any;
  submitted = false;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private fb: FormBuilder, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.formds = this.fb.group({
      'MaLop': [''],
      'Buoi': [''],     
    });
    this.check=true;
    this.isCreate=false;
    this._api.get('/api/lophoc/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.lophocs= res;
      console.log(this.lophocs);
      });
    
  }
  get f() { return this.formdata.controls; }

  onSubmit(value) {
    if (this.formdata.invalid) {
      return;
    }
    // var today = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss Z');
    this.hocsinhs.forEach(element => {
      let tmp = {
        MaLopHoc: value.tenlop ,
        Magv:value.tenlop,
        Buoi:value.khoihoc,
        NgayDD:value.khoihoc,       
        };
      this._api.post('/api/diemdanh/create-diem-danh',tmp).takeUntil(this.unsubscribe).subscribe(res => {
        });
    });
    
  } 

  LayDS(){
    this.check= false;
    this.isCreate=true;
    this._api.get('/api/hocsinh/get-by-lop/'+this.formds.get('MaLop').value).takeUntil(this.unsubscribe).subscribe(res => {
      this.hocsinhs= res;
      });

  }

}
