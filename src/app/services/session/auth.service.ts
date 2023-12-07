import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// User interface
export class User {
  name!: String;
  email!: String;
  password!: String;
  password_confirmation!: String;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // User registration
  register(user: User): Observable<any> {
    return this.http.post('https://fast-wildwood-05309.herokuapp.com/api/auth/register', user);
  }

  // Login
  login(user: User): Observable<any> {
    return this.http.post<any>('https://fast-wildwood-05309.herokuapp.com/api/auth/login', user);
  }

  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get('https://fast-wildwood-05309.herokuapp.com/api/auth/user');
  }
  // Access user profile
  profileUserId(id:number): Observable<any> {
    // @ts-ignore
    return this.http.get('https://fast-wildwood-05309.herokuapp.com/api/auth/user/'+id,id);
  }

  // Update user
  updateUser(user: User): Observable<any> {
    return this.http.put('https://fast-wildwood-05309.herokuapp.com/api/auth/user', user);
  }
}
