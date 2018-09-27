import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptions, RequestMethod, Headers, Http } from '@angular/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';
import { CountryModels } from './country-models';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private countryUrl = environment.ROOT_URL+'country/';  // URL to web API
  private _headers = new Headers({'Content-Type': 'application/json'});
  private _requestOption:RequestOptions;
  constructor(private http:HttpClient, private _http: Http) { }

  createRow(countryEntity:CountryModels){
    this._requestOption = new RequestOptions({method:RequestMethod.Post, headers: this._headers});
    var body = {
      CountryCode:countryEntity.CountryCode,
      CountryName:countryEntity.CountryName,
      Status:countryEntity.Status       
    };
    return this._http.post(this.countryUrl, JSON.stringify(body), this._requestOption).pipe(
      map(x=>x.json()));
  }
  
  updateRow(countryEntity:CountryModels){
    this._requestOption = new RequestOptions({method:RequestMethod.Put, headers: this._headers});
    var id = countryEntity.CountryId;
    return this._http.put(this.countryUrl+id,JSON.stringify(countryEntity), this._requestOption).pipe(
    map(x=>x.json()));    
  }

  deleteById(id:number){
    this._requestOption = new RequestOptions({method:RequestMethod.Put, headers: this._headers});
    
    return this._http.delete(this.countryUrl+id).pipe(
    map(x=>x.json()));
  }

  getById(Id){
    return this.http.get<CountryModels>(environment.ROOT_URL+'country/'+ Id);
  }

  getAll(){
    return this.http.get<CountryModels[]>(environment.ROOT_URL+'country/');
  }
}
