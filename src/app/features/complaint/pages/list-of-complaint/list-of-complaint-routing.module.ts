import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListOfComplaintPage } from './list-of-complaint.page';

const routes: Routes = [
  {
    path: '',
    component: ListOfComplaintPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListOfComplaintPageRoutingModule {}
