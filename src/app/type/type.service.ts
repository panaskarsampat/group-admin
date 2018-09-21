import { Type } from './type.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { RequestOptions, RequestMethod, Headers, Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private cityUrl = environment.ROOT_URL+'companyType/';  // URL to web API
  private _headers = new Headers({'Content-Type': 'application/json'});
  private _requestOption:RequestOptions;
  constructor(private http:HttpClient, private _http: Http) { }
  
  createRow(typeEntity:Type){
    debugger;
    this._requestOption = new RequestOptions({method:RequestMethod.Post, headers: this._headers});
    var body = {
      CompanyTypeId:typeEntity.CompanyTypeId,
      CompanyType:typeEntity.CompanyType     
    };
    return this._http.post(this.cityUrl, JSON.stringify(body), this._requestOption).pipe(
      map(x=>x.json()));
  }
  
  updateRow(typeEntity:Type){
    this._requestOption = new RequestOptions({method:RequestMethod.Put, headers: this._headers});
    var id = typeEntity.CompanyTypeId;
    return this._http.put(this.cityUrl+id,JSON.stringify(typeEntity), this._requestOption).pipe(
    map(x=>x.json()));    
  }

  deleteById(id:number){
    this._requestOption = new RequestOptions({method:RequestMethod.Put, headers: this._headers});
    
    return this._http.delete(this.cityUrl+id).pipe(
    map(x=>x.json()));
  }

  getById(Id){
    return this.http.get<Type>(environment.ROOT_URL+'companyType/'+ Id);
  }

  getAll(){
    return this.http.get<Type[]>(environment.ROOT_URL+'companyType/');
  }
}
