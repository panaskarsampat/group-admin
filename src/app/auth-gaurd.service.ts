import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild,Router, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UserDataService } from './user-data.service';
import { UserModels } from './user/user-models';

import { UserComponent } from './user/user.component';
import { Component } from '@angular/compiler/src/core';
@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate, CanActivateChild, CanDeactivate<Component> {
  loggedUser:UserModels;

  constructor(private router:Router, private ds:UserDataService) { }
 
  canActivate() {
    
    this.loggedUser = this.ds.getUser();
    
    if(this.loggedUser!=undefined){
      return true;
    }
    else{      
      this.router.navigate(['/login']);
      return false;
    }
    
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    this.loggedUser = this.ds.getUser();
    
    if(this.loggedUser!=undefined){
      
      if(route.url.toString() === 'list' ){
        return true;
      }

      if( this.loggedUser.UserEmail==='sampat1800.panaskar@gmail.com'){
        return true;
      }else{
        alert('you are not eligible for this action.');
        return false;
      }
    }
  }

  canDeactivate(component) {    
    return component.canDeactivate ? component.canDeactivate() : true;
  }

}
