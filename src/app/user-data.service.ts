import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private subject = new Subject<any>();
    private user :any;
    sendData(data: any) {
        this.subject.next(data);
        this.user = data;
    }
 
    clearData() {
        this.subject.next();
    }
 
    getData(): Observable<any> {
        return this.subject.asObservable();
    }

    getUser():any{
      return this.user;        
    }
}
