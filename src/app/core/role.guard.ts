import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export class RoleGuard implements CanActivate{

  constructor(private authService: AuthService, private router: Router){}

  canActivate(): boolean{
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/login']);
      return false;
    }

    if(this.authService.isAdmin()){
      return true;
    }

    this.router.navigate(['/dashboard']);
    return false;
  }
}
