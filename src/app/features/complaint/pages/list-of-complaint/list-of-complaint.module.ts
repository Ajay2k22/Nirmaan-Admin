import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular/lazy';

import { ListOfComplaintPageRoutingModule } from './list-of-complaint-routing.module';
import { ListOfComplaintPage } from './list-of-complaint.page';

// Import standalone components
// import { DashboardHeaderComponent } from 'src/app/shared/components/dashboard-header/dashboard-header.component';
// import { SearchBarComponent } from 'src/app/shared/components/search-bar/search-bar.component';
// import { FilterChipsComponent } from 'src/app/shared/components/filter-chips/filter-chips.component';
// import { ComplaintCardComponent } from 'src/app/shared/components/complaint-card/complaint-card.component';

import { DashboardHeaderComponent } from '../../../../shared/components/dashboard-header/dashboard-header.component';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';
import { FilterChipsComponent } from '../../../../shared/components/filter-chips/filter-chips.component';
import { ComplaintCardComponent } from '../../../../shared/components/complaint-card/complaint-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListOfComplaintPageRoutingModule,
    // Standalone components
    DashboardHeaderComponent,
    SearchBarComponent,
    FilterChipsComponent,
    ComplaintCardComponent,
  ],
  declarations: [ListOfComplaintPage],
})
export class ListOfComplaintPageModule {}
