import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/pages/login/login.module').then(
        (m) => m.LoginPageModule,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./features/auth/pages/register/register.module').then(
        (m) => m.RegisterPageModule,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./features/tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/complaint/pages/dashboard/dashboard.module').then(
        (m) => m.DashboardPageModule,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'list-of-complaint',
    loadChildren: () =>
      import('./features/complaint/pages/list-of-complaint/list-of-complaint.module').then(
        (m) => m.ListOfComplaintPageModule,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'view-complaint',
    loadChildren: () =>
      import('./features/complaint/pages/view-complaint/view-complaint.module').then(
        (m) => m.ViewComplaintPageModule,
      ),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
