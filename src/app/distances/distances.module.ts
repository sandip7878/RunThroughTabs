import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DistancesPageRoutingModule } from './distances-routing.module';

import { DistancesPage } from './distances.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DistancesPageRoutingModule
  ],
  declarations: [DistancesPage]
})
export class DistancesPageModule {}
