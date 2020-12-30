import { Component, Injector, OnInit, ViewChild, Input  } from '@angular/core';
import { BaseComponent } from '../../../lib/base.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
import { AuthenticationService } from '../../../lib/authentication.service';
declare var $: any;
import * as CanvasJS from 'src/assets/js/canvasjs.min';

@Component({
  selector: 'app-diemtb',
  templateUrl: './diemtb.component.html',
  styleUrls: ['./diemtb.component.css']
})
export class DiemtbComponent extends BaseComponent implements OnInit {
  public diems: any;
  submitted = false;
  public dataChart=[];
  public MaHocKy: any;
  public monhocs:any;
  public MaMonHoc:any;
  constructor(injector: Injector,
    private authenticationService: AuthenticationService) {
    super(injector);
  }


  ngOnInit(): void {
    this.MaHocKy="22019";
    this.MaMonHoc="A";
    this._api.get('/api/monhoc/get-all').takeUntil(this.unsubscribe).subscribe(res => {
      this.monhocs=res;
    });
    this.SetChart(this.MaHocKy, this.MaMonHoc);
      
  }
  changedHocKy(e){
    this.MaHocKy=e;
    this.dataChart=[];
    this.SetChart(this.MaHocKy, this.MaMonHoc);
  }
  changedMonHoc(e){
    this.MaMonHoc=e;
    this.dataChart=[];
    this.SetChart(this.MaHocKy, this.MaMonHoc);
  }
  SetChart(MaHocKy, MaMonHoc)
  {
    this._api.get('/api/diem/get-tbmon-by-hk/'+MaHocKy).takeUntil(this.unsubscribe).subscribe(res => {
      this.diems = res;
      this.diems.forEach(val => {
        if(val.maMonHoc==MaMonHoc){
          this.dataChart.push({
            y:val.diemTB,
            label:val.tenlophoc
          }); 
        }
      });
      let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "Biểu đồ điểm trung bình môn theo lớp"
        },
        axisY: {
          title: "Thang điểm"
        },
        data: [{
          type: "column",
          legendMarkerColor: "grey",
          dataPoints: this.dataChart
        }]
      });
        
      chart.render();
    });
  }
}

