import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular/lazy';
import { ViewComplaintPageRoutingModule } from './view-complaint-routing.module';
import { ViewComplaintPage } from './view-complaint.page';

// Import standalone child components
// import { DashboardHeaderComponent } from 'src/app/shared/components/dashboard-header/dashboard-header.component';
// import { ComplaintIdCardComponent } from '../../../../src/app/shared/components/complaint-id-card/complaint-id-card.component';
// import { InfoChipsRowComponent } from 'src/app/shared/components/info-chips-row/info-chips-row.component';
// import { IncidentAddressCardComponent } from '[STRIPPED 69 bytes].component';
// import { WorkVerificationPhotosComponent } from '[STRIPPED 75 bytes].component';
// import { InspectionNotesCardComponent } from '[STRIPPED 69 bytes].component';
// import { ActionDeskComponent } from 'src/app/shared/components/action-desk/action-desk.component';

import { DashboardHeaderComponent } from '../../../../shared/components/dashboard-header/dashboard-header.component';
import { ComplaintIdCardComponent } from '../../../../shared/components/complaint-id-card/complaint-id-card.component';
import { InfoChipsRowComponent } from '../../../../shared/components/info-chips-row/info-chips-row.component';
import { IncidentAddressCardComponent } from '../../../../shared/components/incident-address-card/incident-address-card.component';
import { WorkVerificationPhotosComponent } from '../../../../shared/components/work-verification-photos/work-verification-photos.component';
import { InspectionNotesCardComponent } from '../../../../shared/components/inspection-notes-card/inspection-notes-card.component';
import { ActionDeskComponent } from '../../../../shared/components/action-desk/action-desk.component';
import { AppButtonComponent } from '../../../../shared/components/app-button/app-button.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewComplaintPageRoutingModule,
    DashboardHeaderComponent,
    ComplaintIdCardComponent,
    InfoChipsRowComponent,
    IncidentAddressCardComponent,
    WorkVerificationPhotosComponent,
    InspectionNotesCardComponent,
    ActionDeskComponent,
    AppButtonComponent,
  ],
  declarations: [ViewComplaintPage],
})
export class ViewComplaintPageModule {}
