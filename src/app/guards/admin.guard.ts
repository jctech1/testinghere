import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
      return this.authService.isAdmin().pipe(
        map(isAdmin => {
          if (isAdmin) {
            return true;
          } else {
            this.router.navigate(['/']);  // Redirect to home if not an admin
            return false;
          }
        }),
        catchError(() => {
          this.router.navigate(['/']);  // Redirect to home in case of any error
          return of(false);
        })
      );
  }
}
