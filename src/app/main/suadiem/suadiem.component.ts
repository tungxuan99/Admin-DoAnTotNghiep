import { MustMatch, CheckDiem } from '../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild, Input  } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import {FormControl, FormGroup,FormArray } from '@angular/forms' 
import { BaseComponent } from '../../lib/base.component';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/takeUntil';
declare var $: any;
import Swal from 'sweetalert2/dist/sweetalert2.js'; 
import { isNumeric } from 'rxjs/util/isNumeric';

@Component({
  selector: 'app-suadiem',
  templateUrl: './suadiem.component.html',
  styleUrls: ['./suadiem.component.css']
})
export class SuadiemComponent extends BaseComponent implements OnInit {
  public hocsinhs: any;
  public lophocs: any;
  public monhocs: any;
  public formds: any;
  public formdata: any;
  public formDiem: any;
  DSDiem: FormArray;
  public isCreate:any;
  public check: any;
  public maMonHoc: any;
  public maLopHoc: any;
  public NamHoc: any;
  public KyHoc: any;
  public MaHocKy: any;
  submitted = false;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private fb: FormBuilder, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.formds = this.fb.group({
    'MaLop': [''],
    'MonHoc': [''],
    'HocKy': [''],
    'NamHoc': [''],     
  });
  let tmptoday= new Date();
  this.NamHoc = (tmptoday.getFullYear() -1).toString() +" - "+ tmptoday.getFullYear().toString();
  if(tmptoday.getMonth()<2||tmptoday.getMonth()>=8)
    {
      this.KyHoc = 1;
    }else{
      this.KyHoc = 2
    }
    this.formds.get('HocKy').setValue(this.KyHoc);
    this.formds.get('NamHoc').setValue(tmptoday.getFullYear());
  this.check=true;
  this.isCreate=false;
  this._api.get('/api/lophoc/get-all').takeUntil(this.unsubscribe).subscribe(res => {
    this.lophocs= res;
    this.formds.get('MaLop').setValue(this.lophocs[0].maLopHoc);
    
    });
  this._api.get('/api/monhoc/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.monhocs= res;
      this.formds.get('MonHoc').setValue(this.monhocs[0].maMonHoc);
      });
}
get f() { return this.formdata.controls; }

  LayDS(){
    this.check= false;
    this.isCreate=true;
    this.maLopHoc=this.formds.get('MaLop').value;
    this.maMonHoc=this.formds.get('MonHoc').value;
    this.MaHocKy = (this.formds.get('HocKy').value).toString() + (this.formds.get('NamHoc').value).toString();
    this._api.get('/api/diem/xem-diem-tb-mon-by-mon/'+this.maLopHoc+'/'+this.MaHocKy+'/'+this.maMonHoc).takeUntil(this.unsubscribe).subscribe(res => {
        this.hocsinhs= res;
        console.log(this.hocsinhs);
        this.formDiem= this.fb.group({
            'MaLopHoc':[this.maLopHoc],
            'MaMonHoc':[this.maMonHoc],
            DSDiem: this.fb.array([])
        });
        this.hocsinhs.forEach(element => {
          this.DSDiemList.push(this.addDS(
              element.maHS, 
              element.tenHS,
              element.id,
              element.diemMieng,
              element.diem15Phut,
              element.diem1Tiet,
              element.diemHK,));
        });
      });

  }
  get DSDiemList() {
    return this.formDiem.get('DSDiem') as FormArray;
 }
  addDS(maHS, tenHS, MaDiem, diemMieng, diem15Phut, diem1Tiet, diemHK): FormGroup {
    return this.fb.group({
      MaHS: [maHS],
      TenHS: [tenHS],
      MaDiem: [MaDiem],
      DiemMieng: [diemMieng,[CheckDiem]],
      Diem15Phut: [diem15Phut,[CheckDiem]],
      Diem1Tiet: [diem1Tiet,[CheckDiem]],
      DiemHocKy: [diemHK,[CheckDiem]],
    });
  }
  
   CreateDiem(id: any, maHS: any, maHocKy: any, maMonHoc: any,
             maLopHoc: any, diemMieng: string, diem15Phut: string,
             diem1Tiet: string, diemHK: string ){
    let tbMieng: number=0.0;
    let tb15p: number=0.0;
    let tb1Tiet: number=0.0;
    let DiemTB:number=0.0;
    if(diemMieng.indexOf(',')>=0){
      let tmp = diemMieng.split(',');
      for (const diem of tmp) {
        tbMieng=tbMieng+ Number.parseFloat(diem);
      }
      tbMieng= tbMieng/tmp.length;
    }else {tbMieng=Number.parseFloat(diemMieng)}
    if(diem15Phut.indexOf(',')>=0){
      let tmp = diem15Phut.split(',');
      for (const diem of tmp) {
        tb15p=tb15p+ Number.parseFloat(diem);
      }
      tb15p= tb15p/tmp.length;
    }else {tb15p=Number.parseFloat(diem15Phut)}
    if(diem1Tiet.indexOf(',')>=0){
      let tmp = diem1Tiet.split(',');
      for (const diem of tmp) {
        tb1Tiet=tb1Tiet+ Number.parseFloat(diem);
      }
      tb1Tiet= tb1Tiet/tmp.length;
    }else {tb1Tiet=Number.parseFloat(diem1Tiet)}
    DiemTB=tbMieng+tb15p+tb1Tiet*2+(Number.parseFloat(diemHK)) * 3;
    DiemTB=DiemTB/7;
    let data={
      id: id,
      MaHocKy: maHocKy,
      MaMonHoc:maMonHoc,
      MaHS:maHS,
      MaLopHoc:maLopHoc,
      DiemMieng:diemMieng,
      Diem15Phut:diem15Phut,
      Diem1Tiet:diem1Tiet,
      DiemHK:diemHK,
      DiemTB:DiemTB
    };
    this._api.post('/api/diem/update-diem',data).takeUntil(this.unsubscribe).subscribe(res => {
      });
  }
    
  onSubmit(form: any): void{
    this.submitted = true;
      console.log(this.DSDiemList.controls);
      if (this.DSDiemList.status === "INVALID") {
        return;
      }
    let MaHocKy=this.MaHocKy;
      (form.DSDiem).forEach(element => {
        let maHK=MaHocKy;
        let maMonHoc= form.MaMonHoc;
        let maLopHoc= form.MaLopHoc;
        let maHS= element.MaHS;
        let diemMieng=element.DiemMieng;
        let diem15Phut= element.Diem15Phut;
        let diem1Tiet= element.Diem1Tiet;
        let diemHK= element.DiemHocKy;
        let id = element.MaDiem; 
        this.CreateDiem(id,maHS,maHK,maMonHoc,maLopHoc,diemMieng,diem15Phut,diem1Tiet,diemHK);
      });
    Swal.fire(
      'Thành công!',
      'Sửa điểm thành công',
      'success'
    );
    setTimeout(() => {
    window.location.reload();
    }, 1000)
  }
}
