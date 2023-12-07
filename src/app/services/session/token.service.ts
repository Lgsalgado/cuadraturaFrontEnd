import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private issuer = {
    login: 'https://fast-wildwood-05309.herokuapp.com/api/auth/login',
    register: 'https://fast-wildwood-05309.herokuapp.com/api/auth/register',
  };

  constructor() {}

  handleData(token: string) {
    localStorage.setItem('X-Auth', token);
  }

  getToken() {
    return localStorage.getItem('X-Auth');

  }
  // Verify the token
  isValidToken(): boolean {
    const token = this.getToken();

    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.issuer).indexOf(payload.iss) > -1;
      }
    } else {
      return false;
    }
    return false;
  }

  payload(token: string) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }

  // Remove token
  removeToken() {
    localStorage.removeItem('X-Auth');
  }
}
