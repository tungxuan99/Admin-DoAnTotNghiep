import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../../lib/auth.guard';
import { Role } from '../../models/role';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { Top10diemComponent } from './top10diem/top10diem.component';



@NgModule({
  declarations: [Top10diemComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: 'top10diem',
        component: Top10diemComponent,
      },
    ])
  ]
})
export class ThongkeModule { }
