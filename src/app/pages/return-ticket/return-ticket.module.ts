import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReturnTicketPageRoutingModule } from './return-ticket-routing.module';

import { ReturnTicketPage } from './return-ticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReturnTicketPageRoutingModule
  ],
  declarations: [ReturnTicketPage]
})
export class ReturnTicketPageModule {}
