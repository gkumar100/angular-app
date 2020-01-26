import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  apiUrl = environment.apiUrl;
  private userData: any;
  constructor(private http: HttpClient) { }
  getAllUserList(): Observable<User[]> {
    return this.http.get(`${this.apiUrl}/user/getAllUser`).pipe(map(res => {
      this.userData = res;
      if (this.userData) {
        return this.userData.map(item => {
          return {
            _id: item._id,
            fname: item.fname,
            lname: item.lname,
            email: item.email,
            dob: item.dob
          }
        })
      }
    }));
  }
}
