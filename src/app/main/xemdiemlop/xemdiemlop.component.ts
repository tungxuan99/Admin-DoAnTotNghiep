import { Component, Injector, OnInit  } from '@angular/core';
import { FormGroup, FormArray, FormBuilder,
  Validators,ReactiveFormsModule  } from '@angular/forms';
import { BaseComponent } from '../../lib/base.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../../lib/authentication.service';
import { Student} from '../../models/student';
import jsPDF from 'jspdf';
// import 'jspdf-autotable';
import html2canvas from 'html2canvas';
declare var $: any;

@Component({
  selector: 'app-xemdiemlop',
  templateUrl: './xemdiemlop.component.html',
  styleUrls: ['./xemdiemlop.component.css']
})
export class XemdiemlopComponent extends BaseComponent implements OnInit {
  public diems:any;
  public monhocs:any;
  public lophocs: any;
  public form: any;
  public check: any;
  public isCreate: any;
  public MaLop: any;
  constructor(private fb: FormBuilder, injector: Injector,
    private datePipe: DatePipe,private authenticationService: AuthenticationService) {
    super(injector);
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      'MaLop': [''],
      'MaHocKy': [''],     
    });
    
    
    this.check=true;
    this._api.get('/api/lophoc/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.lophocs= res;
      this.form.get('MaLop').setValue(this.lophocs[0].maLopHoc);
      this.form.get('MaHocKy').setValue('22019');
      
      });
      this._api.get('/api/monhoc/get-all').takeUntil(this.unsubscribe).subscribe(res => {
        this.monhocs= res;
        });
  }

  LayDS(){
    this.check= false;
    this.isCreate=true;
    this.MaLop= this.form.get('MaLop').value;
    this._api.get('/api/diem/xem-diem-tb-mon-by-lop/'+this.form.get('MaLop').value + '/' + this.form.get('MaHocKy').value).takeUntil(this.unsubscribe).subscribe(res => {
        this.diems= this.XuLyData(res);
      });

  }

  XuLyData(data) {
    let newdata = new Array();
    data.map(val =>{
      let dsDiem = (val.danhSachDiem).split(',');
      let dsMaMon = (val.danhSachMon).split(',');
      let hocsinh = new Student();
      hocsinh.MaHS= val.maHS;
      hocsinh.TenHS= val.tenHS;
      hocsinh.NgaySinh= val.ngaySinh;
      hocsinh.GioiTinh = val.gioiTinh;
      let diemtb = 0.0;
      dsMaMon.map((res, index) => {
        switch(res){
          case 'A':
            hocsinh.TiengAnh = parseFloat(dsDiem[index]);
            diemtb+= parseFloat(dsDiem[index]);
            break;
          case 'CN':
            hocsinh.CongNghe = parseFloat(dsDiem[index]);
            diemtb+= parseFloat(dsDiem[index]);
            break;
          case 'GD':
            hocsinh.GiaoDuc = parseFloat(dsDiem[index]);
            diemtb+= parseFloat(dsDiem[index]);
            break;
          case 'H':
            hocsinh.HoaHoc = parseFloat(dsDiem[index]);
            diemtb+= parseFloat(dsDiem[index]);
            break;
          case 'S':
            hocsinh.LichSu = parseFloat(dsDiem[index]);
            diemtb+= parseFloat(dsDiem[index]);
            break;
          case 'Si':
              hocsinh.SinhHoc = parseFloat(dsDiem[index]);
              diemtb+= parseFloat(dsDiem[index]);
              break;
          case 'T':
              hocsinh.Toan = parseFloat(dsDiem[index]);
              diemtb+= parseFloat(dsDiem[index])*2;
              break;
          case 'Ti':
              hocsinh.TinHoc = parseFloat(dsDiem[index]);
              diemtb+= parseFloat(dsDiem[index]);
              break;
          case 'V':
              hocsinh.Van = parseFloat(dsDiem[index]);
              diemtb+= parseFloat(dsDiem[index])*2;
              break;   
        }
        
      })
      diemtb=diemtb/(dsDiem.length+2);
      hocsinh.DiemTB = Math.round(diemtb * 100)/100;
      newdata.push(new Object(hocsinh));
    });
    return newdata;
  }

  SavePDF(): void {
    let data = document.getElementById('couponPage');
    html2canvas(data).then(canvas => {
      let imgWidth = 280;
      let imgHeight = canvas.height * imgWidth / canvas.width; 
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('l', 'mm', 'a4');
      var position = 6;
      pdf.addImage(contentDataURL, 'PNG', 6, position, imgWidth, imgHeight)
      pdf.save('Diem.pdf'); 
    });
  }



}
