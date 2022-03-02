import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUserData, User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {
  }

  getUser() {
    return this.http.get<ApiUserData[]>(environment.apiUrl + '/users').pipe(
      map(users => {
        return users.map(userData => {
          return new User(
            userData._id,
            userData.username,
          );
        });
      })
    );
  }
}
