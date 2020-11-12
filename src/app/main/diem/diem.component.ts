import { MustMatch } from '../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild, Input  } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import {FormControl, FormGroup,FormArray } from '@angular/forms' 
import { BaseComponent } from '../../lib/base.component';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/takeUntil';
declare var $: any;

@Component({
  selector: 'app-diem',
  templateUrl: './diem.component.html',
  styleUrls: ['./diem.component.css']
})
export class DiemComponent extends BaseComponent implements OnInit {
  public hocsinhs: any;
  public lophocs: any;
  public monhocs: any;
  public formds: any;
  public formdata: any;
  projects: FormArray;
  public isCreate:any;
  public check: any;
  public maMonHoc: any;
  public maLopHoc: any;
  submitted = false;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private fb: FormBuilder, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {this.formds = this.fb.group({
    'MaLop': [''],
    'MonHoc': [''],     
  });
  
  this.check=true;
  this.isCreate=false;
  this._api.get('/api/lophoc/get-all').takeUntil(this.unsubscribe).subscribe(res => {
    this.lophocs= res;
    console.log(this.lophocs);
    });
    this._api.get('/api/monhoc/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.monhocs= res;
      console.log(this.monhocs);
      });
  
}
get f() { return this.formdata.controls; }

LayDS(){
    this.check= false;
    this.isCreate=true;
    this.maLopHoc=this.formds.get('MaLop').value;
    this.maMonHoc=this.formds.get('MonHoc').value;
    this._api.get('/api/hocsinh/get-by-lop/'+this.formds.get('MaLop').value).takeUntil(this.unsubscribe).subscribe(res => {
      this.hocsinhs= res;
        this.formdata = this.fb.array([]
          );
        for (let index = 0; index < this.hocsinhs.length; index++) {
          this.formdata.push(this.createProject(null));
        }
          
        
      });
      
    // for (let index = 0; index < this.hocsinhs; index++) {
      
    // };
    // this.formdata = this.fb.group({
      
    // });  

  }
  createProject(project): FormGroup {
    return this.fb.group({
      DiemMieng: project.DiemMieng,
      Diem15Phut: project.Diem15Phut,
      Diem1Tiet:project.Diem1Tiet,
      DiemHK:project.DiemHK
    });
  }
   CreateDiem(maHS: any, maHocKy: any, maMonHoc: any,
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
      MaHocKy: maHocKy,
      MaMonHoc:maMonHoc,
      MaHS:maHS,
      MaLopHoc:maLopHoc,
      DiemMieng:diemMieng,
      Diem15P:diem15Phut,
      DiemHK:diemHK,
      DiemTB:DiemTB
    };
    this._api.post('/api/diem/create-diem',data).takeUntil(this.unsubscribe).subscribe(res => {
      console.log("ok");
      });
  }
    
  onSubmit(value){
    for (let index = 0; index < this.hocsinhs.length; index++) {
      let maHK="22020";
      let maMonHoc= this.maMonHoc;
      let maLopHoc= this.maLopHoc;
      let maHS= this.hocsinhs[index].maHS;
      let madiemMieng="DiemMieng"+index;
      let diemMieng= value.madiemMieng;
      let madiem15phut="Diem15Phut"+index;
      let diem15Phut= value.madiem15phut;
      let madiem1tiet="Diem1Tiet"+index;
      let diem1Tiet= value.madiem1tiet;
      let madiemhk="DiemHK"+index;
      let diemHK= value.madiemhk;
      console.log(diemHK);
      // this.CreateDiem(maHS,maHK,maMonHoc,maLopHoc,diemMieng,diem15Phut,diem1Tiet,diemHK);
    }
  }
}
