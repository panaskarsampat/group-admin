
import { environment } from '../../environments/environment.prod';
import { PositionModels } from './position-models';

import { HttpClient } from '@angular/common/http';  
import { RequestOptions, RequestMethod, Headers, Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private url = environment.ROOT_URL+'position/';  // URL to web API
  private _headers = new Headers({'Content-Type': 'application/json'});
  private _requestOption:RequestOptions;
  constructor(private http:HttpClient, private _http: Http) { }

  createRow(entity:PositionModels){
    this._requestOption = new RequestOptions({method:RequestMethod.Post, headers: this._headers});
    var body = {
      PositionId:entity.PositionId,
      PositionName:entity.PositionName    
    };
    return this._http.post(this.url, JSON.stringify(body), this._requestOption).pipe(
      map(x=>x.json()));
  }
  
  updateRow(entity:PositionModels){
    this._requestOption = new RequestOptions({method:RequestMethod.Put, headers: this._headers});
    var id = entity.PositionId;
    return this._http.put(this.url+id,JSON.stringify(entity), this._requestOption).pipe(
    map(x=>x.json()));    
  }

  deleteById(id:number){
    this._requestOption = new RequestOptions({method:RequestMethod.Put, headers: this._headers});
    
    return this._http.delete(this.url+id).pipe(
    map(x=>x.json()));
  }

  getById(Id){
    return this.http.get<PositionModels>(environment.ROOT_URL+'position/'+ Id);
  }

  getAll(){
    return this.http.get<PositionModels[]>(environment.ROOT_URL+'position/');
  }

}
