import { Component, Injector, OnInit, ViewChild, Input  } from '@angular/core';
import { BaseComponent } from '../../../lib/base.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
import { AuthenticationService } from '../../../lib/authentication.service';
declare var $: any;
import * as CanvasJS from 'src/assets/js/canvasjs.min';
@Component({
  selector: 'app-diem-tbky-hoc',
  templateUrl: './diem-tbky-hoc.component.html',
  styleUrls: ['./diem-tbky-hoc.component.css']
})
export class DiemTBKyHocComponent extends BaseComponent implements OnInit {
  public diems: any;
  submitted = false;
  public dataChart=[];
  public MaHocKy: any;
  public lophocs:any;
  public MaLopHoc:any;
  public KhoiHoc:any;
  public DiemTB:any;
  constructor(injector: Injector,
    private authenticationService: AuthenticationService) {
    super(injector);
  }

  ngOnInit(): void {
    this.MaHocKy='22019';
    this.MaLopHoc='';
    this.KhoiHoc='';
    this._api.get('/api/lophoc/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.lophocs=res;
    });
    this.SetChart(this.MaHocKy, this.MaLopHoc, this.KhoiHoc);
  }
  changedHocKy(e){
    this.MaHocKy=e;
    this.dataChart=[];
    if(this.KhoiHoc.length>0)
    {
      this.SetChart(this.MaHocKy, '', this.KhoiHoc);
    }else{
      this.SetChart(this.MaHocKy, this.MaLopHoc, '');
    }
    
  }
  changedLopHoc(e){
    this.MaLopHoc=e;
    this.dataChart=[];
    $('#KhoiHoc').val('');
    this.SetChart(this.MaHocKy, this.MaLopHoc, '');
  }
  changedKhoiHoc(e){
    this.KhoiHoc=e;
    this.dataChart=[];
    $('#MaLopHoc').val('');
    this.SetChart(this.MaHocKy, '', this.KhoiHoc);
  }
  SetChart(MaHocKy, MaLopHoc, KhoiHoc)
  {
    this._api.get('/api/diem/get-diemtb-by-hk/'+MaHocKy).takeUntil(this.unsubscribe).subscribe(res => {
      this.DiemTB=res;
      let gioi=[];
      let kha=[];
      let tb=[];
      let yeu=[];
      if(KhoiHoc.length>0){
        let tmp=this.DiemTB.filter(s => s.khoiHoc==KhoiHoc);
        gioi=tmp.filter(s=> s.diemTB<8.0);
        kha=tmp.filter(s=> s.diemTB<8.0 && s.diemTB>=6.5);
        tb=tmp.filter(s=> s.diemTB<6.5 && s.diemTB>=5.0);
        yeu=tmp.filter(s=> s.diemTB<5.0);
      }else if(MaLopHoc.length>0){
        let tmp=this.DiemTB.filter(s => s.maLopHoc==MaLopHoc);
        gioi=tmp.filter(s=> s.diemTB<8.0);
        kha=tmp.filter(s=> s.diemTB<8.0 && s.diemTB>=6.5);
        tb=tmp.filter(s=> s.diemTB<6.5 && s.diemTB>=5.0);
        yeu=tmp.filter(s=> s.diemTB<5.0);
      }else{
        gioi=this.DiemTB.filter(s=> s.diemTB<8.0);
        kha=this.DiemTB.filter(s=> s.diemTB<8.0 && s.diemTB>=6.5);
        tb=this.DiemTB.filter(s=> s.diemTB<6.5 && s.diemTB>=5.0);
        yeu=this.DiemTB.filter(s=> s.diemTB<5.0);
      }
      this.dataChart=[
        {
          y: gioi.length, name: "Giỏi"
        },
        {
          y: kha.length, name: "Khá"
        },
        {
          y: tb.length, name: "Trung bình"
        },
        {
          y: yeu.length, name: "Yếu"
        },
      ];
      console.log(this.dataChart);
      let chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: true,
        title:{
          text: "Biểu đồ tỉ lệ loại học sinh"
        },
        data: [{
          type: "pie",
          showInLegend: true,
          toolTipContent: "<b>{name}</b>: {y} học sinh (#percent%)",
          indexLabel: "{name} - #percent%",
          dataPoints: this.dataChart
        }]
      });
        
      chart.render();
    });
    
    
  }

}
