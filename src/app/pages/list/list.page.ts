import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  currentPage = 'list';

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) { 
    this.router.events.pipe(
          filter((event): event is NavigationEnd => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
          if (event.url.includes('one-way-ticket')) {
            this.currentPage = 'one-way-ticket';
          } else if (event.url.includes('return-ticket')) {
            this.currentPage = 'return-ticket';
          } else if (event.url.includes('list')) {
            this.currentPage = 'list';
          } else if (event.url.includes('scanner')) {
            this.currentPage = 'scanner';
          }
          this.cdr.detectChanges();
        });
  }

  ngOnInit() {
  }

  navOneway() {
    this.router.navigate(['/one-way-ticket']);
  }

  navReturnTicket() {
    this.router.navigate(['/return-ticket']);
  }

  navList() {
    this.router.navigate(['/list']);
  }

  navScanner() {
    this.router.navigate(['/scanner']);
  }

  navlogout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

}
