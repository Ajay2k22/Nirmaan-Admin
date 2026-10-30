import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';
// import { IonicModule } from '@ionic/angular';
// import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { DashboardHeaderComponent } from '../../../../shared/components/dashboard-header/dashboard-header.component';
import { StatusCardsComponent } from '../../../../shared/components/status-cards/status-cards.component';
import { ComplaintMapComponent } from '../../../../shared/components/complaint-map/complaint-map.component';
import { InfoBannerComponent } from '../../../../shared/components/info-banner/info-banner.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    DashboardHeaderComponent,
    StatusCardsComponent,
    ComplaintMapComponent,
    InfoBannerComponent,
  ],
  declarations: [DashboardPage],
})
export class DashboardPageModule {}
