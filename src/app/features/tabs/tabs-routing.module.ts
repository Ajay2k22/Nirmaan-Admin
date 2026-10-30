import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../complaint/pages/dashboard/dashboard.module').then(
            (m) => m.DashboardPageModule,
          ),
      },
      {
        path: 'view-complaint/:id',
        loadChildren: () =>
          import('../complaint/pages/view-complaint/view-complaint-routing.module').then(
            (m) => m.ViewComplaintPageRoutingModule,
          ),
      },
      {
        path: 'list-of-complaint',
        loadChildren: () =>
          import('../complaint/pages/list-of-complaint/list-of-complaint.module').then(
            (m) => m.ListOfComplaintPageModule,
          ),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
