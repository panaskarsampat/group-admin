import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Http } from '@angular/http';

import { environment } from '../../environments/environment.prod';
import { UserModels } from '../user/user-models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = environment.ROOT_URL+'login/';  // URL to web API
  
  constructor(private http:HttpClient, private _http: Http) { }

  getLoginByEmailPassword(email){
    return this.http.get<UserModels>(this.loginUrl+email);
  }
}
