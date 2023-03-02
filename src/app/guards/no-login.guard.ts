import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class NoLoginGuard implements CanActivate {

  constructor(private router: Router, private authentication: AuthenticationService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        
      return this.authentication.checkNoLogin().then(result =>  {
        if (result){
            return true;
        } else {
            this.router.navigate(['/tabs/login']).then(r => {});
            return false;
        }
        
      }).catch(err => {
        this.router.navigate(['/tabs/login']).then(r => {});
        return false;
      });
  }

}
