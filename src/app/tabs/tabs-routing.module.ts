import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../guards/login.guard';
import { NoLoginGuard } from '../guards/no-login.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule),
        canActivate: [NoLoginGuard]
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule),
        canActivate: [NoLoginGuard]
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule),
        canActivate: [NoLoginGuard]
      },
      {
        path: 'verify-email',
        loadChildren: () => import('../auth/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule),
        canActivate: [LoginGuard]
      },
      {
        path: 'password-reset',
        loadChildren: () => import('../auth/password-reset/password-reset.module').then( m => m.PasswordResetPageModule),
        canActivate: [NoLoginGuard]
      },
      {
        path: 'login',
        loadChildren: () => import('../auth/login/login.module').then( m => m.LoginPageModule),
        canActivate: [LoginGuard]
      },
      {
        path: 'register',
        loadChildren: () => import('../auth/register/register.module').then( m => m.RegisterPageModule),
        canActivate: [NoLoginGuard]
      },
      {
        path: '',
        redirectTo: '/tabs/login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
