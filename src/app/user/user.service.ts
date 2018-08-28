import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { RequestOptions, RequestMethod, Headers, Http } from '@angular/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';
import { UserModels } from './user-models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = environment.ROOT_URL+'user/';  // URL to web API
  private _headers = new Headers({'Content-Type': 'application/json'});
  private _requestOption:RequestOptions;
  constructor(private http:HttpClient, private _http: Http) { }

  createUser(userEntity:UserModels){
    
    this._requestOption = new RequestOptions({method:RequestMethod.Post, headers: this._headers});
    var body = {
        
        UserEmail:userEntity.UserEmail,
        UserFullName:userEntity.UserFullName,
        UserName:userEntity.UserName,
        PasswordHash:'sa',
        PhoneNumber:userEntity.PhoneNumber,
        IsUserEmailConfirmed:userEntity.IsUserEmailConfirmed=false,
        IsUserActive:userEntity.IsUserActive=true,
        CreatedBy:userEntity.CreatedBy='',
        CreatedDateTime:userEntity.CreatedDateTime=null,
        ModifiedBy:userEntity.ModifiedBy='',
        ModifiedDateTime:userEntity.ModifiedDateTime=null
      };
    return this._http.post(this.userUrl, JSON.stringify(body), this._requestOption).pipe(
      map(x=>x.json()));
  }
  
  updateUser(user:UserModels){
    this._requestOption = new RequestOptions({method:RequestMethod.Put, headers: this._headers});
    var id = user.UserId;
    return this._http.put(this.userUrl+id,JSON.stringify(user), this._requestOption).pipe(
    map(x=>x.json()));    
  }

  deleteUser(id:string){
    this._requestOption = new RequestOptions({method:RequestMethod.Put, headers: this._headers});
    
    return this._http.delete(this.userUrl+id).pipe(
    map(x=>x.json()));
  }

  getUserById(Id){
    return this.http.get<UserModels>(environment.ROOT_URL+'user/'+ Id);
  }

  getUsers(){
    return this.http.get<UserModels[]>(environment.ROOT_URL+'user/');
  }
}
