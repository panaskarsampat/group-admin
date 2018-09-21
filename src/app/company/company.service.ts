import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { RequestOptions, RequestMethod, Headers, Http } from '@angular/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment.prod';
import { CompanyModels } from './company-models';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companyUrl = environment.ROOT_URL+'company/';  // URL to web API
  private _headers = new Headers({'Content-Type': 'application/json'});
  private _requestOption:RequestOptions;
  constructor(private http:HttpClient, private _http: Http) { }

  createRow(companyEntity:CompanyModels){
    debugger;
    this._requestOption = new RequestOptions({method:RequestMethod.Post, headers: this._headers});
    var body = {
      CompanyId:companyEntity.CompanyId,
      CompanyCode:companyEntity.CompanyCode,
      CompanyName:companyEntity.CompanyName,   
      AboutCompany:companyEntity.AboutCompany,
      CompanyAddress:companyEntity.CompanyAddress,
      EmailId:companyEntity.EmailId,
      IsActive:companyEntity.IsActive,
      MailId:companyEntity.MailId,      
      PhoneNumber1:companyEntity.PhoneNumber1,
      PhoneNumber2:companyEntity.PhoneNumber2,
      PostalCode:companyEntity.PostalCode,   
      SiteId:companyEntity.SiteId,

      CreatedBy:companyEntity.CreatedBy,
      CreatedDateTime:companyEntity.CreatedDateTime,
      ModifiedBy:companyEntity.ModifiedBy,   
      ModifiedDateTime:companyEntity.ModifiedDateTime,

      CompanyTypeId:companyEntity.CompanyTypeId,
      CompanyCategoryId:companyEntity.CompanyCategoryId,   
      CityId:companyEntity.CityId,
      CountryId:companyEntity.CountryId,
      StateId:companyEntity.StateId
    };
    return this._http.post(this.companyUrl, JSON.stringify(body), this._requestOption).pipe(
      map(x=>x.json()));
  }
  
  updateRow(companyEntity:CompanyModels){
    this._requestOption = new RequestOptions({method:RequestMethod.Put, headers: this._headers});
    var id = companyEntity.CountryId;
    return this._http.put(this.companyUrl+id,JSON.stringify(companyEntity), this._requestOption).pipe(
    map(x=>x.json()));    
  }

  deleteById(id:number){
    this._requestOption = new RequestOptions({method:RequestMethod.Put, headers: this._headers});
    
    return this._http.delete(this.companyUrl+id).pipe(
    map(x=>x.json()));
  }

  getById(Id){
    return this.http.get<CompanyModels>(environment.ROOT_URL+'company/'+ Id);
  }

  getAll(){
    return this.http.get<CompanyModels[]>(environment.ROOT_URL+'company/');
  }

}
