import { WorkModels } from './work-models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptions, RequestMethod, Headers, Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  private workUrl = environment.ROOT_URL + 'work/';  // URL to web API
  private _headers = new Headers({'Content-Type': 'application/json'});
  private _requestOption: RequestOptions;
  constructor(private http: HttpClient, private _http: Http) { }

  createWork(workEntity: WorkModels) {
    this._requestOption = new RequestOptions({method: RequestMethod.Post, headers: this._headers});
    const body = {
      WorkId: workEntity.WorkId,
      WorkName: workEntity.WorkName,

    };
    return this._http.post(this.workUrl, JSON.stringify(body), this._requestOption).pipe(
      map(x => x.json()));
  }
  updateWork(workEntity: WorkModels) {
    this._requestOption = new RequestOptions({method: RequestMethod.Put, headers: this._headers});
    const id = workEntity.WorkId;
    return this._http.put(this.workUrl + id, JSON.stringify(workEntity), this._requestOption).pipe(
    map(x => x.json()));
  }
  deleteWorkById(id: number) {
    this._requestOption = new RequestOptions({method: RequestMethod.Put, headers: this._headers});

    return this._http.delete(this.workUrl + id).pipe(
    map(x => x.json()));
  }

  getWorkById(Id) {
    return this.http.get<WorkModels>(environment.ROOT_URL + 'work/' + Id);
  }

  getAllWorks() {
    return this.http.get<WorkModels[]>(environment.ROOT_URL + 'work/');
  }

}



