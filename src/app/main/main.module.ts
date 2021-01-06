import { forwardRef, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '../layout/header/header.component';
import { MenuComponent } from '../layout/menu/menu.component';
import { DashbroadComponent } from '../main/dashbroad/dashbroad.component';
import { RoleGuard } from '../lib/auth.guard';
import { Role } from '../models/role';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { UnauthorizedComponent } from '../shared/unauthorized/unauthorized.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HocsinhComponent } from './hocsinh/hocsinh.component';
import { GiaovienComponent } from './giaovien/giaovien.component';
import { LophocComponent } from './lophoc/lophoc.component';
import { MonhocComponent } from './monhoc/monhoc.component';
import { DiemdanhComponent } from './diemdanh/diemdanh.component';
import { TintucComponent } from './tintuc/tintuc.component';
import { DiemComponent } from './diem/diem.component';
import { XemdiemComponent } from './xemdiem/xemdiem.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { XemdiemhkComponent } from './xemdiemhk/xemdiemhk.component';
import { ExportDiemComponent } from './export-diem/export-diem.component';



export const mainRoutes: Routes = [
  {
      path: '', component: MainComponent,
      children: [
        {
            path: '', component: DashbroadComponent,
            canActivate: [RoleGuard],
          data: { roles: [Role.Admin, Role.User] },
        },
        {
          path: 'unauthorized',
          component: UnauthorizedComponent,
        },
        {
          path: 'hocsinh',
          component: HocsinhComponent,
          canActivate: [RoleGuard],
          data: { roles: [Role.Admin] },
        },
        {
          path: 'giaovien',
          component: GiaovienComponent,
          canActivate: [RoleGuard],
          data: { roles: [Role.Admin] },
        },
        {
          path: 'lophoc',
          component: LophocComponent,
          canActivate: [RoleGuard],
          data: { roles: [Role.Admin] },
        },
        {
          path: 'monhoc',
          component: MonhocComponent,
          canActivate: [RoleGuard],
          data: { roles: [Role.Admin] },
        },
        {
          path: 'tintuc',
          component: TintucComponent,
          canActivate: [RoleGuard],
          data: { roles: [Role.Admin] },
        },
        {
          path: 'diemdanh',
          component: DiemdanhComponent,
          canActivate: [RoleGuard],
          data: { roles: [Role.Admin, Role.User] },
        },
        {
          path: 'diem',
          component: DiemComponent,
          canActivate: [RoleGuard],
          data: { roles: [Role.Admin, Role.User] },
        },
        {
          path: 'xemdiem',
          component: XemdiemComponent,
          canActivate: [RoleGuard],
          data: { roles: [Role.Student] },
        },
        {
          path: 'xemdiemhk',
          component: XemdiemhkComponent,
          canActivate: [RoleGuard],
          data: { roles: [Role.Student] },
        },
        {
          path: 'exportDiem',
          component: ExportDiemComponent,
          canActivate: [RoleGuard],
        },
        {
          path: 'user',
          loadChildren: () =>
            import('./user/user.module').then((m) => m.UserModule),
          canActivate: [RoleGuard],
          data: { roles: [Role.Admin] },
        },
        {
          path: 'thongke',
          loadChildren: () =>
            import('../main/thongke/thongke.module').then((m) => m.ThongkeModule),
          canActivate: [RoleGuard],
          data: { roles: [Role.Admin] },
        },
      ]
  }
];
@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    DashbroadComponent,
    MainComponent,
    SidebarComponent,
    HocsinhComponent,
    GiaovienComponent,
    LophocComponent,
    MonhocComponent,
    DiemdanhComponent,
    TintucComponent,
    DiemComponent,
    XemdiemComponent,
    XemdiemhkComponent,
    ExportDiemComponent
    
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(mainRoutes)
  ],  
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})
export class MainModule { }
