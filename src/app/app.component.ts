import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isRegistrationRouteActive = false;
  isCarritoRouteActive = false;  // New variable

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRegistrationRouteActive = this.router.url === '/register';
        this.isCarritoRouteActive = this.router.url === '/carrito';  // Set this variable too
      }
    });
  }
}
