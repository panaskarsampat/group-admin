import { StateModels } from './state-models';
import { HttpClient } from '@angular/common/http';  
import { RequestOptions, RequestMethod, Headers, Http } from '@angular/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';
import { Injectable } from '@angular/core';
//import {StateModels}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private stateUrl = environment.ROOT_URL+'state/';  // URL to web API
  private _headers = new Headers({'Content-Type': 'application/json'});
  private _requestOption:RequestOptions;
  constructor(private http:HttpClient, private _http: Http) { }

  createRow(stateEntity:StateModels){
    this._requestOption = new RequestOptions({method:RequestMethod.Post, headers: this._headers});
    var body = {
      CountryId:stateEntity.CountryId,
      StateCode:stateEntity.StateCode,
      StateId:stateEntity.StateId,
      StateName:stateEntity.StateName,
      Status:stateEntity.Status       
    };
    return this._http.post(this.stateUrl, JSON.stringify(body), this._requestOption).pipe(
      map(x=>x.json()));
  }
  
  updateRow(stateEntity:StateModels){
    this._requestOption = new RequestOptions({method:RequestMethod.Put, headers: this._headers});
    var id = stateEntity.StateId;
    return this._http.put(this.stateUrl+id,JSON.stringify(stateEntity), this._requestOption).pipe(
    map(x=>x.json()));    
  }

  deleteById(id:number){
    this._requestOption = new RequestOptions({method:RequestMethod.Put, headers: this._headers});
    
    return this._http.delete(this.stateUrl+id).pipe(
    map(x=>x.json()));
  }

  getById(Id){
    return this.http.get<StateModels>(environment.ROOT_URL+'state/'+ Id);
  }

  getAll(){
    return this.http.get<StateModels[]>(environment.ROOT_URL+'state/');
  }
}
