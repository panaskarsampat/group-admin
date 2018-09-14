import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { RequestOptions, RequestMethod, Headers, Http } from '@angular/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';
import { CityModels } from './city-models';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private cityUrl = environment.ROOT_URL+'city/';  // URL to web API
  private _headers = new Headers({'Content-Type': 'application/json'});
  private _requestOption:RequestOptions;
  constructor(private http:HttpClient, private _http: Http) { }

  createRow(cityEntity:CityModels){
    debugger;
    this._requestOption = new RequestOptions({method:RequestMethod.Post, headers: this._headers});
    var body = {
      CityCode:cityEntity.CityCode,
      CityId:cityEntity.CityId,
      CityName:cityEntity.CityName,
      StateId:cityEntity.StateId,
      Status:cityEntity.Status       
    };
    return this._http.post(this.cityUrl, JSON.stringify(body), this._requestOption).pipe(
      map(x=>x.json()));
  }
  
  updateRow(cityEntity:CityModels){
    this._requestOption = new RequestOptions({method:RequestMethod.Put, headers: this._headers});
    var id = cityEntity.CityId;
    return this._http.put(this.cityUrl+id,JSON.stringify(cityEntity), this._requestOption).pipe(
    map(x=>x.json()));    
  }

  deleteById(id:number){
    this._requestOption = new RequestOptions({method:RequestMethod.Put, headers: this._headers});
    
    return this._http.delete(this.cityUrl+id).pipe(
    map(x=>x.json()));
  }

  getById(Id){
    return this.http.get<CityModels>(environment.ROOT_URL+'city/'+ Id);
  }

  getAll(){
    return this.http.get<CityModels[]>(environment.ROOT_URL+'city/');
  }

}
