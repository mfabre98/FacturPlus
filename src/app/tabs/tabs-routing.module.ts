import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { LoginGuard } from '../guards/login.guard';
import { NoLoginGuard } from '../guards/no-login.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'facturas',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule),
        canActivate: [NoLoginGuard]
      },
      {
        path: 'presupuestos',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule),
        canActivate: [NoLoginGuard]
      },
      {
        path: 'configuracion',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule),
        canActivate: [NoLoginGuard]
      },
      {
        path: 'verificar-correo',
        loadChildren: () => import('../auth/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule),
        canActivate: [LoginGuard]
      },
      {
        path: 'cambiar-contrasena',
        loadChildren: () => import('../auth/password-reset/password-reset.module').then( m => m.PasswordResetPageModule),
        canActivate: [NoLoginGuard]
      },
      {
        path: 'registrar',
        loadChildren: () => import('../auth/register/register.module').then( m => m.RegisterPageModule),
        canActivate: [NoLoginGuard]
      },
      {
        path: '',
        redirectTo: '/factur/facturas',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
