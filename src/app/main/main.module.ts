import { NgModule} from '@angular/core';
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



export const mainRoutes: Routes = [
  {
      path: '', component: MainComponent,
      children: [
        {
            path: '', component: DashbroadComponent,
        },
        {
          path: 'unauthorized',
          component: UnauthorizedComponent,
        },
        {
          path: 'user',
          loadChildren: () =>
            import('./user/user.module').then((m) => m.UserModule),
          canActivate: [RoleGuard],
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
  ]
})
export class MainModule { }
