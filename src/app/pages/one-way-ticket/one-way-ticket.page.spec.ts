import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OneWayTicketPage } from './one-way-ticket.page';

describe('OneWayTicketPage', () => {
  let component: OneWayTicketPage;
  let fixture: ComponentFixture<OneWayTicketPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OneWayTicketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
