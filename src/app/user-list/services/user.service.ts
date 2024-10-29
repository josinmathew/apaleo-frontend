import { Injectable } from '@angular/core';
import { Users } from '../interfaces/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://dummyjson.com/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Users> {
    return this.http.get<Users>(`${this.apiUrl}`);
  }
}
