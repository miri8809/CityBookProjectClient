import { DebugElement, Injectable } from '@angular/core';
import { User } from './User';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Child } from './Child';
import { SaveUserResponse } from './SaveUserResponse';
import { map } from 'rxjs/operators'
import { catchError } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User = {
    FirstName: "",
    LastName: "",
    TZ: "",
    DateBorn: new Date(),
    NumChildren: 0,
    children: new Array<Child>(),
    Male: false,
    Female: false,
    HMO: ""
  }

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  addUser(user: User): Observable<SaveUserResponse> {
    return this.http.post("https://localhost:44382/api/addUser", user).pipe(map(
      (res: SaveUserResponse) => {
        alert("the data is not send to the server!!!");
        return res;
      }))
  }
  TZValidation(id) {
    id = String(id).trim();
    if (id.length > 9 || isNaN(id)) return false;
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
    return Array.from(id, Number).reduce((counter, digit, i) => {
      const step = digit * ((i % 2) + 1);
      return counter + (step > 9 ? step - 9 : step);
    }) % 10 === 0;
  }
}




