import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DistancesPage } from './distances.page';

const routes: Routes = [
  {
    path: '',
    component: DistancesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DistancesPageRoutingModule {}
