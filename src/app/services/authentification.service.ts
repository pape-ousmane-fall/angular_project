import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs/internal/observable/throwError';
import { AppUser } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  users:AppUser[]=[];
  authenticatedUser:AppUser | undefined;
  constructor() { 
    this.users.push(
      {
        id:UUID.UUID(), 
        username:'user 1',
        password:'1234',
        roles:['USER']
      },
      {
        id:UUID.UUID(), 
        username:'user 1',
        password:'1233',
        roles:['USER']
      },
      {
        id:UUID.UUID(), 
        username:'user 2',
        password:'12345',
        roles:['USER']
      },
      {
        id:UUID.UUID(), 
        username:'user 4',
        password:'1234',
        roles:['USER','ADMIN']
      },

    )

  }
  login(username: string,password:string):Observable<AppUser>{
  let user=  this.users.find(u=>u.username==username);
    if(!user) return throwError(()=>new Error("user not found"));
    if(user.password !=password) return throwError(()=>new Error("Bad credentiel"));
    return of(user);
  }

  authenticateUser(appUser: AppUser):Observable<boolean>{
this.authenticatedUser=appUser;
localStorage.setItem('authUser',JSON.stringify({username:appUser.username,
  roles:appUser.roles,
jwt:"JWT_TOKEN"}));
return of(true);

  }
  hasRole(role: string):boolean{
    return  this.authenticatedUser!.roles.includes(role);
  }
  isAuthenticated():boolean{
    return this.authenticatedUser!=undefined;
  }
  logout():Observable<boolean>{
    this.authenticatedUser=undefined;
    localStorage.removeItem("authUser");
    return of(true)
    }
}
