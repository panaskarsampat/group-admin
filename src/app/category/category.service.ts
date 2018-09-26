import { Category } from './category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { RequestOptions, RequestMethod, Headers, Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private cityUrl = environment.ROOT_URL+'category/';  // URL to web API
  private _headers = new Headers({'Content-Type': 'application/json'});
  private _requestOption:RequestOptions;
  constructor(private http:HttpClient, private _http: Http) { }

  createRow(categoryEntity:Category){
    debugger;
    this._requestOption = new RequestOptions({method:RequestMethod.Post, headers: this._headers});
    var body = {
      CompanyCategoryId:categoryEntity.CompanyCategoryId,
      CompanyCategory:categoryEntity.CompanyCategory     
    };
    return this._http.post(this.cityUrl, JSON.stringify(body), this._requestOption).pipe(
      map(x=>x.json()));
  }
  
  updateRow(categoryEntity:Category){
    this._requestOption = new RequestOptions({method:RequestMethod.Put, headers: this._headers});
    var id = categoryEntity.CompanyCategoryId;
    return this._http.put(this.cityUrl+id,JSON.stringify(categoryEntity), this._requestOption).pipe(
    map(x=>x.json()));    
  }

  deleteById(id:number){
    this._requestOption = new RequestOptions({method:RequestMethod.Put, headers: this._headers});
    
    return this._http.delete(this.cityUrl+id).pipe(
    map(x=>x.json()));
  }

  getById(Id){
    return this.http.get<Category>(environment.ROOT_URL+'category/'+ Id);
  }

  getAll(){
    return this.http.get<Category[]>(environment.ROOT_URL+'category/');
  }
}
