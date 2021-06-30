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
  selector: 'app-xemdiem',
  templateUrl: './xemdiem.component.html',
  styleUrls: ['./xemdiem.component.css']
})
export class XemdiemComponent extends BaseComponent implements OnInit {
  public tintuc: any;
  public diems: any;
  public DiemTBHocKy: any;
  public user:any;
  submitted = false;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private fb: FormBuilder, injector: Injector,
    private datePipe: DatePipe,private authenticationService: AuthenticationService) {
    super(injector);
  }

  ngOnInit(): void {
    this._api.get('/api/diem/get-by-hs-hk/'+this.authenticationService.userValue.username+"/"+'22019').takeUntil(this.unsubscribe).subscribe(res => {
      this.diems = res;
      this.DiemTBHocKy= this.TinhDiemTB(this.diems);
      });
    this.user=this.authenticationService.userValue;
  }
  changed(e){
    this._api.get('/api/diem/get-by-hs-hk/'+this.authenticationService.userValue.username+"/"+e).takeUntil(this.unsubscribe).subscribe(res => {
      this.diems = res;
      this.DiemTBHocKy= this.TinhDiemTB(this.diems);
      });
  }
  TinhDiemTB(Diem:any[]){
    let diemTB=0.0;
    Diem.forEach(val=>{
      if(val.maMonHoc=='T' || val.maMonHoc=='V')
      {
        diemTB+= parseFloat(val.diemTB)+parseFloat(val.diemTB);
      }else{
      diemTB+=val.diemTB;
      }
    });
    diemTB=diemTB/(Diem.length+2);
    diemTB = Math.round(diemTB * 100)/100;
    return diemTB;
  }
  SavePDF(): void {
    let data = document.getElementById('couponPage');
    html2canvas(data).then(canvas => {
      let imgWidth = 190;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');
      var position = 1;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('Diem.pdf');
    });
  }

}
