import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authenticateService: AuthentificationService,private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
 
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let auth=this.authenticateService.isAuthenticated();
      if (auth==false) {
this.router.navigateByUrl("");
return false;
 
}else{
  return true;
}
   
  }
  
}
