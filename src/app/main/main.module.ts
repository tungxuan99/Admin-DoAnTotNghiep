import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '../layout/header/header.component';
import { MenuComponent } from '../layout/menu/menu.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { DashbroadComponent } from '../main/dashbroad/dashbroad.component';
import { RoleGuard } from '../lib/auth.guard';
import { Role } from '../models/role';


export const mainRoutes: Routes = [
  {
      path: '', component: MainComponent,
      children: [
        {
            path: '', component: DashbroadComponent,
        },
        {
          path: 'product',
          loadChildren: () =>
            import('../main/user/user.module').then((m) => m.UserModule),
          canActivate: [RoleGuard],
          data: { roles: [Role.Admin, Role.User] },
        },
      ]
  }
];
@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    SidebarComponent,
    DashbroadComponent,
    MainComponent
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(mainRoutes)
  ],
  exports: [RouterModule],
})
export class MainModule { }
