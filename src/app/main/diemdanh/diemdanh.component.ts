import { MustMatch } from '../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild, Input  } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormArray, FormBuilder, Validators} from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms' 
import { BaseComponent } from '../../lib/base.component';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/takeUntil';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../../lib/authentication.service';
declare var $: any;

@Component({
  selector: 'app-diemdanh',
  templateUrl: './diemdanh.component.html',
  styleUrls: ['./diemdanh.component.css']
})
export class DiemdanhComponent extends BaseComponent implements OnInit {
  public hocsinhs: any;
  public lophocs: any;
  public diemdanh:any;
  public totalRecords:any;
  public pageSize = 3;
  public page = 1;
  public uploadedFiles: any[] = [];
  public formds: any;
  public formdata: any;
  public DSHS: FormArray;
  public doneSetupForm: any;  
  public showUpdateModal:any;
  public isCreate:any;
  public check: any;
  public Buoi:any;
  public MaLop:any;
  submitted = false;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private fb: FormBuilder, injector: Injector,private datePipe: DatePipe,private authenticationService: AuthenticationService) {
    super(injector);
  }

  ngOnInit(): void {
    this.formds = this.fb.group({
      'MaLop': [''],
      'Buoi': [''],     
    });
    this.formds.get('Buoi').setValue('Sang');
    this.check=true;
    this.isCreate=false;
    this._api.get('/api/lophoc/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.lophocs= res;
      this.formds.get('MaLop').setValue(this.lophocs[0].maLopHoc);
      });
    
  }
  get f() { return this.formdata.controls; }

  onSubmit(form: any): void{
    console.log(form);
    let date= new Date();
    let ngay =this.datePipe.transform(date,"yyyy-MM-dd");
    let tmp = {
      MaLopHoc: this.MaLop ,
      Magv:this.authenticationService.userValue.id,
      Buoi:this.Buoi,
      NgayDD:ngay,       
      };
      this._api.post('/api/diemdanh/create-diem-danh',tmp).takeUntil(this.unsubscribe).subscribe(res => {
        this._api.get('/api/diemdanh/get-all').takeUntil(this.unsubscribe).subscribe(res => {
          this.diemdanh=res;
          form.DSHS.forEach(val => {
            
            let cttmp={
              MaDD:this.diemdanh[0].maDD,
              MaHS:val.MaHS,
              TrangThai:val.TrangThai
            };
            console.log(cttmp);
            this._api.post('/api/ctdiemdanh/create-ctdiem-danh',cttmp).takeUntil(this.unsubscribe).subscribe(res => {});
          });
          alert("Điểm danh thành công!");
            window.location.reload();
        });
      });
    
    
  } 

  LayDS(){
    this.check= false;
    this.isCreate=true;
    this.Buoi=this.formds.get('Buoi').value;
    this.MaLop=this.formds.get('MaLop').value;
    this._api.get('/api/hocsinh/get-by-lop/'+this.formds.get('MaLop').value).takeUntil(this.unsubscribe).subscribe(res => {
      this.hocsinhs= res;
      this.formdata=this.fb.group({
        'Buoi':[this.Buoi],
        'MaLop': [this.MaLop],
        DSHS: this.fb.array([])
        });
        this.hocsinhs.forEach(element => {
          this.DSHSList.push(this.addDS(element.maHS, element.tenHS, element.gioiTinh));
        });
      });

  }
  addDS(maHS, tenHS, gioiTinh): FormGroup {
    return this.fb.group({
      MaHS: [maHS],
      TenHS: [tenHS],
      GioiTinh: [gioiTinh],
      TrangThai: ['0'],
    });
  }
  get DSHSList() {
    return this.formdata.get('DSHS') as FormArray;
 }

}
