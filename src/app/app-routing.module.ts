import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { FullPage } from './layouts/full/full.page';
import { LoginGuard } from './guards/login.guard';
import { NoLoginGuard } from './guards/no-login.guard';

export const Approutes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'verificar-correo',
    loadChildren: () => import('./auth/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: '',
    component: FullPage,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutPageModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      {
        path: '**', redirectTo: ''
      }
    ], canActivate: [NoLoginGuard] 
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
