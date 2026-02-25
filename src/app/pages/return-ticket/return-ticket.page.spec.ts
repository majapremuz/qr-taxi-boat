import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReturnTicketPage } from './return-ticket.page';

describe('ReturnTicketPage', () => {
  let component: ReturnTicketPage;
  let fixture: ComponentFixture<ReturnTicketPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnTicketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
