import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OneWayTicketPage } from './one-way-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: OneWayTicketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OneWayTicketPageRoutingModule {}
