import { environment } from './../../environments/environment.prod';
import { JobsModels } from './jobs-models';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { RequestOptions, RequestMethod, Headers, Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private companyUrl = environment.ROOT_URL+'jobs/';  // URL to web API
  private _headers = new Headers({'Content-Type': 'application/json'});
  private _requestOption:RequestOptions;
  constructor(private http:HttpClient, private _http: Http) { }

  createRow(entity:JobsModels){
    this._requestOption = new RequestOptions({method:RequestMethod.Post, headers: this._headers});
    var body = {
      JobId:entity.JobId,      
      JobCode:entity.JobCode,   
      JobName:entity.JobName,
      JobTitle:entity.JobTitle,
      ContactPerson:entity.ContactPerson,
      IsActive:entity.IsActive,
      JobDesc:entity.JobDesc,
      PostalCode:entity.PostalCode,   
      WorkExp:entity.WorkExp,
      WorkSkills:entity.WorkSkills,

      CreatedBy:entity.CreatedBy,
      CreatedDateTime:entity.CreatedDateTime,
      ModifiedBy:entity.ModifiedBy,
      ModifiedDateTime:entity.ModifiedDateTime,

      LocationCountryId:entity.LocationCountryId,
      LocationStateId:entity.LocationStateId,   
      LocationCityId:entity.LocationCityId,      
      CompanyId:entity.CompanyId,
      PositionId:entity.PositionId,
      WorkId:entity.WorkId
    };
    return this._http.post(this.companyUrl, JSON.stringify(body), this._requestOption).pipe(
      map(x=>x.json()));
  }
  
  updateRow(entity:JobsModels){
    this._requestOption = new RequestOptions({method:RequestMethod.Put, headers: this._headers});
    var id = entity.JobId;
    return this._http.put(this.companyUrl+id,JSON.stringify(entity), this._requestOption).pipe(
    map(x=>x.json()));    
  }

  deleteById(id:number){
    this._requestOption = new RequestOptions({method:RequestMethod.Put, headers: this._headers});
    
    return this._http.delete(this.companyUrl+id).pipe(
    map(x=>x.json()));
  }

  getById(Id){
    return this.http.get<JobsModels>(environment.ROOT_URL+'jobs/'+ Id);
  }

  getAll(){
    return this.http.get<JobsModels[]>(environment.ROOT_URL+'jobs/');
  }

}
