import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OneWayTicketPageRoutingModule } from './one-way-ticket-routing.module';

import { OneWayTicketPage } from './one-way-ticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OneWayTicketPageRoutingModule
  ],
  declarations: [OneWayTicketPage]
})
export class OneWayTicketPageModule {}
