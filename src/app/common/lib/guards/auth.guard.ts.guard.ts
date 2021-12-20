import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    protected authService: AuthService,
    protected router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const isAuth: boolean = this.authService.GetIsAuth();
      /**
       * If user isn't authenticated, then
       * send them to login
       */
      if (!isAuth) {
        this.router.navigate(['/auth/login']);
      }

    return isAuth;
  }
}
