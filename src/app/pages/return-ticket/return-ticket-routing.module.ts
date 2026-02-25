import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReturnTicketPage } from './return-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: ReturnTicketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReturnTicketPageRoutingModule {}
