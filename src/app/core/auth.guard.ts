import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    // AuthService tells us if user is logged in
    private router: Router
    // Router redirects to login if not logged in
  ) {}

  canActivate(): boolean {

    // Ask AuthService — is anyone logged in?
    if (this.authService.isLoggedIn()) {

      // Yes — allow route to load
      return true; // ✅ dashboard loads

    } else {

      // No — send to login page
      this.router.navigate(['/login']);
      return false; // ❌ dashboard blocked

    }
  }
}